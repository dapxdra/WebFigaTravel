import { Link } from 'react-router-dom'
import { fleet } from '../data/siteContent'
import { usePageMeta } from '../hooks/usePageMeta'

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=%2B50672271058&text=Hello%20Figa%20Travel%2C%20I%20have%20a%20question%20about%20your%20fleet&type=phone_number&app_absent=0'

export function FleetPage() {
  usePageMeta(
    'Our Fleet',
    'See the vehicles Figa Travel uses for private transfers in Costa Rica, from a premium SUV to an 18-seat minibus.',
  )

  return (
    <main className="info-page fleet-page" data-cy="fleet-page">
      <header className="section page-hero fleet-hero">
        <p className="eyebrow">OUR FLEET</p>
        <h1>A vehicle for every group size</h1>
        <p className="hero-copy">
          From a premium SUV for two to an 18-seat minibus, every vehicle is air-conditioned,
          insured, and driven by a licensed local driver.
        </p>
      </header>

      <section className="section" aria-labelledby="fleet-list-title">
        <div className="section-head">
          <h2 id="fleet-list-title">Choose the right vehicle</h2>
          <p>
            Not sure which one fits? Tell us your group size and route and we will recommend the
            best option.
          </p>
        </div>

        <div className="fleet-catalog-grid">
          {fleet.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="fleet-card fleet-card--detailed"
              data-cy="fleet-card"
            >
              <div className="fleet-card__media">
                <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                {vehicle.premium ? (
                  <span className="fleet-card__badge">Premium</span>
                ) : null}
              </div>

              <div className="fleet-card__body">
                <p className="fleet-card__category">{vehicle.category}</p>
                <h3 className="fleet-card__name">{vehicle.name}</h3>
                <p className="fleet-card__cap">{vehicle.capacity}</p>
                <p className="fleet-card__summary">{vehicle.summary}</p>

                <ul className="fleet-card__features">
                  {vehicle.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <Link to="/book-online" className="fleet-card__cta" data-cy="fleet-card-book">
                  Book this vehicle
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="faq-cta-row" >
          <a href={WHATSAPP_URL} className="hero-cta" target="_blank" rel="noreferrer">
            Ask on WhatsApp
          </a>
          <Link to="/book-online" className="hero-cta ghost">
            Book a transfer
          </Link>
        </div>
      </section>
    </main>
  )
}
