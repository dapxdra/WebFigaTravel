import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { useI18n } from '../i18n/useI18n'

export function NotFoundPage() {
  const { m } = useI18n()
  const t = m.notFound

  usePageMeta(
    'Page Not Found',
    'The page you are looking for does not exist or has been moved.',
    { noindex: true },
  )

  return (
    <main className="info-page not-found-page" data-cy="not-found-page">
      <section className="section page-hero">
        <p className="eyebrow">404</p>
        <h1>{t.title}</h1>
        <p className="hero-copy">{t.text}</p>
        <Link className="hero-cta" to="/" data-cy="not-found-home-link">
          {t.backHome}
        </Link>
      </section>
    </main>
  )
}
