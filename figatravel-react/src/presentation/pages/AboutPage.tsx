import { priorities } from '../data/siteContent'
import { usePageMeta } from '../hooks/usePageMeta'

export function AboutPage() {
  usePageMeta(
    'About Us',
    'Learn about Figa Travel, our mission, and our commitment to safe and memorable transportation across Costa Rica.',
  )

  return (
    <main className="info-page about-page">
      <header className="section page-hero about-hero">
        <img
          src="/assets/home/hero-header.png"
          alt="Costa Rica volcano landscape"
          className="page-hero-image"
          loading="lazy"
        />

        <div className="page-hero-copy">
          <p className="eyebrow">ABOUT US</p>
          <h1>Your Journey, Our Passion!</h1>
          <p className="hero-copy">
            Our mission is simple: to enhance your travel experience in Costa Rica.
            We are here to enrich your journey with comfort, safety, and memorable service.
          </p>
          <p className="hero-copy">
            We are more than a transportation company. We are your travel partner for
            adventure, nature, culture, and relaxation across the country.
          </p>
        </div>
      </header>

      <section className="section about-story" aria-labelledby="about-story-title">
        <div className="section-head">
          <h2 id="about-story-title">Our Commitment to Excellence</h2>
          <p>
            From the moment you book with us until we drop you off at your destination,
            our team is dedicated to comfort, safety, and satisfaction.
          </p>
        </div>

        <div className="priority-grid">
          {priorities.map((priority) => (
            <article key={priority.title} className="priority-card">
              <h3>{priority.title}</h3>
              <p>{priority.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-closing" aria-labelledby="about-closing-title">
        <div className="section-head">
          <h2 id="about-closing-title">Thank you for considering Figa Travel Costa Rica</h2>
          <p>
            We look forward to being part of your adventure and helping you discover the beauty of Costa Rica.
          </p>
        </div>
      </section>
    </main>
  )
}
