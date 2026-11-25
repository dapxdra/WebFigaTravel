import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { I18nContext } from './i18nContext'
import type { I18nContextValue } from './i18nContext'
import type { Locale } from './locales'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, isLocale, matchBrowserLocale } from './locales'
import type { Messages } from './messages/en'
import { en } from './messages/en'

// Each translation is its own chunk, downloaded only when a visitor picks it,
// so English-only visitors never pay for the other languages.
const loaders: Record<Exclude<Locale, 'en'>, () => Promise<Messages>> = {
  es: () => import('./messages/es').then((module) => module.es),
  fr: () => import('./messages/fr').then((module) => module.fr),
  pt: () => import('./messages/pt').then((module) => module.pt),
  it: () => import('./messages/it').then((module) => module.it),
  de: () => import('./messages/de').then((module) => module.de),
  ru: () => import('./messages/ru').then((module) => module.ru),
}

async function loadMessages(locale: Locale): Promise<Messages> {
  return locale === 'en' ? en : loaders[locale]()
}

// localStorage can throw (privacy modes, disabled storage); the language
// choice is a nicety, so failures are ignored.
function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Ignore: the choice just won't be remembered.
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start in English so the first render matches the prerendered
  // HTML; the saved/browser language is applied right after mount.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [messages, setMessages] = useState<Messages>(en)
  const [isLoadingLocale, setIsLoadingLocale] = useState(false)
  // Only the latest request may win if the visitor switches quickly.
  const requestIdRef = useRef(0)

  // Downloads a language and switches to it. State only changes inside the
  // promise callbacks (never synchronously), so the mount effect can use it.
  const applyLocale = useCallback((next: Locale) => {
    const requestId = ++requestIdRef.current
    const isLatest = () => requestId === requestIdRef.current

    return loadMessages(next).then(
      (nextMessages) => {
        if (isLatest()) {
          setMessages(nextMessages)
          setLocaleState(next)
          setIsLoadingLocale(false)
        }
      },
      () => {
        // Chunk failed to download (offline, new deploy): keep the current language.
        if (isLatest()) {
          setIsLoadingLocale(false)
        }
      },
    )
  }, [])

  const setLocale = useCallback(
    (next: Locale) => {
      storeLocale(next)
      setIsLoadingLocale(true)
      void applyLocale(next)
    },
    [applyLocale],
  )

  // First visit: saved choice, else the browser's preferred language.
  useEffect(() => {
    const initial = readStoredLocale() ?? matchBrowserLocale(window.navigator.languages ?? [])
    if (initial !== DEFAULT_LOCALE) {
      void applyLocale(initial)
    }
  }, [applyLocale])

  // Keeps <html lang> right for screen readers, hyphenation and translators.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nContextValue>(
    () => ({ locale, messages, isLoadingLocale, setLocale }),
    [locale, messages, isLoadingLocale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
