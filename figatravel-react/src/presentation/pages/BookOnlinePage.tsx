import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePaymentPageViewModel } from '../hooks/usePaymentPageViewModel'
import { ReservationForm } from '../components/payment/ReservationForm'
import { TilopayCheckout } from '../components/payment/TilopayCheckout'
import { CustomRouteBookingForm } from '../components/payment/CustomRouteBookingForm'
import { RouteSearchCard } from '../components/route-search/RouteSearchCard'
import { usePageMeta } from '../hooks/usePageMeta'
import type { TravelPackage } from '../../domain/entities/TravelPackage'
import type { CustomRouteSearch, RoutePlace } from '../../domain/entities/CustomRoute'

function isRoutePlace(value: unknown): value is RoutePlace {
  const place = value as RoutePlace | null
  return typeof place?.placeId === 'string' && typeof place.label === 'string'
}

// The home page hands its route search over via router state. History state
// can be stale or hand-edited, so validate its shape before using it.
function readRouteSearchState(state: unknown): CustomRouteSearch | null {
  const search = (state as { routeSearch?: CustomRouteSearch } | null)?.routeSearch
  if (
    !search ||
    !isRoutePlace(search.origin) ||
    !isRoutePlace(search.destination) ||
    !Number.isInteger(search.passengers?.adults) ||
    !Number.isInteger(search.passengers?.children)
  ) {
    return null
  }
  return search
}

type BookingMode = 'custom' | 'packages'

const BOOKING_MODES: { key: BookingMode; label: string }[] = [
  { key: 'custom', label: 'Any route - instant price' },
  { key: 'packages', label: 'Fixed-price routes' },
]

export function BookOnlinePage() {
  usePageMeta(
    'Book Online',
    'Book private transportation across Costa Rica: get an instant door-to-door price for any route, or choose one of our fixed-price transfers.',
    { keywords: 'book airport shuttle Costa Rica, book private transfer Costa Rica, Costa Rica transfer booking' },
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
    quotedRoute,
    quoteState,
    quoteCustomRoute,
    customReservationState,
    createCustomRouteReservation,
  } = usePaymentPageViewModel()

  const location = useLocation()
  const initialRouteSearch = useMemo(() => readRouteSearchState(location.state), [location.state])
  const autoQuotedRef = useRef(false)

  const [selectedPackageId, setSelectedPackageId] = useState('')
  // Coming from the home search always opens the custom route tab.
  const [bookingMode, setBookingMode] = useState<BookingMode>('custom')

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedPackageId) ?? null,
    [packages, selectedPackageId],
  )

  // Arriving from the home page search: price that route right away.
  useEffect(() => {
    if (initialRouteSearch && !autoQuotedRef.current) {
      autoQuotedRef.current = true
      void quoteCustomRoute(initialRouteSearch)
    }
  }, [initialRouteSearch, quoteCustomRoute])

  // Bring the booking form into view whenever a new price is shown.
  useEffect(() => {
    if (quotedRoute) {
      document.getElementById('custom-route-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [quotedRoute])

  return (
    <main className="book-page">
      <header className="book-header">
        <h1>Book Online</h1>
        <p>Get an instant price for any route in Costa Rica, or choose one of our fixed-price transfers.</p>
      </header>

      {reservation ? (
        <div id="booking-form">
          <TilopayCheckout
            reservation={reservation}
            sdkSession={sdkSession}
            tokenLoading={tokenState.loading}
            tokenError={tokenState.error}
            fetchSdkToken={fetchSdkToken}
          />
        </div>
      ) : (
        <>
          {/* One booking mode at a time keeps the page short: no scrolling past
              the whole package list to reach the custom route form. */}
          <div className="book-mode-tabs" role="tablist" aria-label="How do you want to book?" data-cy="book-mode-tabs">
            {BOOKING_MODES.map((mode) => (
              <button
                key={mode.key}
                type="button"
                role="tab"
                id={`book-mode-tab-${mode.key}`}
                aria-selected={bookingMode === mode.key}
                aria-controls={`book-mode-panel-${mode.key}`}
                className={bookingMode === mode.key ? 'book-mode-tab book-mode-tab-active' : 'book-mode-tab'}
                onClick={() => setBookingMode(mode.key)}
                data-cy={`book-mode-tab-${mode.key}`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {bookingMode === 'custom' ? (
            <div role="tabpanel" id="book-mode-panel-custom" aria-labelledby="book-mode-tab-custom">
              <section className="route-search-section" aria-label="Instant route price" data-cy="book-custom-route">
                <RouteSearchCard
                  initialSearch={quotedRoute?.search ?? initialRouteSearch}
                  submitLabel="See my price"
                  busy={quoteState.loading}
                  onSubmit={quoteCustomRoute}
                />
                {quoteState.error ? (
                  <p className="error-text route-search-error" data-cy="book-custom-route-error">
                    {quoteState.error}
                  </p>
                ) : null}
              </section>

              {quotedRoute ? (
                <div id="custom-route-booking">
                  <CustomRouteBookingForm
                    search={quotedRoute.search}
                    quote={quotedRoute.quote}
                    submitting={customReservationState.loading}
                    error={customReservationState.error}
                    onSubmit={async (request) => {
                      const created = await createCustomRouteReservation(request)
                      if (created) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div role="tabpanel" id="book-mode-panel-packages" aria-labelledby="book-mode-tab-packages">
              <section className="book-options" aria-label="Fixed-price routes" data-cy="book-options">
                {loadingPackages ? <p>Loading packages...</p> : null}
                {packagesError ? <p className="error-text">{packagesError}</p> : null}

                <div className="book-option-grid">
                  {packages.map((item: TravelPackage) => (
                    <article
                      key={item.id}
                      className={
                        item.id === selectedPackageId ? 'book-option-card book-option-card-active' : 'book-option-card'
                      }
                      data-cy="book-option"
                    >
                      <div className="book-option-info">
                        <h3>{item.title}</h3>
                        <p className="book-option-description">{item.description}</p>
                      </div>

                      <div className="book-option-card-footer">
                        <strong>
                          {item.currency} {item.price.toFixed(2)}
                        </strong>
                        <a
                          href="#booking-form"
                          className="book-now-link"
                          onClick={() => {
                            setSelectedPackageId(item.id)
                          }}
                          data-cy="book-option-link"
                        >
                          Book now
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div id="booking-form">
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
                    const created = await createReservation(request)
                    if (created) {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
