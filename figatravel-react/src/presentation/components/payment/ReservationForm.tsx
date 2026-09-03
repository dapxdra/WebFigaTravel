import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../auth/useAuth'
import type { AvailabilitySlot } from '../../../domain/entities/AvailabilitySlot'
import type { TravelPackage } from '../../../domain/entities/TravelPackage'
import type { ReservationRequest } from '../../../domain/entities/Reservation'

// 48 half-hour slots: 00:00 to 23:30
const ALL_TIME_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})

// Groups the 48 slots into 4 tabs of 12 so the picker shows a manageable
// number of buttons at a time instead of all 48 at once.
interface TimeSegment {
  key: string
  label: string
  hourFrom: number
  hourTo: number
}

const TIME_SEGMENTS: TimeSegment[] = [
  { key: 'night', label: 'Night', hourFrom: 0, hourTo: 5 },
  { key: 'morning', label: 'Morning', hourFrom: 6, hourTo: 11 },
  { key: 'afternoon', label: 'Afternoon', hourFrom: 12, hourTo: 17 },
  { key: 'evening', label: 'Evening', hourFrom: 18, hourTo: 23 },
]

function timesInSegment(segment: TimeSegment): string[] {
  return ALL_TIME_SLOTS.filter((time) => {
    const hour = Number(time.slice(0, 2))
    return hour >= segment.hourFrom && hour <= segment.hourTo
  })
}

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
  const [activeSegment, setActiveSegment] = useState(TIME_SEGMENTS[1].key)

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

    if (!nameTouched && fullName.trim() === '' && authName !== '') {
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
    setAvailabilitySlotId(dateSlot?.id ?? '')
    setSelectedTime('')
  }, [travelDate, availability])

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

  const canSubmit =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
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

      <form className="lead-form" onSubmit={handleSubmit}>
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
          />
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
          />
        </label>

        <label>
          Notes (optional)
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
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
            <>
              <div className="time-segment-tabs" role="tablist" aria-label="Time of day">
                {TIME_SEGMENTS.map((segment) => (
                  <button
                    key={segment.key}
                    type="button"
                    role="tab"
                    aria-selected={activeSegment === segment.key}
                    className={
                      activeSegment === segment.key
                        ? 'time-segment-tab time-segment-tab-active'
                        : 'time-segment-tab'
                    }
                    onClick={() => setActiveSegment(segment.key)}
                  >
                    {segment.label}
                  </button>
                ))}
              </div>

              <div className="time-grid" role="group" aria-label="Available times">
                {timesInSegment(TIME_SEGMENTS.find((segment) => segment.key === activeSegment)!).map(
                  (time) => {
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
                              : 'time-slot time-slot-closed'
                        }
                        disabled={!available}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    )
                  },
                )}
              </div>
            </>
          )}
        </div>

        {selectedPackage ? (
          <p className="payment-amount">
            Amount to pay: <strong>{selectedPackage.currency} {selectedPackage.price.toFixed(2)}</strong>
          </p>
        ) : null}

        <button type="submit" disabled={!canSubmit}>
          {submitting ? 'Creating reservation...' : 'Continue to payment'}
        </button>
      </form>
    </section>
  )
}
