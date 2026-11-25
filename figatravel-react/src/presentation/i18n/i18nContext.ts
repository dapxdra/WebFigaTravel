import { createContext } from 'react'
import type { Locale } from './locales'
import { DEFAULT_LOCALE } from './locales'
import type { Messages } from './messages/en'
import { en } from './messages/en'

export interface I18nContextValue {
  locale: Locale
  messages: Messages
  /** True while a language file is being downloaded. */
  isLoadingLocale: boolean
  setLocale: (locale: Locale) => void
}

// The default value (English, no-op setter) is what the build-time prerender
// and any component rendered outside I18nProvider get.
export const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  messages: en,
  isLoadingLocale: false,
  setLocale: () => {},
})
