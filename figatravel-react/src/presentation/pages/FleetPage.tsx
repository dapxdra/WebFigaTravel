import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappUrl } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { useSiteContent } from '../i18n/useSiteContent'

export function FleetPage() {
  const { m } = useI18n()
  const t = m.fleetPage
  const { fleet } = useSiteContent()

  usePageMeta(
    'Our Fleet',
    'See the vehicles Figa Travel uses for private transfers in Costa Rica, from a premium SUV to an 18-seat minibus.',
    {
      keywords: 'van rental with driver Costa Rica, minibus rental Costa Rica, group transportation Costa Rica',
    },
  )

  return (
    <main className="info-page fleet-page" data-cy="fleet-page">
      <header className="section page-hero fleet-hero">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="hero-copy">{t.intro}</p>
      </header>

      <section className="section" aria-labelledby="fleet-list-title">
        <div className="section-head">
          <h2 id="fleet-list-title">{t.listTitle}</h2>
          <p>{t.listIntro}</p>
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
                  <span className="fleet-card__badge">{m.common.premium}</span>
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
                  {t.bookVehicle}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="faq-cta-row" >
          <a
            href={whatsappUrl(m.common.whatsappFleetText)}
            className="hero-cta"
            target="_blank"
            rel="noreferrer"
            data-cy="fleet-whatsapp"
          >
            {t.askWhatsApp}
          </a>
          <Link to="/book-online" className="hero-cta ghost" data-cy="fleet-book-transfer">
            {t.bookTransfer}
          </Link>
        </div>
      </section>
    </main>
  )
}
