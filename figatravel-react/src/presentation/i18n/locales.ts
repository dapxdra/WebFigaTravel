// Languages the public site can be shown in. English is the source language:
// it is bundled with the app and used for the build-time prerender (SEO).
// `short` is the 3-letter tag shown on the nav button.
// Every other language is lazy-loaded the first time a visitor picks it.
export const SUPPORTED_LOCALES = [
  { code: 'en', short: 'ENG', label: 'English' },
  { code: 'es', short: 'ESP', label: 'Español' },
  { code: 'fr', short: 'FRA', label: 'Français' },
  { code: 'pt', short: 'POR', label: 'Português' },
  { code: 'it', short: 'ITA', label: 'Italiano' },
  { code: 'de', short: 'DEU', label: 'Deutsch' },
  { code: 'ru', short: 'RUS', label: 'Русский' },
] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]['code']

export const DEFAULT_LOCALE: Locale = 'en'

/** localStorage key that remembers the visitor's choice. */
export const LOCALE_STORAGE_KEY = 'figa-locale'

export function isLocale(value: unknown): value is Locale {
  return SUPPORTED_LOCALES.some((locale) => locale.code === value)
}

/**
 * Picks the first supported language from the browser preferences
 * ("pt-BR" -> "pt"). Falls back to English.
 */
export function matchBrowserLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split('-')[0]
    if (isLocale(base)) {
      return base
    }
  }
  return DEFAULT_LOCALE
}
