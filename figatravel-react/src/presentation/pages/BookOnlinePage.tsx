import { useMemo, useState } from 'react'
import { useBookingFormViewModel } from '../hooks/useBookingFormViewModel'
import { LeadForm } from '../components/LeadForm'
import { usePageMeta } from '../hooks/usePageMeta'
import type { TravelPackage } from '../../domain/entities/TravelPackage'

export function BookOnlinePage() {
  usePageMeta(
    'Book Online',
    'Book private transportation routes across Costa Rica with real pricing and quick request forms.',
  )

  const { packages, loadingPackages, packagesError } = useBookingFormViewModel()
  const [selectedPackageId, setSelectedPackageId] = useState('')

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedPackageId) ?? null,
    [packages, selectedPackageId],
  )

  const routePrefillMessage = useMemo(() => {
    if (!selectedPackage) {
      return ''
    }

    return `Interested in ${selectedPackage.title} (${selectedPackage.destination}) - ${selectedPackage.currency} ${selectedPackage.price.toFixed(2)}.`
  }, [selectedPackage])

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
          {packages.map((item: TravelPackage) => (
            <article key={item.id} className="book-option-row">
              <div className="book-option-info">
                <h3>{item.title}</h3>
                <p>{item.destination}</p>
                <p>{item.description}</p>
              </div>

              <div className="book-option-price-wrap">
                <p>
                  <strong>
                    {item.currency} {item.price.toFixed(2)}
                  </strong>
                </p>
                <a
                  href="#booking-form"
                  className="book-now-link"
                  onClick={() => {
                    setSelectedPackageId(item.id)
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
          key={selectedPackage?.id ?? 'default-route'}
          title="Request your transportation"
          subtitle={
            selectedPackage
              ? `Selected route: ${selectedPackage.title}`
              : 'Select one route above or fill the form directly.'
          }
          showAvailability
          defaultMessage={routePrefillMessage}
        />
      </div>
    </main>
  )
}
