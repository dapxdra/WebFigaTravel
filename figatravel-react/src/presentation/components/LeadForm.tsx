import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useBookingFormViewModel } from '../hooks/useBookingFormViewModel'

// 48 half-hour slots: 00:00 to 23:30
const ALL_TIME_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})

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
  const todayIso = new Date().toISOString().slice(0, 10)

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
  const [selectedTime, setSelectedTime] = useState('')

  const availableDates = useMemo(
    () =>
      new Set(
        availability
          .filter((slot) => slot.seatsAvailable > 0)
          .map((slot) => slot.date),
      ),
    [availability],
  )

  const availableDateList = useMemo(
    () => Array.from(availableDates).sort((a, b) => a.localeCompare(b)),
    [availableDates],
  )

  // Auto-select first available date when package loads and no date is selected yet
  useEffect(() => {
    if (!showAvailability || packageId === '' || availableDateList.length === 0) {
      return
    }
    if (travelDate === '') {
      setTravelDate(availableDateList[0])
      setSelectedTime('')
    }
  }, [availableDateList, packageId, showAvailability, travelDate])

  // Auto-set slot ID when date changes
  useEffect(() => {
    if (!showAvailability || travelDate === '') return
    const dateSlot = availability.find(
      (slot) => slot.date === travelDate && slot.seatsAvailable > 0,
    )
    setAvailabilitySlotId(dateSlot?.id ?? '')
    setSelectedTime('')
  }, [travelDate, availability, showAvailability])

  const hasTimesForSelectedDate = useMemo(
    () => packageId !== '' && travelDate !== '' && travelDate > todayIso,
    [packageId, travelDate, todayIso],
  )

  // Future dates have all slots available; today/past dates have none.
  const timeSlotStatus = useMemo(() => {
    if (!travelDate) return {} as Record<string, boolean>
    const isFutureDate = travelDate > todayIso
    const result: Record<string, boolean> = {}
    for (const time of ALL_TIME_SLOTS) {
      result[time] = isFutureDate
    }
    return result
  }, [travelDate, todayIso])

  const canSubmit = useMemo(() => {
    const base = name.trim() !== '' && email.trim() !== '' && packageId !== ''
    const hasFutureDate = travelDate.trim() !== '' && travelDate > todayIso

    if (!showAvailability) return base && hasFutureDate
    return base && hasFutureDate && hasTimesForSelectedDate && selectedTime !== ''
  }, [
    name,
    email,
    packageId,
    selectedTime,
    hasTimesForSelectedDate,
    showAvailability,
    travelDate,
    todayIso,
  ])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    const messageWithTime =
      selectedTime !== ''
        ? `${message ? `${message}\n` : ''}Preferred time: ${selectedTime}`
        : message

    const submitted = await submitLead({
      name,
      email,
      phone: phone || undefined,
      travelDate: travelDate || undefined,
      travelers,
      message: messageWithTime || undefined,
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
    setSelectedTime('')
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
            min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
            onChange={(event) => {
              setTravelDate(event.target.value)
              setSelectedTime('')
              setAvailabilitySlotId('')
            }}
          />
          {showAvailability && packageId !== '' && availableDateList.length > 0 ? (
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
              setSelectedTime('')
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
          <div className="time-grid-wrap full-width">
            <p className="time-grid-label">
              Available time
              {selectedTime ? <span className="time-grid-selected-badge">{selectedTime}</span> : null}
            </p>
            {!packageId ? (
              <p className="time-grid-hint">Select a package first</p>
            ) : loadingAvailability ? (
              <p className="time-grid-hint">Loading availability...</p>
            ) : !travelDate ? (
              <p className="time-grid-hint">Select a date first</p>
            ) : !hasTimesForSelectedDate ? (
              <p className="time-grid-hint">No availability for today or past dates. Select a future date.</p>
            ) : (
              <div className="time-grid" role="group" aria-label="Available times">
                {ALL_TIME_SLOTS.map((time) => {
                  const available = timeSlotStatus[time] ?? false
                  const active = selectedTime === time
                  return (
                    <button
                      key={time}
                      type="button"
                      className={
                        active
                          ? 'time-slot time-slot-active'
                          : available
                            ? 'time-slot time-slot-open'
                            : 'time-slot time-slot-past'
                      }
                      disabled={!available}
                      onClick={() => {
                        setSelectedTime(time)
                      }}
                      aria-pressed={active}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
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
