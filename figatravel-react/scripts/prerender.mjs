// Post-build step (see "build" in package.json):
//   1. Renders every public route of the SPA to static HTML with its own
//      <title>, meta tags, canonical and JSON-LD, so crawlers that don't run
//      JavaScript (most AI assistants) read the real content.
//   2. Generates sitemap.xml, llms.txt and llms-full.txt from the same data the
//      site renders, so they never drift out of sync.
// In the browser React simply replaces the prerendered markup on load.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const server = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const { render, prerenderRoutes, SITE_URL, SITE_NAME, BUSINESS } = server
const { topDestinations, fleet, faqItems, priorities } = server

const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
const buildDate = new Date().toISOString().slice(0, 10)

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// JSON inside <script> must not be able to close the tag early.
function safeJson(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

// Removes the default per-page tags from index.html so each route gets its own.
function stripPageTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(
      /<meta\s+(?:name|property)="(?:description|keywords|robots|og:title|og:description|og:url|og:image|twitter:title|twitter:description|twitter:image)"[\s\S]*?\/>\s*/g,
      '',
    )
    .replace(/<link rel="canonical"[^>]*\/>\s*/, '')
}

function buildHeadTags(head) {
  const tags = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(head.keywords)}" />`,
    `<meta name="robots" content="${escapeHtml(head.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(head.canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(head.canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(head.image)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(head.image)}" />`,
  ]

  for (const [id, data] of Object.entries(head.jsonLd)) {
    tags.push(`<script type="application/ld+json" id="${escapeHtml(id)}">${safeJson(data)}</script>`)
  }

  return tags.join('\n    ')
}

// "/" -> index.html, "/faq" -> faq.html, "/destinations/x" -> destinations/x.html
// (served extensionless thanks to "cleanUrls" in vercel.json).
function outputPathFor(route) {
  return resolve(distDir, route === '/' ? 'index.html' : `${route.slice(1)}.html`)
}

// The untouched SPA shell serves client-only routes (admin, payment result,
// 404s). It is noindex so unknown URLs never get indexed as duplicates.
const shell = template.replace(
  /<meta name="robots" content="[^"]*" \/>/,
  '<meta name="robots" content="noindex, nofollow" />',
)
await writeFile(resolve(distDir, 'spa.html'), shell)

for (const route of prerenderRoutes) {
  const { html, head } = await render(route)
  const page = stripPageTags(template)
    .replace('</head>', `    ${buildHeadTags(head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const file = outputPathFor(route)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page)
  console.log(`prerendered ${route}`)
}

// ---------- sitemap.xml ----------
const sitemapEntries = prerenderRoutes
  .map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`
    const priority = route === '/' ? '1.0' : route.startsWith('/destinations/') ? '0.8' : '0.7'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')

await writeFile(
  resolve(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
)

// ---------- llms.txt (https://llmstxt.org) ----------
const summary =
  `${SITE_NAME} is a licensed private transportation company based in La Fortuna (Arenal), Costa Rica. ` +
  'It offers private airport transfers, door-to-door shuttles between tourist destinations, and group ' +
  'transportation across Costa Rica with bilingual (English/Spanish) drivers, flight tracking, and fixed prices.'

const llms = `# ${SITE_NAME}

> ${summary}

Contact: phone ${BUSINESS.phone}, WhatsApp ${BUSINESS.whatsapp}, email ${BUSINESS.email}. Location: ${BUSINESS.city}.
Book online at ${SITE_URL}/book-online (secure card payment).

## Main pages
- [Home](${SITE_URL}/): Private transfers and airport shuttle in Costa Rica
- [Book Online](${SITE_URL}/book-online): Choose a route, date, pickup time and pay online
- [FAQ](${SITE_URL}/faq): Answers about booking, airports, vehicles, prices and safety
- [Fleet](${SITE_URL}/fleet): Vehicles from a premium SUV to an 18-seat minibus
- [Contact](${SITE_URL}/contact): Phone, WhatsApp, email and contact form
- [About Us](${SITE_URL}/about-us): Company background

## Destinations
${topDestinations
  .map((d) => `- [${d.name}](${SITE_URL}/destinations/${d.slug}): ${d.summary} Transfer time: ${d.transferTime}.`)
  .join('\n')}

## Optional
- [Full details for AI assistants](${SITE_URL}/llms-full.txt)
- [Terms and Conditions](${SITE_URL}/terms-and-conditions)
- [Privacy Policy](${SITE_URL}/privacy-policy)
`

const llmsFull = `# ${SITE_NAME}: complete reference

> ${summary}

Last updated: ${buildDate}. Website: ${SITE_URL}/

## Contact and booking
- Phone: ${BUSINESS.phone}
- WhatsApp: ${BUSINESS.whatsapp}
- Email: ${BUSINESS.email}
- Base: ${BUSINESS.city}
- Online booking: ${SITE_URL}/book-online (route, date, pickup time, pickup location, travelers; paid securely by card through Tilopay)

## Why travelers choose ${SITE_NAME}
${priorities.map((p) => `- ${p.title}: ${p.description}`).join('\n')}

## Destinations and private transfer times
${topDestinations
  .map(
    (d) =>
      `### ${d.name}\n- URL: ${SITE_URL}/destinations/${d.slug}\n- Transfer time: ${d.transferTime}\n- Best for: ${d.bestFor}\n- ${d.intro}\n- Top attractions:\n${d.attractions.map((a) => `  - ${a}`).join('\n')}\n- Travel tips:\n${d.travelTips.map((t) => `  - ${t}`).join('\n')}`,
  )
  .join('\n\n')}

## Fleet
${fleet.map((v) => `- ${v.name} (${v.category}, ${v.capacity}): ${v.summary}`).join('\n')}

## Frequently asked questions
${faqItems.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}
`

await writeFile(resolve(distDir, 'llms.txt'), llms)
await writeFile(resolve(distDir, 'llms-full.txt'), llmsFull)

await rm(ssrDir, { recursive: true, force: true })
console.log(`prerender done: ${prerenderRoutes.length} routes, sitemap.xml, llms.txt, llms-full.txt`)
