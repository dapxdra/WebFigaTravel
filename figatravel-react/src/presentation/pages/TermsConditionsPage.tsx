import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { formatIsoDate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'

const LAST_UPDATED = '2026-09-17'

export function TermsConditionsPage() {
  const { m, locale } = useI18n()
  const t = m.terms

  usePageMeta(
    'Terms and Conditions',
    'Booking, payment, and cancellation terms for private transportation services with Figa Travel Costa Rica.',
  )

  return (
    <main className="info-page legal-page" data-cy="terms-conditions-page">
      <header className="section page-hero">
        <p className="eyebrow">{m.legal.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="hero-copy">
          {m.common.lastUpdated} <time dateTime={LAST_UPDATED}>{formatIsoDate(LAST_UPDATED, locale)}</time>
        </p>
        {m.legal.translationNotice ? (
          <p className="hero-copy" data-cy="terms-translation-notice">
            {m.legal.translationNotice}
          </p>
        ) : null}
      </header>

      {t.sections.map((section, index) => (
        <section
          key={section.title}
          className="section legal-content"
          aria-labelledby={`terms-section-${index}-title`}
          data-cy={`terms-section-${index}`}
        >
          <h2 id={`terms-section-${index}-title`}>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}

      <section className="section legal-content" aria-labelledby="terms-service-title">
        <h2 id="terms-service-title">{t.serviceTitle}</h2>
        <ul>
          {t.serviceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {t.closingSections.map((section, index) => (
        <section
          key={section.title}
          className="section legal-content"
          aria-labelledby={`terms-closing-${index}-title`}
          data-cy={`terms-closing-${index}`}
        >
          <h2 id={`terms-closing-${index}-title`}>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}

      <section className="section legal-content" aria-labelledby="terms-contact-title">
        <h2 id="terms-contact-title">{t.contactTitle}</h2>
        <p>
          {t.contactBefore}{' '}
          <a href="mailto:infofigatravel@gmail.com" data-cy="terms-contact-email">infofigatravel@gmail.com</a>{' '}
          {m.legal.or} <a href="tel:+50671392747" data-cy="terms-contact-phone">+506 7139 2747</a>
          {t.seeAlso}{' '}
          <Link to="/privacy-policy" data-cy="terms-privacy-link">{m.layout.privacyPolicy}</Link>.
        </p>
      </section>
    </main>
  )
}
