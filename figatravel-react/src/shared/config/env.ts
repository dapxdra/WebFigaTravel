const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const tilopaySdkScriptUrl = import.meta.env.VITE_TILOPAY_SDK_URL
// Browser key for Places autocomplete. It is public by design: restrict it in
// Google Cloud to your site's HTTP referrers and to "Places API (New)" only.
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  tilopaySdkScriptUrl,
  googleMapsApiKey,
}


export const hasSupabaseConfig =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 0

export const hasGoogleMapsConfig =
  typeof googleMapsApiKey === 'string' && googleMapsApiKey.length > 0
