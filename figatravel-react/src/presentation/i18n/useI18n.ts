import { useContext } from 'react'
import { I18nContext } from './i18nContext'

/** Current language, its UI messages (`m`) and the language setter. */
export function useI18n() {
  const { messages, ...rest } = useContext(I18nContext)
  return { m: messages, ...rest }
}
