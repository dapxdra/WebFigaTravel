import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useBookingFormViewModel } from '../hooks/useBookingFormViewModel'

interface LeadFormProps {
  title: string
  subtitle: string
  showAvailability?: boolean
  defaultMessage?: string
}

export function LeadForm({
  title,
  subtitle,
  showAvailability = false,
  defaultMessage,
}: LeadFormProps) {
  const {
    packages,
    loadingPackages,
    packagesError,
    availability,
    loadingAvailability,
    availabilityError,
    loadAvailability,
    submitLead,
    submitState,
  } = useBookingFormViewModel()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  const [message, setMessage] = useState(defaultMessage ?? '')
  const [packageId, setPackageId] = useState('')
  const [availabilitySlotId, setAvailabilitySlotId] = useState('')

  const canSubmit = useMemo(() => {
    const base = name.trim() !== '' && email.trim() !== '' && packageId !== ''

    if (!showAvailability) {
      return base
    }

    return base && availabilitySlotId !== ''
  }, [name, email, packageId, availabilitySlotId, showAvailability])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    const submitted = await submitLead({
      name,
      email,
      phone: phone || undefined,
      travelDate: travelDate || undefined,
      travelers,
      message: message || undefined,
      packageId,
      availabilitySlotId: availabilitySlotId || undefined,
    })

    if (!submitted) {
      return
    }

    setName('')
    setEmail('')
    setPhone('')
    setTravelDate('')
    setTravelers(2)
    setMessage('')
    setPackageId('')
    setAvailabilitySlotId('')
  }

  return (
    <section className="section contact" aria-labelledby="contact-title">
      <div className="section-head">
        <h2 id="contact-title">{title}</h2>
        <p>{subtitle}</p>
      </div>

      {loadingPackages ? <p>Loading packages...</p> : null}
      {packagesError ? <p className="error-text">{packagesError}</p> : null}

      <form className="lead-form" onSubmit={onSubmit}>
        <label>
          Full name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>

        <label>
          Estimated date
          <input
            type="date"
            value={travelDate}
            onChange={(event) => setTravelDate(event.target.value)}
          />
        </label>

        <label>
          Travelers
          <input
            type="number"
            value={travelers}
            min={1}
            max={25}
            onChange={(event) => setTravelers(Number(event.target.value))}
          />
        </label>

        <label>
          Package of interest
          <select
            value={packageId}
            onChange={(event) => {
              const nextPackageId = event.target.value
              setPackageId(nextPackageId)
              setAvailabilitySlotId('')
              void loadAvailability(nextPackageId)
            }}
            required
          >
            <option value="">Select an option</option>
            {packages.map((travelPackage) => (
              <option key={travelPackage.id} value={travelPackage.id}>
                {travelPackage.title}
              </option>
            ))}
          </select>
        </label>

        {showAvailability ? (
          <label>
            Available date
            <select
              value={availabilitySlotId}
              onChange={(event) => setAvailabilitySlotId(event.target.value)}
              required
              disabled={!packageId || loadingAvailability}
            >
              <option value="">
                {!packageId
                  ? 'Select a package first'
                  : loadingAvailability
                    ? 'Loading availability...'
                    : 'Select a date'}
              </option>
              {availability.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.date} - {slot.seatsAvailable} seats
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showAvailability && availabilityError ? (
          <p className="error-text full-width">{availabilityError}</p>
        ) : null}

        <label className="full-width">
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            placeholder="How many days do you want to travel and which city are you departing from?"
          />
        </label>

        <button disabled={!canSubmit || submitState.loading} type="submit">
          {submitState.loading ? 'Sending...' : 'Submit request'}
        </button>

        {submitState.error ? <p className="error-text">{submitState.error}</p> : null}
        {submitState.success ? (
          <p className="success-text">Request submitted successfully.</p>
        ) : null}
      </form>
    </section>
  )
}
