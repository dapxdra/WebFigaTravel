import { usePageMeta } from '../hooks/usePageMeta'
import { formatIsoDate } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'

const LAST_UPDATED = '2026-09-17'

export function PrivacyPolicyPage() {
  const { m, locale } = useI18n()
  const t = m.privacy

  usePageMeta(
    'Privacy Policy',
    'How Figa Travel Costa Rica collects, uses, and protects your personal data when you book a transfer or contact us.',
  )

  return (
    <main className="info-page legal-page" data-cy="privacy-policy-page">
      <header className="section page-hero">
        <p className="eyebrow">{m.legal.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="hero-copy">
          {m.common.lastUpdated} <time dateTime={LAST_UPDATED}>{formatIsoDate(LAST_UPDATED, locale)}</time>
        </p>
        {m.legal.translationNotice ? (
          <p className="hero-copy" data-cy="privacy-translation-notice">
            {m.legal.translationNotice}
          </p>
        ) : null}
      </header>

      <section className="section legal-content" aria-labelledby="privacy-intro-title">
        <h2 id="privacy-intro-title">{t.introTitle}</h2>
        <p>{t.introText}</p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-data-title">
        <h2 id="privacy-data-title">{t.dataTitle}</h2>
        <ul>
          {t.dataItems.map((item) => (
            <li key={item.strong}>
              <strong>{item.strong}</strong>
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-use-title">
        <h2 id="privacy-use-title">{t.useTitle}</h2>
        <ul>
          {t.useItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-sharing-title">
        <h2 id="privacy-sharing-title">{t.sharingTitle}</h2>
        <p>{t.sharingIntro}</p>
        <ul>
          {t.sharingItems.map((item) => (
            <li key={item.text}>
              {item.strong ? <strong>{item.strong}</strong> : null}
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-cookies-title">
        <h2 id="privacy-cookies-title">{t.cookiesTitle}</h2>
        <p>{t.cookiesText}</p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-retention-title">
        <h2 id="privacy-retention-title">{t.retentionTitle}</h2>
        <p>{t.retentionText}</p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-rights-title">
        <h2 id="privacy-rights-title">{t.rightsTitle}</h2>
        <p>
          {t.rightsBefore}{' '}
          <a href="mailto:infofigatravel@gmail.com" data-cy="privacy-rights-email">infofigatravel@gmail.com</a>
          {t.rightsAfter}
        </p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-children-title">
        <h2 id="privacy-children-title">{t.childrenTitle}</h2>
        <p>{t.childrenText}</p>
      </section>

      <section className="section legal-content" aria-labelledby="privacy-contact-title">
        <h2 id="privacy-contact-title">{t.contactTitle}</h2>
        <p>
          {t.contactBefore}{' '}
          <a href="mailto:infofigatravel@gmail.com" data-cy="privacy-contact-email">infofigatravel@gmail.com</a>{' '}
          {m.legal.or} <a href="tel:+50671392747" data-cy="privacy-contact-phone">+506 7139 2747</a>.
        </p>
      </section>
    </main>
  )
}
