import { Link } from 'react-router-dom'
import {
  priorities,
  testimonials,
  topDestinations,
} from '../data/siteContent'

export function HomePage() {
  return (
    <>
      <header className="hero">
        <p className="eyebrow">FIGA TRAVEL AGENCY</p>
        <h1>Discover the Beauty of Costa Rica with FIGA TRAVEL</h1>
        <p className="hero-copy">
          Traslados privados, tours y asesoramiento local para que tu ruta en
          Costa Rica sea segura, comoda y memorable.
        </p>
        <div className="hero-badges">
          <span>WI-FI</span>
          <span>Customer Service</span>
          <span>Eco-conscious</span>
          <span>Well-maintained vehicles</span>
        </div>
        <Link to="/book-online" className="hero-cta">
          Book now
        </Link>
      </header>

      <main>
        <section className="section" aria-labelledby="featured-title">
          <div className="section-head">
            <h2 id="featured-title">Top Destinations in Costa Rica</h2>
            <p>Rutas populares para descubrir naturaleza, playa y aventura.</p>
          </div>

          <div className="destination-grid">
            {topDestinations.slice(0, 4).map((destination) => (
              <article key={destination.name} className="destination-card">
                <img src={destination.image} alt={destination.name} />
                <h3>{destination.name}</h3>
              </article>
            ))}
          </div>

          <Link to="/destinations" className="hero-cta">
            Ver todos los destinos
          </Link>
        </section>

        <section className="section" aria-labelledby="safety-title">
          <div className="section-head">
            <h2 id="safety-title">Safety is our top priority</h2>
            <p>Cuidamos cada detalle operativo para que viajes con confianza.</p>
          </div>

          <div className="priority-grid">
            {priorities.map((priority) => (
              <article key={priority.title} className="priority-card">
                <h3>{priority.title}</h3>
                <p>{priority.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="testimonials-title">
          <div className="section-head">
            <h2 id="testimonials-title">What our customers are saying</h2>
            <p>Experiencias reales de viajeros que reservaron con Figa Travel.</p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.author} className="testimonial-card">
                <h3>{testimonial.author}</h3>
                <p>{testimonial.quote}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="promo-title">
          <div className="section-head">
            <h2 id="promo-title">Book online with 10% discount</h2>
            <p>
              Reserva dos o mas traslados y usa el codigo FIGA10 durante checkout.
            </p>
          </div>
          <div className="faq-cta-row">
            <Link to="/book-online" className="hero-cta">
              Ir a reservar
            </Link>
            <Link to="/faq" className="hero-cta ghost">
              Ver FAQ
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
