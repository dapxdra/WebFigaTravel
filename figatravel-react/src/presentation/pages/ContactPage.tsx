import { LeadForm } from '../components/LeadForm'
import { usePageMeta } from '../hooks/usePageMeta'

export function ContactPage() {
  usePageMeta(
    'Contact',
    'Contact Figa Travel for private transportation in Costa Rica. Reach us by phone, email, WhatsApp, or contact form.',
  )

  return (
    <main className="info-page contact-page">
      <header className="section page-hero contact-hero">
        <p className="eyebrow">CONTACT</p>
        <h1>We are ready to help you</h1>
        <p className="hero-copy">
          Share your travel idea and we will reply with timing, route, and proposal details.
        </p>
      </header>

      <section className="section contact-details" aria-labelledby="contact-channels-title">
        <div className="section-head">
          <h2 id="contact-channels-title">Direct channels</h2>
          <p>Fast support by phone, email, and WhatsApp.</p>
        </div>

        <div className="priority-grid contact-grid">
          <article className="priority-card">
            <h3>Address</h3>
            <p>Los Angeles, La Fortuna, San Carlos, Alajuela, Costa Rica</p>
          </article>
          <article className="priority-card">
            <h3>Phone</h3>
            <p>+506 7139 2747</p>
          </article>
          <article className="priority-card">
            <h3>Email</h3>
            <p>infofigatravel@gmail.com</p>
          </article>
        </div>
      </section>

      <LeadForm
        title="Contact form"
        subtitle="We help you plan your transfer or complete itinerary."
      />
    </main>
  )
}
