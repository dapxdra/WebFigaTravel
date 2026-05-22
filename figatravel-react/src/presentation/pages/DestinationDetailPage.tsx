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
    <main>
      <header className="section destination-hero">
        <img src={destination.image} alt={destination.name} className="detail-image" />
        <div className="destination-copy">
          <p className="eyebrow">DESTINATION DETAIL</p>
          <h1>{destination.name}</h1>
          <p className="hero-copy">{destination.summary}</p>
          <div className="detail-meta">
            <p>
              <strong>Tiempo estimado:</strong> {destination.transferTime}
            </p>
            <p>
              <strong>Ideal para:</strong> {destination.bestFor}
            </p>
          </div>
          <Link className="hero-cta" to="/book-online">
            Reservar traslado
          </Link>
        </div>
      </header>

      <section className="section" aria-labelledby="highlights-title">
        <div className="section-head">
          <h2 id="highlights-title">Highlights</h2>
          <p>Experiencias recomendadas por nuestro equipo local.</p>
        </div>

        <ul className="detail-list">
          {destination.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
