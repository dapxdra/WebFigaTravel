import { createContext } from 'react'

// Head tags collected while prerendering a route at build time.
// In the browser the context is null and the hooks write to document.head in
// effects as usual; during the build (scripts/prerender.mjs) entry-server.tsx
// provides a collector so usePageMeta/useJsonLd can record their values
// synchronously, because effects never run in server rendering.
export interface CollectedHead {
  title?: string
  description?: string
  keywords?: string
  robots?: string
  canonicalUrl?: string
  image?: string
  jsonLd: Record<string, unknown>
}

export interface HeadCollector {
  setMeta: (meta: Omit<CollectedHead, 'jsonLd'>) => void
  setJsonLd: (id: string, data: Record<string, unknown>) => void
}

export function createHeadCollector(): { head: CollectedHead; collector: HeadCollector } {
  const head: CollectedHead = { jsonLd: {} }

  return {
    head,
    collector: {
      setMeta: (meta) => Object.assign(head, meta),
      setJsonLd: (id, data) => {
        head.jsonLd[id] = data
      },
    },
  }
}

export const HeadCollectorContext = createContext<HeadCollector | null>(null)
