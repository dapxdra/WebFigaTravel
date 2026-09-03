// Supabase Edge Function: get-tilopay-token
//
// Authenticates against Tilopay's SDK login endpoint using secrets that never
// reach the frontend, and returns a short-lived SDK session token. Requires an
// existing pending reservation (order_number) so tokens can't be minted for
// arbitrary/unknown orders.
//
// Self-contained on purpose (no ../_shared import): the Supabase bundler only
// packages this function's own directory, so cross-folder relative imports
// fail at deploy time.
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

const TILOPAY_BASE_URL = 'https://app.tilopay.com/api/v1'

interface TilopayCredentials {
  apiUser: string
  apiPassword: string
  apiKey: string
}

function getTilopayCredentials(): TilopayCredentials {
  const apiUser = Deno.env.get('TILOPAY_API_USER')
  const apiPassword = Deno.env.get('TILOPAY_API_PASSWORD')
  const apiKey = Deno.env.get('TILOPAY_API_KEY')

  if (!apiUser || !apiPassword || !apiKey) {
    throw new Error(
      'Missing Tilopay secrets. Set TILOPAY_API_USER, TILOPAY_API_PASSWORD and TILOPAY_API_KEY with `supabase secrets set`.',
    )
  }

  return { apiUser, apiPassword, apiKey }
}

interface TilopayLoginResponse {
  access_token: string
  token_type: string
  expires_in: string | number
}

async function loginToTilopay(credentials: TilopayCredentials): Promise<TilopayLoginResponse> {
  const response = await fetch(`${TILOPAY_BASE_URL}/loginSdk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Field names per Tilopay's own loginSdk contract (apiuser/password/key) -
    // NOT api_user/api_password/api_key, which Tilopay silently rejects.
    body: JSON.stringify({
      apiuser: credentials.apiUser,
      password: credentials.apiPassword,
      key: credentials.apiKey,
    }),
  })

  if (!response.ok) {
    throw new Error(`Tilopay login failed with status ${response.status}`)
  }

  const data = (await response.json()) as TilopayLoginResponse

  if (!data.access_token) {
    throw new Error('Tilopay login response did not include an access_token.')
  }

  return data
}

interface RequestPayload {
  orderNumber?: string
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405)
  }

  let payload: RequestPayload
  try {
    payload = (await req.json()) as RequestPayload
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400)
  }

  const orderNumber = payload.orderNumber?.trim()
  if (!orderNumber) {
    return jsonResponse({ error: 'orderNumber is required.' }, 400)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Supabase service credentials are not configured.' }, 500)
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

  const { data: reservation, error: reservationError } = await supabaseAdmin
    .from('lead_requests')
    .select('id, status')
    .eq('order_number', orderNumber)
    .maybeSingle()

  if (reservationError) {
    return jsonResponse({ error: `Unable to look up the reservation: ${reservationError.message}` }, 500)
  }

  if (!reservation) {
    return jsonResponse({ error: 'No reservation found for that orderNumber.' }, 404)
  }

  if (reservation.status !== 'pending') {
    return jsonResponse({ error: 'This reservation is no longer pending payment.' }, 409)
  }

  try {
    const credentials = getTilopayCredentials()
    const session = await loginToTilopay(credentials)

    // apiKey is Tilopay's public merchant key required by Tilopay.InitTokenize
    // on the client; unlike apiUser/apiPassword it is not a secret credential.
    return jsonResponse({
      accessToken: session.access_token,
      tokenType: session.token_type,
      expiresIn: session.expires_in,
      apiKey: credentials.apiKey,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error contacting Tilopay.'
    return jsonResponse({ error: message }, 502)
  }
})
