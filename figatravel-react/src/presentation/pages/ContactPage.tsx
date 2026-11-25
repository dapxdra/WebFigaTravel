import { ContactForm } from '../components/ContactForm'
import { usePageMeta } from '../hooks/usePageMeta'
import { useI18n } from '../i18n/useI18n'

export function ContactPage() {
  const { m } = useI18n()
  const t = m.contact

  usePageMeta(
    'Contact',
    'Contact Figa Travel for private transportation in Costa Rica. Reach us by phone, email, WhatsApp, or contact form.',
    { keywords: 'contact Costa Rica transfer company, Costa Rica transportation quote' },
  )

  return (
    <main className="info-page contact-page" data-cy="contact-page">
      <header className="section page-hero contact-hero">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="hero-copy">{t.intro}</p>
      </header>

      <section className="section contact-details" aria-labelledby="contact-channels-title">
        <div className="section-head">
          <h2 id="contact-channels-title">{t.channelsTitle}</h2>
          <p>{t.channelsIntro}</p>
        </div>

        <div className="priority-grid contact-grid">
          <article className="priority-card" data-cy="contact-address">
            <h3>{t.address}</h3>
            <p>Los Angeles, La Fortuna, San Carlos, Alajuela, Costa Rica</p>
          </article>
          <article className="priority-card" data-cy="contact-phone-card">
            <h3>{m.common.phone}</h3>
            <p>+506 7139 2747</p>
          </article>
          <article className="priority-card" data-cy="contact-email-card">
            <h3>{m.common.email}</h3>
            <p>infofigatravel@gmail.com</p>
          </article>
        </div>
      </section>

      <ContactForm title={t.formTitle} subtitle={t.formSubtitle} />
    </main>
  )
}
