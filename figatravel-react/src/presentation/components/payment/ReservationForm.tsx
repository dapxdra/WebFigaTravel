import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../auth/useAuth'
import type { AvailabilitySlot } from '../../../domain/entities/AvailabilitySlot'
import type { TravelPackage } from '../../../domain/entities/TravelPackage'
import type { ReservationRequest } from '../../../domain/entities/Reservation'
import { PickupTimePicker } from './PickupTimePicker'

// Basic RFC-5322-ish check, mirrored from the contact form and the
// CreatePendingReservation use-case so the UI can show an inline error
// before the request round-trips to Supabase.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Bots that script-fill and submit forms typically do so in well under a
// second; real visitors need at least a couple of seconds to fill this out.
const MIN_FILL_TIME_MS = 2000

interface ReservationFormProps {
  packages: TravelPackage[]
  loadingPackages: boolean
  packagesError: string | null
  availability: AvailabilitySlot[]
  loadingAvailability: boolean
  availabilityError: string | null
  loadAvailability: (packageId: string) => void | Promise<void>
  submitting: boolean
  error: string | null
  initialPackageId?: string
  onSubmit: (request: ReservationRequest) => void | Promise<void>
}

export function ReservationForm({
  packages,
  loadingPackages,
  packagesError,
  availability,
  loadingAvailability,
  availabilityError,
  loadAvailability,
  submitting,
  error,
  initialPackageId,
  onSubmit,
}: ReservationFormProps) {
  const todayIso = new Date().toISOString().slice(0, 10)
  const { isAuthenticated, session } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  const [pickupLocation, setPickupLocation] = useState('')
  const [message, setMessage] = useState('')
  const [packageId, setPackageId] = useState(initialPackageId ?? '')
  const [availabilitySlotId, setAvailabilitySlotId] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  // Honeypot: real users never see or fill this field, so any value means a bot.
  const [company, setCompany] = useState('')
  const mountedAtRef = useRef(0)

  useEffect(() => {
    mountedAtRef.current = Date.now()
  }, [])

  const emailIsInvalid = email.trim() !== '' && !EMAIL_PATTERN.test(email.trim())

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === packageId) ?? null,
    [packages, packageId],
  )

  const availableDateList = useMemo(
    () =>
      Array.from(
        new Set(availability.filter((slot) => slot.seatsAvailable > 0).map((slot) => slot.date)),
      ).sort((a, b) => a.localeCompare(b)),
    [availability],
  )

  const authName = useMemo(() => {
    const metadata = session?.user.user_metadata as
      | { full_name?: string; name?: string }
      | undefined
    return metadata?.full_name ?? metadata?.name ?? ''
  }, [session])

  const authEmail = useMemo(() => session?.user.email ?? '', [session])

  const authPhone = useMemo(() => {
    const metadata = session?.user.user_metadata as
      | { phone?: string; phone_number?: string }
      | undefined
    return session?.user.phone ?? metadata?.phone ?? metadata?.phone_number ?? ''
  }, [session])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    // Prefilling from the async auth session (an external system) genuinely
    // needs an effect; each branch is already guarded so it only fires once.
    if (!nameTouched && fullName.trim() === '' && authName !== '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFullName(authName)
    }

    if (!emailTouched && email.trim() === '' && authEmail !== '') {
      setEmail(authEmail)
    }

    if (!phoneTouched && phone.trim() === '' && authPhone !== '') {
      setPhone(authPhone)
    }
  }, [
    authEmail,
    authName,
    authPhone,
    email,
    emailTouched,
    fullName,
    isAuthenticated,
    nameTouched,
    phone,
    phoneTouched,
  ])

  // Load availability whenever a package is preselected or changed.
  useEffect(() => {
    if (packageId) {
      void loadAvailability(packageId)
    }
  }, [loadAvailability, packageId])

  // Auto-select first available date once availability loads.
  useEffect(() => {
    if (packageId === '' || availableDateList.length === 0) {
      return
    }
    if (travelDate === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTravelDate(availableDateList[0])
      setSelectedTime('')
    }
  }, [availableDateList, packageId, travelDate])

  // Auto-set the availability slot id when the date changes.
  useEffect(() => {
    if (travelDate === '') {
      return
    }
    const dateSlot = availability.find(
      (slot) => slot.date === travelDate && slot.seatsAvailable > 0,
    )
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvailabilitySlotId(dateSlot?.id ?? '')
    setSelectedTime('')
  }, [travelDate, availability])

  const hasTimesForSelectedDate = useMemo(
    () => packageId !== '' && travelDate !== '' && travelDate > todayIso,
    [packageId, travelDate, todayIso],
  )

  const canSubmit =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    !emailIsInvalid &&
    packageId !== '' &&
    travelDate.trim() !== '' &&
    travelDate > todayIso &&
    hasTimesForSelectedDate &&
    selectedTime !== '' &&
    pickupLocation.trim() !== '' &&
    !submitting

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit || !selectedPackage) {
      return
    }

    // Silently drop obvious bot submissions: honeypot filled, or submitted
    // faster than a human could plausibly complete the form.
    if (company !== '' || Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS) {
      return
    }

    await onSubmit({
      fullName,
      email,
      phone: phone || undefined,
      travelDate: travelDate || undefined,
      pickupTime: selectedTime,
      pickupLocation,
      dropoffLocation: selectedPackage.destination,
      travelers,
      message: message || undefined,
      packageId: selectedPackage.id,
      availabilitySlotId: availabilitySlotId || undefined,
      amount: selectedPackage.price,
      currency: selectedPackage.currency,
    })
  }

  return (
    <section className="section payment-form" aria-labelledby="payment-form-title">
      <div className="section-head">
        <h2 id="payment-form-title">Reservation details</h2>
        <p>Fill in your details to continue to secure payment.</p>
      </div>

      {loadingPackages ? <p>Loading services...</p> : null}
      {packagesError ? <p className="error-text">{packagesError}</p> : null}
      {availabilityError ? <p className="error-text">{availabilityError}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <form className="lead-form" onSubmit={handleSubmit} data-cy="reservation-form">
        <label>
          Full name
          <input
            type="text"
            value={fullName}
            onChange={(event) => {
              setNameTouched(true)
              setFullName(event.target.value)
            }}
            required
            data-cy="reservation-name"
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
            required
            aria-invalid={emailTouched && emailIsInvalid}
            data-cy="reservation-email"
          />
          {emailTouched && emailIsInvalid ? (
            <small className="error-text" data-cy="reservation-email-error">
              Enter a valid email address.
            </small>
          ) : null}
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(event) => {
              setPhoneTouched(true)
              setPhone(event.target.value)
            }}
            data-cy="reservation-phone"
          />
        </label>

        <label>
          Service
          <select
            value={packageId}
            onChange={(event) => {
              const nextPackageId = event.target.value
              setPackageId(nextPackageId)
              setTravelDate('')
              setAvailabilitySlotId('')
              setSelectedTime('')
            }}
            required
            data-cy="reservation-package"
          >
            <option value="">Select a service</option>
            {packages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} - {item.currency} {item.price.toFixed(2)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            value={travelDate}
            min={todayIso}
            onChange={(event) => {
              setTravelDate(event.target.value)
              setSelectedTime('')
              setAvailabilitySlotId('')
            }}
            data-cy="reservation-date"
          />
          {packageId !== '' && availableDateList.length > 0 ? (
            <small className="availability-hint">
              Dates with availability: {availableDateList.join(', ')}
            </small>
          ) : null}
        </label>

        <label>
          Travelers
          <input
            type="number"
            value={travelers}
            min={1}
            max={25}
            onChange={(event) => setTravelers(Number(event.target.value))}
            data-cy="reservation-travelers"
          />
        </label>

        <label>
          Pickup location
          <input
            type="text"
            value={pickupLocation}
            onChange={(event) => setPickupLocation(event.target.value)}
            placeholder="Hotel name or address in La Fortuna"
            required
            data-cy="reservation-pickup-location"
          />
        </label>

        <label>
          Notes (optional)
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            data-cy="reservation-notes"
          />
        </label>

        {/* Honeypot field: hidden from real visitors, ignored by the backend if filled. */}
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
            Available time
            {selectedTime ? <span className="time-grid-selected-badge">{selectedTime}</span> : null}
          </p>
          {!packageId ? (
            <p className="time-grid-hint">Select a service first</p>
          ) : loadingAvailability ? (
            <p className="time-grid-hint">Loading availability...</p>
          ) : !travelDate ? (
            <p className="time-grid-hint">Select a date first</p>
          ) : !hasTimesForSelectedDate ? (
            <p className="time-grid-hint">No availability for today or past dates. Select a future date.</p>
          ) : (
            <PickupTimePicker
              value={selectedTime}
              onChange={setSelectedTime}
              dataCy="reservation-time-picker"
            />
          )}
        </div>

        {selectedPackage ? (
          <p className="payment-amount">
            Amount to pay: <strong>{selectedPackage.currency} {selectedPackage.price.toFixed(2)}</strong>
          </p>
        ) : null}

        <button type="submit" disabled={!canSubmit} data-cy="reservation-submit">
          {submitting ? 'Creating reservation...' : 'Continue to payment'}
        </button>
      </form>
    </section>
  )
}
