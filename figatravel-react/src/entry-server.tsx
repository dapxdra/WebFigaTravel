// Build-time only entry (never shipped to the browser). scripts/prerender.mjs
// loads the SSR bundle of this file to turn every public route into static
// HTML, so search engines and AI crawlers that don't execute JavaScript
// (GPTBot, ClaudeBot, PerplexityBot...) still read the full page content.
/* eslint-disable react-refresh/only-export-components -- build-time module, never hot-reloaded */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { AuthProvider } from './presentation/auth/AuthProvider'
import { faqItems, fleet, priorities, topDestinations } from './presentation/data/siteContent'
import { HeadCollectorContext, createHeadCollector, type CollectedHead } from './presentation/seo/HeadCollector'
import { BUSINESS, SITE_NAME, SITE_URL } from './shared/config/seo'

export { BUSINESS, SITE_NAME, SITE_URL, faqItems, fleet, priorities, topDestinations }

/** Public, indexable routes. Transactional/admin routes stay client-only. */
export const prerenderRoutes: string[] = [
  '/',
  '/destinations',
  ...topDestinations.map((destination) => `/destinations/${destination.slug}`),
  '/fleet',
  '/book-online',
  '/faq',
  '/about-us',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
]

export async function render(url: string): Promise<{ html: string; head: CollectedHead }> {
  const { head, collector } = createHeadCollector()

  // prerender waits for every Suspense boundary (lazy routes
  // included) before resolving, so the output is the complete page.
  const { prelude } = await prerender(
    <StrictMode>
      <HeadCollectorContext.Provider value={collector}>
        <AuthProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </AuthProvider>
      </HeadCollectorContext.Provider>
    </StrictMode>,
  )

  // prelude is a web ReadableStream; Response reads it fully as text.
  const html = await new Response(prelude).text()

  return { html, head }
}
