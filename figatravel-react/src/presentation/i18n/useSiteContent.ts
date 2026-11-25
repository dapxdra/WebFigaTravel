import { useMemo } from 'react'
import { localizeContent } from './localizeContent'
import { useI18n } from './useI18n'

/** Destinations, fleet, priorities and FAQ in the current language. */
export function useSiteContent() {
  const { m, locale } = useI18n()
  return useMemo(() => localizeContent(m.content, locale), [m, locale])
}
