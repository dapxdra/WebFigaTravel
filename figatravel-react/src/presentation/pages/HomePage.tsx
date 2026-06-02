import { Link } from 'react-router-dom'
import { faqItems, priorities, testimonials } from '../data/siteContent'

const featuredDestinations = [
  {
    title: 'La Fortuna',
    image: '/assets/home/dest-la-fortuna.png',
    to: '/destinations/la-fortuna',
  },
  {
    title: 'Manuel Antonio',
    image: '/assets/home/dest-manuel-antonio.png',
    to: '/destinations/manuel-antonio',
  },
  {
    title: 'Papagayo',
    image: '/assets/home/dest-papagayo.jpg',
    to: '/destinations/papagayo',
  },
  {
    title: 'Tamarindo',
    image: '/assets/home/dest-tamarindo.jpg',
    to: '/destinations/tamarindo',
  },
  {
    title: 'Puerto Viejo',
    image: '/assets/home/dest-puerto-viejo.jpg',
    to: '/destinations/puerto-viejo',
  },
  {
    title: 'San Jose City',
    image: '/assets/home/dest-san-jose-city.jpg',
    to: '/destinations/san-jose-city',
  },
]

const serviceStrip = [
  {
    icon: '/assets/home/icon-wifi.png',
    label: 'WI-FI',
  },
  {
    icon: '/assets/home/icon-customer-service.png',
    label: 'Customer Service',
  },
  {
    icon: '/assets/home/icon-eco.png',
    label: 'Eco-conscious',
  },
  {
    icon: '/assets/home/icon-vehicle.png',
    label: 'Well-maintained vehicles',
  },
]

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-label="Discover the Beauty of Costa Rica">
        <img
          src="/assets/home/hero-header.png"
          alt="Arenal volcano"
          className="home-hero-image"
        />

        <div className="home-hero-overlay">
          <h1>Discover the Beauty of Costa Rica with FIGA TRAVEL</h1>
          <Link to="/book-online" className="home-book-now">
            BOOK NOW
          </Link>
        </div>
      </section>

      <section className="home-services" aria-label="Service highlights">
        {serviceStrip.map((service) => (
          <article key={service.label} className="home-service-item">
            <img src={service.icon} alt="" aria-hidden="true" />
            <span>{service.label}</span>
          </article>
        ))}
      </section>

      <section className="home-top-destinations" aria-labelledby="home-destinations-title">
        <h2 id="home-destinations-title">TOP DESTINATIONS IN COSTA RICA</h2>

        <div className="home-destinations-layout">
          <div className="home-map-wrap">
            <img
              src="/assets/home/mapa-costa-rica.png"
              alt="Costa Rica destinations map"
              className="home-map-image"
            />
          </div>

          <div className="home-destination-grid">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.title}
                to={destination.to}
                className="home-destination-tile"
              >
                <img src={destination.image} alt={destination.title} />
                <span>{destination.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-priority-section" aria-labelledby="home-priority-title">
        <div className="home-section-head">
          <p className="eyebrow">Safety is our</p>
          <h2 id="home-priority-title">TOP PRIORITY</h2>
        </div>

        <div className="priority-grid home-priority-grid">
          {priorities.map((priority) => (
            <article key={priority.title} className="priority-card">
              <h3>{priority.title}</h3>
              <p>{priority.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-testimonials-section" aria-labelledby="home-testimonials-title">
        <div className="home-section-head">
          <p className="eyebrow">This is what our valued customers have shared about their experiences with us</p>
          <h2 id="home-testimonials-title">Testimonials</h2>
        </div>

        <div className="testimonial-grid home-testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.author} className="testimonial-card">
              <h3>{testimonial.author}</h3>
              <p>{testimonial.quote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-faq-teaser" aria-labelledby="home-faq-title">
        <div className="home-faq-copy">
          <p className="eyebrow">Have any questions?</p>
          <h2 id="home-faq-title">Explore our Frequently Asked Questions section</h2>
          <p>
            If you have any other questions, please contact us by WhatsApp, email or our contact form.
          </p>
          <Link to="/faq" className="home-inline-link">
            FAQ
          </Link>
        </div>

        <div className="home-faq-preview">
          {faqItems.slice(0, 3).map((item) => (
            <article key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-discount-section" aria-labelledby="home-discount-title">
        <div>
          <p className="eyebrow">10% DISCOUNT</p>
          <h2 id="home-discount-title">Book online and use code FIGA10</h2>
          <p>
            Get 10% discount when you book online 2 or more transfers around Costa Rica.
          </p>
        </div>

        <Link to="/book-online" className="home-book-now home-discount-link">
          BOOK NOW
        </Link>
      </section>
    </main>
  )
}
