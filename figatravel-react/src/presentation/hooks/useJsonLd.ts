import { useContext, useEffect } from 'react'
import { HeadCollectorContext } from '../seo/HeadCollector'

// Injects a <script type="application/ld+json"> tag scoped to the current
// page (e.g. FAQPage structured data) and removes it on unmount so it never
// leaks onto a different route. During the build-time prerender the data is
// recorded in the head collector instead, so it ships in the static HTML.
// Pass null to render nothing (hooks cannot be called conditionally).
export function useJsonLd(id: string, data: Record<string, unknown> | null) {
  const collector = useContext(HeadCollectorContext)

  if (collector && data) {
    collector.setJsonLd(id, data)
  }

  useEffect(() => {
    // The prerendered page already contains this script; replace it rather
    // than adding a duplicate.
    document.getElementById(id)?.remove()

    if (!data) {
      return
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, JSON.stringify(data)])
}
