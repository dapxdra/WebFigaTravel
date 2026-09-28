import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../../shared/config/seo'
import { HeadCollectorContext } from '../seo/HeadCollector'

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
  const { pathname } = useLocation()
  const collector = useContext(HeadCollectorContext)

  const fullTitle = title === defaultTitle ? defaultTitle : `${title} | ${defaultTitle}`
  // Home is canonicalized with a trailing slash, every other route without one.
  const canonicalUrl = pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname.replace(/\/$/, '')}`
  const ogImage = image ?? DEFAULT_OG_IMAGE
  const allKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS
  const robots = noindex ? 'noindex, nofollow' : 'index, follow'

  // Build-time prerender only: record the tags so they land in the static HTML.
  if (collector) {
    collector.setMeta({
      title: fullTitle,
      description,
      keywords: allKeywords,
      robots,
      canonicalUrl,
      image: ogImage,
    })
  }

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', allKeywords)
    upsertMeta('name', 'robots', robots)
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
  }, [fullTitle, description, allKeywords, robots, canonicalUrl, ogImage])
}

export const defaultSeoDescription = defaultDescription
