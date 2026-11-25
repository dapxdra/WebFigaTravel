import { usePageMeta } from '../hooks/usePageMeta'
import { useI18n } from '../i18n/useI18n'
import { useSiteContent } from '../i18n/useSiteContent'

export function AboutPage() {
  const { m } = useI18n()
  const t = m.about
  const { priorities } = useSiteContent()

  usePageMeta(
    'About Us',
    'Learn about Figa Travel, our mission, and our commitment to safe and memorable transportation across Costa Rica.',
    { keywords: 'licensed tourism transport Costa Rica, private transportation company Costa Rica' },
  )

  return (
    <main className="info-page about-page" data-cy="about-page">
      <header className="section page-hero about-hero">
        <img
          src="/assets/home/hero-header.png"
          alt={t.heroAlt}
          className="page-hero-image"
          loading="lazy"
        />

        <div className="page-hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="hero-copy">{t.paragraph1}</p>
          <p className="hero-copy">{t.paragraph2}</p>
        </div>
      </header>

      <section className="section about-story" aria-labelledby="about-story-title">
        <div className="section-head">
          <h2 id="about-story-title">{t.commitmentTitle}</h2>
          <p>{t.commitmentText}</p>
        </div>

        <div className="priority-grid">
          {priorities.map((priority) => (
            <article key={priority.title} className="priority-card" data-cy="about-priority-card">
              <h3>{priority.title}</h3>
              <p>{priority.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-closing" aria-labelledby="about-closing-title">
        <div className="section-head">
          <h2 id="about-closing-title">{t.closingTitle}</h2>
          <p>{t.closingText}</p>
        </div>
      </section>
    </main>
  )
}
