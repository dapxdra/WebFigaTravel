import { useMemo, useState } from 'react'
import { useBookingFormViewModel } from '../hooks/useBookingFormViewModel'
import { LeadForm } from '../components/LeadForm'

interface TransferOption {
  id: string
  route: string
  duration: string
  priceUSD: number
}

const transferOptions: TransferOption[] = [
  { id: 'lf-sjo-airport', route: 'La Fortuna - San Jose Airport', duration: '3 hr', priceUSD: 175 },
  { id: 'lf-sjo-downtown', route: 'La Fortuna - San Jose Downtown', duration: '3 hr 30 min', priceUSD: 207 },
  { id: 'lf-liberia', route: 'La Fortuna - Liberia Airport', duration: '3 hr', priceUSD: 188 },
  { id: 'lf-papagayo', route: 'La Fortuna - Papagayo', duration: '3 hr 30 min', priceUSD: 230 },
  { id: 'lf-tamarindo', route: 'La Fortuna - Tamarindo', duration: '4 hr', priceUSD: 278 },
  { id: 'lf-poas', route: 'La Fortuna - Poas', duration: '1 hr 45 min', priceUSD: 219 },
  { id: 'lf-jaco', route: 'La Fortuna - Jaco', duration: '4 hr', priceUSD: 207 },
  { id: 'lf-manuel', route: 'La Fortuna - Manuel Antonio', duration: '5 hr', priceUSD: 279 },
  { id: 'lf-rio-celeste', route: 'La Fortuna - Rio Celeste', duration: '1 hr 30 min', priceUSD: 170 },
  { id: 'lf-guanacaste', route: 'La Fortuna - Guanacaste', duration: '3 hr 30 min', priceUSD: 218 },
  { id: 'lf-bajos', route: 'La Fortuna - Bajos del Toro', duration: '1 hr 45 min', priceUSD: 145 },
  { id: 'lf-monteverde', route: 'La Fortuna - Monteverde', duration: '3 hr', priceUSD: 215 },
  { id: 'lf-montezuma', route: 'La Fortuna - Montezuma', duration: '5 hr 30 min', priceUSD: 215 },
  { id: 'lf-dreams', route: 'La Fortuna - Dreams Las Mareas', duration: '4 hr', priceUSD: 376 },
  { id: 'lf-catalinas', route: 'La Fortuna - Las Catalinas', duration: '4 hr', priceUSD: 266 },
  { id: 'lf-riu', route: 'La Fortuna - Riu Hotels', duration: '3 hr 30 min', priceUSD: 225 },
  { id: 'lf-samara', route: 'La Fortuna - Samara', duration: '4 hr 30 min', priceUSD: 328 },
  { id: 'lf-puerto-viejo', route: 'La Fortuna - Puerto Viejo', duration: '5 hr', priceUSD: 352 },
  { id: 'lf-sarapiqui', route: 'La Fortuna - Sarapiqui', duration: '1 hr 30 min', priceUSD: 135 },
]

export function BookOnlinePage() {
  const { loadingPackages, packagesError } = useBookingFormViewModel()
  const [selectedRoute, setSelectedRoute] = useState<TransferOption | null>(null)

  const routePrefillMessage = useMemo(() => {
    if (!selectedRoute) {
      return ''
    }

    return `Interested in ${selectedRoute.route} (${selectedRoute.duration}) - ${selectedRoute.priceUSD} USD.`
  }, [selectedRoute])

  return (
    <main className="book-page">
      <header className="book-header">
        <h1>Book Online</h1>
        <p>Choose your route and request your transfer in a few clicks.</p>
      </header>

      <section className="book-discount-bar" aria-label="Discount code">
        <p>
          Get 10% discount when you book online 2 or more transfers around Costa Rica.
          Use code <strong>FIGA10</strong>.
        </p>
      </section>

      <section className="book-options" aria-labelledby="book-options-title">
        <h2 id="book-options-title" className="sr-only">
          Book online routes
        </h2>

        {loadingPackages ? <p>Loading packages...</p> : null}
        {packagesError ? <p className="error-text">{packagesError}</p> : null}

        <div className="book-option-list">
          {transferOptions.map((option) => (
            <article key={option.id} className="book-option-row">
              <div className="book-option-info">
                <h3>{option.route}</h3>
                <p>{option.duration}</p>
              </div>

              <div className="book-option-price-wrap">
                <p>
                  <strong>{option.priceUSD} US dollars</strong>
                </p>
                <a
                  href="#booking-form"
                  className="book-now-link"
                  onClick={() => {
                    setSelectedRoute(option)
                  }}
                >
                  Book now
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div id="booking-form">
        <LeadForm
            key={selectedRoute?.id ?? 'default-route'}
          title="Request your transportation"
          subtitle={
            selectedRoute
              ? `Selected route: ${selectedRoute.route}`
              : 'Select one route above or fill the form directly.'
          }
          showAvailability
          defaultMessage={routePrefillMessage}
        />
      </div>
    </main>
  )
}
