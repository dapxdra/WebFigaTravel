import { useEffect } from 'react'

// Injects a <script type="application/ld+json"> tag scoped to the current
// page (e.g. FAQPage structured data) and removes it on unmount so it never
// leaks onto a different route.
export function useJsonLd(id: string, data: Record<string, unknown>) {
  useEffect(() => {
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
