import { useBookingFormViewModel } from '../hooks/useBookingFormViewModel'
import { LeadForm } from '../components/LeadForm'

export function BookOnlinePage() {
  const { packages, loadingPackages, packagesError } = useBookingFormViewModel()

  return (
    <main>
      <header className="section page-hero">
        <p className="eyebrow">BOOK ONLINE</p>
        <h1>Reserva tus traslados en minutos</h1>
        <p className="hero-copy">
          Explora paquetes destacados y envia tu solicitud para recibir confirmacion.
        </p>
      </header>

      <section className="section" aria-labelledby="book-packages-title">
        <div className="section-head">
          <h2 id="book-packages-title">Paquetes destacados</h2>
          <p>Disponibles para reservas online con atencion personalizada.</p>
        </div>

        {loadingPackages ? <p>Cargando paquetes...</p> : null}
        {packagesError ? <p className="error-text">{packagesError}</p> : null}

        <div className="package-grid">
          {packages.map((travelPackage) => (
            <article key={travelPackage.id} className="package-card">
              <img
                src={travelPackage.imageUrl}
                alt={travelPackage.title}
                className="package-image"
              />
              <div className="package-content">
                <p className="destination">{travelPackage.destination}</p>
                <h3>{travelPackage.title}</h3>
                <p>{travelPackage.description}</p>
                <div className="package-meta">
                  <span>{travelPackage.durationDays} dias</span>
                  <strong>
                    {travelPackage.currency} {travelPackage.price.toFixed(2)}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <LeadForm
        title="Solicita tu itinerario"
        subtitle="Comparte tus fechas y nosotros armamos la propuesta ideal."
        showAvailability
      />
    </main>
  )
}
