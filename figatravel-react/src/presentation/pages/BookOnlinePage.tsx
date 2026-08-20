import { useMemo, useState } from 'react'
import { usePaymentPageViewModel } from '../hooks/usePaymentPageViewModel'
import { ReservationForm } from '../components/payment/ReservationForm'
import { TilopayCheckout } from '../components/payment/TilopayCheckout'
import { usePageMeta } from '../hooks/usePageMeta'
import type { TravelPackage } from '../../domain/entities/TravelPackage'

export function BookOnlinePage() {
  usePageMeta(
    'Book Online',
    'Book private transportation routes across Costa Rica with real pricing and quick request forms.',
  )

  const {
    packages,
    loadingPackages,
    packagesError,
    availability,
    loadingAvailability,
    availabilityError,
    loadAvailability,
    reservation,
    reservationState,
    createReservation,
    sdkSession,
    tokenState,
    fetchSdkToken,
  } = usePaymentPageViewModel()

  const [selectedPackageId, setSelectedPackageId] = useState('')

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedPackageId) ?? null,
    [packages, selectedPackageId],
  )

  return (
    <main className="book-page">
      <header className="book-header">
        <h1>Book Online</h1>
        <p>Choose your route and pay securely to confirm your transfer.</p>
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
        {!reservation ? (
          <ReservationForm
            key={selectedPackage?.id ?? 'default-route'}
            packages={packages}
            loadingPackages={loadingPackages}
            packagesError={packagesError}
            availability={availability}
            loadingAvailability={loadingAvailability}
            availabilityError={availabilityError}
            loadAvailability={loadAvailability}
            submitting={reservationState.loading}
            error={reservationState.error}
            initialPackageId={selectedPackage?.id}
            onSubmit={async (request) => {
              await createReservation(request)
            }}
          />
        ) : (
          <TilopayCheckout
            reservation={reservation}
            sdkSession={sdkSession}
            tokenLoading={tokenState.loading}
            tokenError={tokenState.error}
            fetchSdkToken={fetchSdkToken}
          />
        )}
      </div>
    </main>
  )
}
