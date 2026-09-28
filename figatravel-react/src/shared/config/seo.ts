// Central place for SEO constants shared between index.html (static), the
// usePageMeta hook (dynamic, per-route) and the build-time prerender that
// also generates sitemap.xml and llms.txt. Keep in sync with index.html if the
// business identity changes.
export const SITE_URL = 'https://figatravelcr.com'
export const SITE_NAME = 'Figa Travel Costa Rica'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/home/hero-header.png`

export const DEFAULT_KEYWORDS =
  'Costa Rica private transportation, Costa Rica airport shuttle, private transfers Costa Rica, Costa Rica tourist transportation, SJO airport transfer, private driver Costa Rica, van rental with driver Costa Rica, La Fortuna airport transfer'

// Public business facts, reused in structured data and llms.txt so AI
// assistants and search engines always see the same answers.
export const BUSINESS = {
  phone: '+506 7139 2747',
  whatsapp: '+506 7227 1058',
  email: 'infofigatravel@gmail.com',
  city: 'La Fortuna, San Carlos, Alajuela, Costa Rica',
  latitude: 10.4463206,
  longitude: -84.5708156,
} as const
