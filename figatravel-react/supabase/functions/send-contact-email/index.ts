// Supabase Edge Function: send-contact-email
//
// Receives a public contact-form submission and emails it to the Figa Travel
// inbox. The email-provider API key lives only as an Edge Function secret and
// never reaches the browser (same pattern as the Tilopay functions).
//
// Secrets (set with `supabase secrets set`):
//   RESEND_API_KEY     - Resend API key used to send the email (required)
//   CONTACT_TO_EMAIL   - inbox that receives enquiries (default infofigatravel@gmail.com)
//   CONTACT_FROM_EMAIL - verified Resend sender, e.g. "Figa Travel <web@figatravelcr.com>" (required)
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD_LENGTH = 5000

interface RequestPayload {
  name?: string
  email?: string
  phone?: string | null
  subject?: string
  message?: string
  // Honeypot: the form ships this hidden; a filled value means a bot.
  company?: string
}

// Collapse control chars to spaces and clamp length so a submission can't
// inject mail headers or blow up the email body.
function clean(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }
  let out = ''
  for (const ch of value) {
    const code = ch.charCodeAt(0)
    // Keep tab (9), newline (10), carriage return (13); replace other C0 + DEL.
    if ((code < 32 && code !== 9 && code !== 10 && code !== 13) || code === 127) {
      out += ' '
    } else {
      out += ch
    }
  }
  return out.trim().slice(0, MAX_FIELD_LENGTH)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function sendEmail(payload: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const fromEmail = Deno.env.get('CONTACT_FROM_EMAIL')
  const toEmail = Deno.env.get('CONTACT_TO_EMAIL') ?? 'infofigatravel@gmail.com'

  if (!apiKey || !fromEmail) {
    throw new Error('Email delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.')
  }

  const textLines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : '',
    '',
    payload.message,
  ].filter((line, index) => line !== '' || index === 3)

  const html = textLines
    .map((line) => (line === '' ? '<br/>' : `<p>${escapeHtml(line)}</p>`))
    .join('')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      // Replies go straight to the visitor instead of the sender address.
      reply_to: payload.email,
      subject: `[Contact] ${payload.subject}`,
      text: textLines.join('\n'),
      html,
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '<unreadable>')
    throw new Error(`Email provider responded ${response.status}: ${detail}`)
  }
}

// Optional audit trail. Never blocks the response: a missing table or policy
// is only logged.
async function storeMessage(payload: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<void> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
  const { error } = await supabaseAdmin.from('contact_messages').insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    subject: payload.subject,
    message: payload.message,
  })

  if (error) {
    console.warn('send-contact-email: could not store message', error.message)
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405)
  }

  let payload: RequestPayload
  try {
    payload = (await req.json()) as RequestPayload
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON body.' }, 400)
  }

  // Bot filled the honeypot: pretend success so it does not retry.
  if (clean(payload.company) !== '') {
    return jsonResponse({ ok: true })
  }

  const name = clean(payload.name)
  const email = clean(payload.email)
  const phone = clean(payload.phone)
  // Subject goes into a mail header: force it onto a single line.
  const subject = clean(payload.subject).replace(/[\r\n\t]+/g, ' ')
  const message = clean(payload.message)

  if (name === '' || subject === '') {
    return jsonResponse({ ok: false, error: 'Name and subject are required.' }, 400)
  }
  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ ok: false, error: 'A valid email is required.' }, 400)
  }
  if (message.length < 10) {
    return jsonResponse({ ok: false, error: 'The message is too short.' }, 400)
  }

  try {
    await sendEmail({ name, email, phone, subject, message })
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown error sending the email.'
    console.error('send-contact-email:', detail)
    return jsonResponse(
      { ok: false, error: 'The message could not be delivered. Please try again later.' },
      502,
    )
  }

  await storeMessage({ name, email, phone, subject, message }).catch((error) => {
    console.warn('send-contact-email: storeMessage failed', error)
  })

  return jsonResponse({ ok: true })
})
