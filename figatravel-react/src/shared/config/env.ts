const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const tilopaySdkScriptUrl = import.meta.env.VITE_TILOPAY_SDK_URL

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  tilopaySdkScriptUrl,
}

export const hasSupabaseConfig =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 0
