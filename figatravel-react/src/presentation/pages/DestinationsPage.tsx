import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { useI18n } from '../i18n/useI18n'
import { useSiteContent } from '../i18n/useSiteContent'

export function DestinationsPage() {
  const { m } = useI18n()
  const t = m.destinationsPage
  const { destinations } = useSiteContent()

  usePageMeta(
    'Top Destinations',
    'Explore Costa Rica destinations including La Fortuna, Manuel Antonio, Tamarindo, and more with Figa Travel.',
    {
      keywords:
        'Costa Rica destinations transfer, La Fortuna transfer, Manuel Antonio transfer, Tamarindo transfer, Papagayo transfer',
    },
  )

  return (
    <main className="destinations-page" data-cy="destinations-page">
      <header className="destinations-header page-header" data-cy="destinations-header">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <section className="destinations-catalog" aria-labelledby="destination-list-title">
        <h2 id="destination-list-title" className="sr-only">
          {t.catalogTitle}
        </h2>
        <div className="destinations-catalog-grid" data-cy="destinations-grid">
          {destinations.map((destination) => (
            // The heading link is stretched over the whole card via CSS, so the
            // card is clickable while keeping a single, short link name.
            <article
              key={destination.slug}
              className="destinations-catalog-card"
              data-cy={`destination-card-${destination.slug}`}
            >
              <img src={destination.cardImage} alt="" loading="lazy" />
              <h3>
                <Link
                  to={`/destinations/${destination.slug}`}
                  className="destinations-card-link"
                  data-cy={`destination-link-${destination.slug}`}
                >
                  {destination.name}
                </Link>
              </h3>
              <p className="destinations-card-summary">{destination.summary}</p>
              <p className="destinations-card-meta">
                <span>{destination.transferTime}</span>
                <span className="destinations-card-arrow" aria-hidden="true">
                  →
                </span>
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
