import type { Locale } from './locales'

/** WhatsApp chat link with a prefilled message (in the visitor's language). */
export function whatsappUrl(text = '') {
  // encodeURIComponent (not URLSearchParams) so spaces become %20, as WhatsApp expects.
  return `https://api.whatsapp.com/send/?phone=%2B50672271058&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`
}

/** "2026-09-28" -> "September 28, 2026" / "28 de septiembre de 2026"... */
export function formatIsoDate(isoDate: string, locale: Locale) {
  // UTC on both sides so the day never shifts with the visitor's time zone.
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  )
}
