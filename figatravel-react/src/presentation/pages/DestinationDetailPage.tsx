import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SITE_NAME, SITE_URL } from '../../shared/config/seo'
import { buildDestinationFaq, findDestinationBySlug } from '../data/siteContent'
import { useJsonLd } from '../hooks/useJsonLd'
import { usePageMeta } from '../hooks/usePageMeta'
import { useI18n } from '../i18n/useI18n'
import { useSiteContent } from '../i18n/useSiteContent'

export function DestinationDetailPage() {
  const { slug } = useParams()
  const { m } = useI18n()
  const t = m.destinationDetail
  const content = useSiteContent()

  // SEO tags and JSON-LD always use the English source (it is what the
  // prerendered HTML carries); the visible page uses the chosen language.
  const destination = slug ? findDestinationBySlug(slug) : undefined
  const destinationFaq = useMemo(
    () => (destination ? buildDestinationFaq(destination) : []),
    [destination],
  )
  const localized = slug ? content.findDestination(slug) : undefined
  const localizedFaq = useMemo(
    () => (localized ? content.buildDestinationFaq(localized) : []),
    [content, localized],
  )

  usePageMeta(
    destination ? `Private Transfer & Shuttle to ${destination.name}` : 'Destination Not Found',
    destination
      ? `Private transfer and airport shuttle to ${destination.name}, Costa Rica (${destination.transferTime}). ${destination.summary} Fixed door-to-door price, bilingual driver, flight tracking. Book with Figa Travel.`
      : 'The destination you requested is not available in our Costa Rica catalog.',
    destination
      ? {
          keywords: `${destination.name} transfer, ${destination.name} shuttle, private transportation to ${destination.name}, San Jose to ${destination.name}, SJO airport to ${destination.name}`,
        }
      : { noindex: true },
  )

  // One @graph so crawlers get the place, the breadcrumb trail and the Q&A
  // for this destination together.
  const destinationJsonLd = useMemo(() => {
    if (!destination) {
      return null
    }

    const pageUrl = `${SITE_URL}/destinations/${destination.slug}`

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TouristDestination',
          name: `${destination.name}, Costa Rica`,
          description: destination.intro,
          url: pageUrl,
          touristType: destination.bestFor,
          includesAttraction: destination.attractions.map((item) => ({
            '@type': 'TouristAttraction',
            name: item.split(':')[0],
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${SITE_URL}/destinations` },
            { '@type': 'ListItem', position: 3, name: destination.name, item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: destinationFaq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ],
    }
  }, [destination, destinationFaq])

  useJsonLd('destination-json-ld', destinationJsonLd)

  if (!localized) {
    return (
      <main data-cy="destination-not-found">
        <section className="section page-hero">
          <h1>{t.notFoundTitle}</h1>
          <p className="hero-copy">{t.notFoundText}</p>
          <Link className="hero-cta" to="/destinations" data-cy="destination-back-link">
            {t.backToDestinations}
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="destination-detail-page" data-cy="destination-detail-page">
      <section className="destination-intro-block">
        <div className="destination-intro-copy">
          <h1>{localized.name}</h1>
          <p>{localized.intro}</p>
          <Link className="destination-book-button" to="/book-online" data-cy="destination-book-button">
            {localized.bookLabel}
          </Link>
        </div>

        <img
          src={localized.heroImage}
          alt={t.heroAlt(localized.name)}
          className="destination-hero-main"
          loading="eager"
        />
      </section>

      <section className="destination-gallery" aria-label={t.galleryAria} data-cy="destination-gallery">
        {localized.gallery.map((item, index) => (
          <img
            key={item}
            src={item}
            alt={t.photoAlt(localized.name, index + 1)}
            className="destination-gallery-item"
            loading="lazy"
          />
        ))}
      </section>

      <section
        className="destination-text-columns"
        aria-labelledby="destination-info-title"
      >
        <h2 id="destination-info-title" className="sr-only">
          {t.infoTitle}
        </h2>

        <div className="destination-text-card" data-cy="destination-attractions">
          <h3>{t.topAttractions}</h3>
          <ul>
            {localized.attractions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="destination-text-card" data-cy="destination-travel-tips">
          <h3>{t.travelTips}</h3>
          <ul>
            {localized.travelTips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section"
        aria-labelledby="destination-faq-title"
        data-cy="destination-faq"
      >
        <div className="section-head">
          <h2 id="destination-faq-title">{t.faqTitle(localized.name)}</h2>
        </div>

        <div className="faq-list">
          {localizedFaq.map((item, index) => (
            <div key={item.question} className="faq-item" data-cy={`destination-faq-item-${index}`}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
