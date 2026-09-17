import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta(
    'Page Not Found',
    'The page you are looking for does not exist or has been moved.',
    { noindex: true },
  )

  return (
    <main className="info-page not-found-page" data-cy="not-found-page">
      <section className="section page-hero">
        <p className="eyebrow">404</p>
        <h1>We couldn't find that page</h1>
        <p className="hero-copy">
          The page you are looking for does not exist or may have been moved. Let's get you back
          on track.
        </p>
        <Link className="hero-cta" to="/" data-cy="not-found-home-link">
          Back to home
        </Link>
      </section>
    </main>
  )
}
