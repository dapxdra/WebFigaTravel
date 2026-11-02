import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type {
  CustomRouteQuote,
  CustomRouteReservationRequest,
  CustomRouteSearch,
} from '../../../domain/entities/CustomRoute'
import { PickupTimePicker } from './PickupTimePicker'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Same anti-bot threshold as the package reservation form.
const MIN_FILL_TIME_MS = 2000

function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours === 0) return `${minutes} min`
  return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`
}

interface CustomRouteBookingFormProps {
  search: CustomRouteSearch
  quote: CustomRouteQuote
  submitting: boolean
  error: string | null
  onSubmit: (request: CustomRouteReservationRequest) => void | Promise<void>
}

export function CustomRouteBookingForm({ search, quote, submitting, error, onSubmit }: CustomRouteBookingFormProps) {
  const todayIso = new Date().toISOString().slice(0, 10)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [phone, setPhone] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [message, setMessage] = useState('')
  // Honeypot: real users never see or fill this field, so any value means a bot.
  const [company, setCompany] = useState('')
  const mountedAtRef = useRef(0)

  useEffect(() => {
    mountedAtRef.current = Date.now()
  }, [])

  const emailIsInvalid = email.trim() !== '' && !EMAIL_PATTERN.test(email.trim())
  const hasFutureDate = travelDate !== '' && travelDate > todayIso
  const { adults, children } = search.passengers

  const canSubmit =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    !emailIsInvalid &&
    hasFutureDate &&
    pickupTime !== '' &&
    !submitting

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    // Silently drop obvious bot submissions.
    if (company !== '' || Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS) {
      return
    }

    await onSubmit({
      search,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      travelDate,
      pickupTime,
      message: message.trim() || undefined,
    })
  }

  return (
    <section className="section payment-form" aria-labelledby="custom-route-form-title" data-cy="custom-route-booking">
      <div className="section-head">
        <h2 id="custom-route-form-title">Your private transfer</h2>
        <p>Review your price and add your trip details to continue to secure payment.</p>
      </div>

      <dl className="route-quote-summary" data-cy="custom-route-quote">
        <div className="route-quote-row route-quote-row-wide">
          <dt>Pickup</dt>
          <dd data-cy="custom-route-quote-origin">{search.origin.label}</dd>
        </div>
        <div className="route-quote-row route-quote-row-wide">
          <dt>Drop-off</dt>
          <dd data-cy="custom-route-quote-destination">{search.destination.label}</dd>
        </div>
        <div className="route-quote-row">
          <dt>Distance</dt>
          <dd data-cy="custom-route-quote-distance">{quote.distanceKm.toFixed(1)} km</dd>
        </div>
        {quote.durationMinutes > 0 ? (
          <div className="route-quote-row">
            <dt>Approx. drive</dt>
            <dd data-cy="custom-route-quote-duration">{formatDuration(quote.durationMinutes)}</dd>
          </div>
        ) : null}
        <div className="route-quote-row">
          <dt>Passengers</dt>
          <dd data-cy="custom-route-quote-passengers">
            {adults} {adults === 1 ? 'adult' : 'adults'}
            {children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}
          </dd>
        </div>
        <div className="route-quote-row">
          <dt>Average rate</dt>
          <dd data-cy="custom-route-quote-rate">
            {quote.currency} {quote.ratePerKm.toFixed(2)} / km
          </dd>
        </div>
        <div className="route-quote-total">
          <dt>Total price</dt>
          <dd data-cy="custom-route-quote-total">
            {quote.currency} {quote.amount.toFixed(2)}
          </dd>
        </div>
      </dl>

      {error ? (
        <p className="error-text" data-cy="custom-route-error">
          {error}
        </p>
      ) : null}

      <form className="lead-form" onSubmit={handleSubmit} data-cy="custom-route-form">
        <label>
          Full name
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            maxLength={120}
            autoComplete="name"
            required
            data-cy="custom-route-name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmailTouched(true)
              setEmail(event.target.value)
            }}
            maxLength={254}
            autoComplete="email"
            required
            aria-invalid={emailTouched && emailIsInvalid}
            data-cy="custom-route-email"
          />
          {emailTouched && emailIsInvalid ? (
            <small className="error-text" data-cy="custom-route-email-error">
              Enter a valid email address.
            </small>
          ) : null}
        </label>

        <label>
          Phone / WhatsApp
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            maxLength={40}
            autoComplete="tel"
            data-cy="custom-route-phone"
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={travelDate}
            min={todayIso}
            onChange={(event) => {
              setTravelDate(event.target.value)
              setPickupTime('')
            }}
            required
            data-cy="custom-route-date"
          />
        </label>

        <label className="full-width">
          Notes (optional)
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={1000}
            placeholder="Flight number, luggage, child seats, stops..."
            data-cy="custom-route-notes"
          />
        </label>

        {/* Honeypot field: hidden from real visitors. */}
        <label className="sr-only" aria-hidden="true">
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>

        <div className="time-grid-wrap full-width">
          <p className="time-grid-label">
            Pickup time
            {pickupTime ? <span className="time-grid-selected-badge">{pickupTime}</span> : null}
          </p>
          {!travelDate ? (
            <p className="time-grid-hint">Select a date first</p>
          ) : !hasFutureDate ? (
            <p className="time-grid-hint">Online booking starts tomorrow. Select a future date.</p>
          ) : (
            <PickupTimePicker value={pickupTime} onChange={setPickupTime} dataCy="custom-route-time-picker" />
          )}
        </div>

        <p className="payment-amount">
          Amount to pay:{' '}
          <strong>
            {quote.currency} {quote.amount.toFixed(2)}
          </strong>
        </p>

        <button type="submit" disabled={!canSubmit} data-cy="custom-route-submit">
          {submitting ? 'Creating reservation...' : 'Continue to payment'}
        </button>
      </form>
    </section>
  )
}
