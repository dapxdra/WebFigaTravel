import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type {
  CustomRouteQuote,
  CustomRouteReservationRequest,
  CustomRouteSearch,
} from '../../../domain/entities/CustomRoute'
import { useI18n } from '../../i18n/useI18n'
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
  const { m } = useI18n()
  const t = m.customRouteForm
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
        <h2 id="custom-route-form-title">{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <dl className="route-quote-summary" data-cy="custom-route-quote">
        <div className="route-quote-row route-quote-row-wide">
          <dt>{t.pickup}</dt>
          <dd data-cy="custom-route-quote-origin">{search.origin.label}</dd>
        </div>
        <div className="route-quote-row route-quote-row-wide">
          <dt>{t.dropoff}</dt>
          <dd data-cy="custom-route-quote-destination">{search.destination.label}</dd>
        </div>
        {quote.durationMinutes > 0 ? (
          <div className="route-quote-row">
            <dt>{t.approxDrive}</dt>
            <dd data-cy="custom-route-quote-duration">{formatDuration(quote.durationMinutes)}</dd>
          </div>
        ) : null}
        <div className="route-quote-row">
        </div>
        <div className="route-quote-row">
          <dt>{t.passengers}</dt>
          <dd data-cy="custom-route-quote-passengers">{t.passengerSummary(adults, children)}</dd>
        </div>
        <div className="route-quote-row">
        </div>
        <div className="route-quote-total">
          <dt>{t.totalPrice}</dt>
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
          {m.common.fullName}
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
          {m.common.email}
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
              {m.common.invalidEmail}
            </small>
          ) : null}
        </label>

        <label>
          {m.common.phoneWhatsApp}
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
          {m.common.date}
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
          {m.common.notesOptional}
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={1000}
            placeholder={t.notesPlaceholder}
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
            {t.pickupTime}
            {pickupTime ? <span className="time-grid-selected-badge">{pickupTime}</span> : null}
          </p>
          {!travelDate ? (
            <p className="time-grid-hint">{m.common.selectDateFirst}</p>
          ) : !hasFutureDate ? (
            <p className="time-grid-hint">{t.futureDateHint}</p>
          ) : (
            <PickupTimePicker value={pickupTime} onChange={setPickupTime} dataCy="custom-route-time-picker" />
          )}
        </div>

        <p className="payment-amount">
          {m.common.amountToPay}{' '}
          <strong>
            {quote.currency} {quote.amount.toFixed(2)}
          </strong>
        </p>

        <button type="submit" disabled={!canSubmit} data-cy="custom-route-submit">
          {submitting ? m.common.creatingReservation : m.common.continueToPayment}
        </button>
      </form>
    </section>
  )
}
