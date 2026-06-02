import { Link } from 'react-router-dom'
import { faqItems } from '../data/siteContent'

export function FaqPage() {
  return (
    <main className="info-page faq-page">
      <header className="section page-hero faq-hero">
        <p className="eyebrow">HAVE ANY QUESTIONS?</p>
        <h1>FAQ</h1>
        <p className="hero-copy">
          Quick answers to help you plan your trip with complete clarity.
        </p>
      </header>

      <section className="section" aria-labelledby="faq-list-title">
        <div className="section-head">
          <h2 id="faq-list-title">Frequently Asked Questions</h2>
          <p>If you need anything else, contact us via WhatsApp, email, or the contact form.</p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="faq-cta-row">
          <a
            href="https://api.whatsapp.com/send/?phone=%2B50672271058&text&type=phone_number&app_absent=0"
            className="hero-cta"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
          <Link to="/contact" className="hero-cta ghost">
            Go to contact
          </Link>
        </div>
      </section>
    </main>
  )
}
