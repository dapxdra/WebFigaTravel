import type { SyntheticEvent } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { faqItems, priorities, testimonials } from "../data/siteContent";
import { usePageMeta } from "../hooks/usePageMeta";

const featuredDestinations = [
  {
    title: "La Fortuna",
    image: "/assets/home/dest-la-fortuna.png",
    to: "/destinations/la-fortuna",
  },
  {
    title: "Manuel Antonio",
    image: "/assets/home/dest-manuel-antonio.png",
    to: "/destinations/manuel-antonio",
  },
  {
    title: "Papagayo",
    image: "/assets/home/dest-papagayo.jpg",
    to: "/destinations/papagayo",
  },
  {
    title: "Tamarindo",
    image: "/assets/home/dest-tamarindo.jpg",
    to: "/destinations/tamarindo",
  },
  {
    title: "Puerto Viejo",
    image: "/assets/home/dest-puerto-viejo.jpg",
    to: "/destinations/puerto-viejo",
  },
  {
    title: "San Jose City",
    image: "/assets/home/dest-san-jose-city.jpg",
    to: "/destinations/san-jose-city",
  },
];

const serviceStrip = [
  {
    icon: "/assets/home/icon-wifi.png",
    label: "WI-FI",
  },
  {
    icon: "/assets/home/icon-customer-service.png",
    label: "Customer Service",
  },
  {
    icon: "/assets/home/icon-eco.png",
    label: "Eco-conscious",
  },
  {
    icon: "/assets/home/icon-vehicle.png",
    label: "Well-maintained vehicles",
  },
];

export function HomePage() {
  const handleAccordionToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    const currentItem = event.currentTarget;

    if (!currentItem.open) {
      return;
    }

    const listContainer = currentItem.parentElement;

    if (!listContainer) {
      return;
    }

    listContainer.querySelectorAll("details[open]").forEach((item) => {
      if (item !== currentItem) {
        (item as HTMLDetailsElement).open = false;
      }
    });

    if (window.innerWidth <= 840) {
      const { top, bottom } = currentItem.getBoundingClientRect();
      const isOutsideViewport = top < 96 || bottom > window.innerHeight;

      if (isOutsideViewport) {
        window.requestAnimationFrame(() => {
          currentItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      }
    }
  };

  usePageMeta(
    "Private Transfers in Costa Rica",
    "Discover Costa Rica with premium private transportation, top destinations, and flexible booking with Figa Travel.",
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (window.innerWidth > 840) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const clickedOnAccordion = target.closest(
        ".home-faq-preview .faq-accordion-item",
      );

      if (clickedOnAccordion) {
        return;
      }

      const homeFaqPreview = document.querySelector(".home-faq-preview");

      if (!homeFaqPreview) {
        return;
      }

      homeFaqPreview.querySelectorAll("details[open]").forEach((item) => {
        (item as HTMLDetailsElement).open = false;
      });
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <main className="home-page">
      <section
        className="home-hero"
        aria-label="Discover the Beauty of Costa Rica"
      >
        <img
          src="/assets/home/hero-header.png"
          alt="Arenal volcano"
          className="home-hero-image"
        />

        <div className="home-hero-overlay">
          <h1>Discover the Beauty of Costa Rica with FIGA TRAVEL</h1>
          <p className="home-hero-subtitle">
            Private transfers, local guidance, and curated routes from volcanoes
            to beaches.
          </p>
          <div className="home-hero-actions">
            <Link to="/book-online" className="home-book-now">
              BOOK NOW
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B50672271058&text=Hello%20Figa%20Travel%2C%20I%20want%20help%20planning%20my%20trip&type=phone_number&app_absent=0"
              className="hero-cta ghost home-hero-secondary"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      <section className="home-trust-strip" aria-label="Trust indicators">
        <article>
          <h2>500+</h2>
          <p>successful transfers every season</p>
        </article>
        <article>
          <h2>24/7</h2>
          <p>trip support by WhatsApp and email</p>
        </article>
        <article>
          <h2>4.9/5</h2>
          <p>average traveler satisfaction score</p>
        </article>
      </section>

      <section className="home-services" aria-label="Service highlights">
        {serviceStrip.map((service) => (
          <article key={service.label} className="home-service-item">
            <img src={service.icon} alt="" aria-hidden="true" loading="lazy" />
            <span>{service.label}</span>
          </article>
        ))}
      </section>

      <section
        className="home-top-destinations"
        aria-labelledby="home-destinations-title"
      >
        <h2 id="home-destinations-title">TOP DESTINATIONS IN COSTA RICA</h2>

        <div className="home-destinations-layout">
          <div className="home-map-wrap">
            <img
              src="/assets/home/mapa-costa-rica.png"
              alt="Costa Rica destinations map"
              className="home-map-image"
              loading="lazy"
            />
          </div>

          <div className="home-destination-grid">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.title}
                to={destination.to}
                className="home-destination-tile"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  loading="lazy"
                />
                <span>{destination.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="home-priority-section"
        aria-labelledby="home-priority-title"
      >
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

      <section
        className="home-testimonials-section"
        aria-labelledby="home-testimonials-title"
      >
        <div className="home-section-head">
          <p className="eyebrow">
            This is what our valued customers have shared about their
            experiences with us
          </p>
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
          <h2 id="home-faq-title">Frequently Asked Questions section</h2>
          <p>
            If you have any other questions, please contact us by WhatsApp,
            email or our contact form. Or check out our{" "}
            <Link to="/faq" className="home-inline-link">
              FAQ
            </Link>
          </p>
        </div>

        <div className="home-faq-preview">
          <div className="home-faq-preview-head">
            <h3>Top Questions</h3>
            <Link to="/faq" className="home-inline-link home-faq-preview-link">
              View all
            </Link>
          </div>

          {faqItems.slice(0, 3).map((item, index) => (
            <details
              key={item.question}
              className="faq-item faq-accordion-item"
              onToggle={handleAccordionToggle}
              open={index === 0}
            >
              <summary className="faq-question">{item.question}</summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        className="home-discount-section"
        aria-labelledby="home-discount-title"
      >
        <div>
          <p className="eyebrow">10% DISCOUNT</p>
          <h2 id="home-discount-title">Book online and use code FIGA10</h2>
          <p>
            Get 10% discount when you book online 2 or more transfers around
            Costa Rica.
          </p>
        </div>

        <Link to="/book-online" className="home-book-now home-discount-link">
          BOOK NOW
        </Link>
      </section>
    </main>
  );
}
