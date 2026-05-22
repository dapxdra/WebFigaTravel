import { Link } from 'react-router-dom'
import { faqItems } from '../data/siteContent'

export function FaqPage() {
  return (
    <main>
      <header className="section page-hero">
        <p className="eyebrow">HAVE ANY QUESTIONS?</p>
        <h1>FAQ</h1>
        <p className="hero-copy">
          Respuestas rapidas para que planifiques tu viaje con total claridad.
        </p>
      </header>

      <section className="section" aria-labelledby="faq-list-title">
        <div className="section-head">
          <h2 id="faq-list-title">Preguntas frecuentes</h2>
          <p>Si necesitas algo adicional, contactanos por WhatsApp o formulario.</p>
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
            Hablar por WhatsApp
          </a>
          <Link to="/contact" className="hero-cta ghost">
            Ir a contacto
          </Link>
        </div>
      </section>
    </main>
  )
}
