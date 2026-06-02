import { Link, useParams } from 'react-router-dom'
import { findDestinationBySlug } from '../data/siteContent'

export function DestinationDetailPage() {
  const { slug } = useParams()
  const destination = slug ? findDestinationBySlug(slug) : undefined

  if (!destination) {
    return (
      <main>
        <section className="section page-hero">
          <h1>Destino no encontrado</h1>
          <p className="hero-copy">
            El destino solicitado no existe o fue removido del catalogo.
          </p>
          <Link className="hero-cta" to="/destinations">
            Volver a destinos
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="destination-detail-page">
      <section className="destination-intro-block">
        <div className="destination-intro-copy">
          <h1>{destination.name}</h1>
          <p>{destination.intro}</p>
          <Link className="destination-book-button" to="/book-online">
            {destination.bookLabel}
          </Link>
        </div>

        <img
          src={destination.heroImage}
          alt={destination.name}
          className="destination-hero-main"
        />
      </section>

      <section className="destination-gallery" aria-label="Destination gallery">
        {destination.gallery.map((item) => (
          <img
            key={item}
            src={item}
            alt={destination.name}
            className="destination-gallery-item"
          />
        ))}
      </section>

      <section
        className="destination-text-columns"
        aria-labelledby="destination-info-title"
      >
        <h2 id="destination-info-title" className="sr-only">
          Destination information
        </h2>

        <div className="destination-text-card">
          <h3>TOP ATRACTIONS</h3>
          <ul>
            {destination.attractions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="destination-text-card">
          <h3>TRAVEL TIPS</h3>
          <ul>
            {destination.travelTips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
