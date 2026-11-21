import { Link } from 'react-router-dom'
import { topDestinations } from '../data/siteContent'
import { usePageMeta } from '../hooks/usePageMeta'

export function DestinationsPage() {
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
        <p className="eyebrow">Costa Rica</p>
        <h1>Destinations</h1>
        <p>Check out our most popular destinations in Costa Rica</p>
      </header>

      <section className="destinations-catalog" aria-labelledby="destination-list-title">
        <h2 id="destination-list-title" className="sr-only">
          Destinations catalog
        </h2>
        <div className="destinations-catalog-grid" data-cy="destinations-grid">
          {topDestinations.map((destination) => (
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
