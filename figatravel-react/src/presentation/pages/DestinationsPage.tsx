import { Link } from 'react-router-dom'
import { topDestinations } from '../data/siteContent'

export function DestinationsPage() {
  return (
    <main>
      <header className="section page-hero">
        <p className="eyebrow">TOP DESTINATIONS IN COSTA RICA</p>
        <h1>Destinations</h1>
        <p className="hero-copy">
          Descubre los destinos mas solicitados y disena una ruta a tu medida.
        </p>
      </header>

      <section className="section" aria-labelledby="destination-list-title">
        <div className="section-head">
          <h2 id="destination-list-title">Selecciona tu proximo destino</h2>
          <p>
            Desde playas del Pacifico hasta volcanes y rutas urbanas en San Jose.
          </p>
        </div>

        <div className="destination-grid">
          {topDestinations.map((destination) => (
            <article key={destination.name} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p className="destination-summary">{destination.summary}</p>
              <Link to={`/destinations/${destination.slug}`} className="card-link">
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
