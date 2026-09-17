import { useEffect } from 'react'
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../../shared/config/seo'

const defaultTitle = SITE_NAME
const defaultDescription =
  'Private transfers and curated travel routes in Costa Rica. Safe, punctual, and comfortable transportation.'

interface PageMetaOptions {
  /** Extra keywords for this page; merged with the site-wide defaults. */
  keywords?: string
  /** Absolute image URL for social previews; falls back to the site default. */
  image?: string
  /** Set true for pages that should not be indexed (admin, auth, transactional, 404). */
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  const existing = document.querySelector(selector)

  if (existing) {
    existing.setAttribute('content', content)
    return
  }

  const meta = document.createElement('meta')
  meta.setAttribute(attr, key)
  meta.setAttribute('content', content)
  document.head.appendChild(meta)
}

function upsertCanonical(href: string) {
  const existing = document.querySelector('link[rel="canonical"]')

  if (existing) {
    existing.setAttribute('href', href)
    return
  }

  const link = document.createElement('link')
  link.setAttribute('rel', 'canonical')
  link.setAttribute('href', href)
  document.head.appendChild(link)
}

export function usePageMeta(title: string, description: string, options: PageMetaOptions = {}) {
  const { keywords, image, noindex } = options

  useEffect(() => {
    const fullTitle = title === defaultTitle ? defaultTitle : `${title} | ${defaultTitle}`
    document.title = fullTitle

    const canonicalUrl = `${SITE_URL}${window.location.pathname}`
    const ogImage = image ?? DEFAULT_OG_IMAGE

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertCanonical(canonicalUrl)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)
  }, [title, description, keywords, image, noindex])
}

export const defaultSeoDescription = defaultDescription
