import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useBookingFormViewModel } from '../hooks/useBookingFormViewModel'

interface LeadFormProps {
  title: string
  subtitle: string
  showAvailability?: boolean
}

export function LeadForm({
  title,
  subtitle,
  showAvailability = false,
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
  const [message, setMessage] = useState('')
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

    await submitLead({
      name,
      email,
      phone: phone || undefined,
      travelDate: travelDate || undefined,
      travelers,
      message: message || undefined,
      packageId,
      availabilitySlotId: availabilitySlotId || undefined,
    })

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

      {loadingPackages ? <p>Cargando paquetes...</p> : null}
      {packagesError ? <p className="error-text">{packagesError}</p> : null}

      <form className="lead-form" onSubmit={onSubmit}>
        <label>
          Nombre completo
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          Correo
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Telefono
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>

        <label>
          Fecha estimada
          <input
            type="date"
            value={travelDate}
            onChange={(event) => setTravelDate(event.target.value)}
          />
        </label>

        <label>
          Viajeros
          <input
            type="number"
            value={travelers}
            min={1}
            max={25}
            onChange={(event) => setTravelers(Number(event.target.value))}
          />
        </label>

        <label>
          Paquete de interes
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
            <option value="">Selecciona una opcion</option>
            {packages.map((travelPackage) => (
              <option key={travelPackage.id} value={travelPackage.id}>
                {travelPackage.title}
              </option>
            ))}
          </select>
        </label>

        {showAvailability ? (
          <label>
            Fecha disponible
            <select
              value={availabilitySlotId}
              onChange={(event) => setAvailabilitySlotId(event.target.value)}
              required
              disabled={!packageId || loadingAvailability}
            >
              <option value="">
                {!packageId
                  ? 'Selecciona paquete primero'
                  : loadingAvailability
                    ? 'Cargando disponibilidad...'
                    : 'Selecciona una fecha'}
              </option>
              {availability.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.date} - {slot.seatsAvailable} asientos
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showAvailability && availabilityError ? (
          <p className="error-text full-width">{availabilityError}</p>
        ) : null}

        <label className="full-width">
          Mensaje
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            placeholder="Cuantos dias deseas viajar y desde que ciudad sales"
          />
        </label>

        <button disabled={!canSubmit || submitState.loading} type="submit">
          {submitState.loading ? 'Enviando...' : 'Enviar solicitud'}
        </button>

        {submitState.error ? <p className="error-text">{submitState.error}</p> : null}
        {submitState.success ? (
          <p className="success-text">Solicitud enviada correctamente.</p>
        ) : null}
      </form>
    </section>
  )
}
