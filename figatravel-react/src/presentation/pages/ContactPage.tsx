import { LeadForm } from '../components/LeadForm'

export function ContactPage() {
  return (
    <main>
      <header className="section page-hero">
        <p className="eyebrow">CONTACT</p>
        <h1>Estamos listos para ayudarte</h1>
        <p className="hero-copy">
          Comparte tu idea de viaje y te respondemos con tiempos, ruta y propuesta.
        </p>
      </header>

      <section className="section" aria-labelledby="contact-channels-title">
        <div className="section-head">
          <h2 id="contact-channels-title">Canales directos</h2>
          <p>Atencion rapida por telefono, correo y WhatsApp.</p>
        </div>

        <div className="priority-grid">
          <article className="priority-card">
            <h3>Telefono</h3>
            <p>+506 7139 2747</p>
          </article>
          <article className="priority-card">
            <h3>Email</h3>
            <p>infofigatravel@gmail.com</p>
          </article>
          <article className="priority-card">
            <h3>WhatsApp</h3>
            <p>+506 7227 1058</p>
          </article>
        </div>
      </section>

      <LeadForm
        title="Formulario de contacto"
        subtitle="Te ayudamos a planificar tu traslado o itinerario completo."
      />
    </main>
  )
}
