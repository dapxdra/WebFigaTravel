import { Link } from 'react-router-dom'
import { topDestinations } from '../data/siteContent'
import { usePageMeta } from '../hooks/usePageMeta'

export function DestinationsPage() {
  usePageMeta(
    'Top Destinations',
    'Explore Costa Rica destinations including La Fortuna, Manuel Antonio, Tamarindo, and more with Figa Travel.',
  )

  return (
    <main className="destinations-page">
      <header className="destinations-header">
        <h1>DESTINATIONS</h1>
        <p>Check out our most popular destinations in Costa Rica</p>
      </header>

      <section className="destinations-catalog" aria-labelledby="destination-list-title">
        <h2 id="destination-list-title" className="sr-only">
          Destinations catalog
        </h2>
        <div className="destinations-catalog-grid">
          {topDestinations.map((destination) => (
            <article key={destination.slug} className="destinations-catalog-card">
              <img src={destination.cardImage} alt={destination.name} loading="lazy" />
              <Link to={`/destinations/${destination.slug}`} className="destinations-card-link">
                {destination.name}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
