import type { SyntheticEvent } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faqItems,
  priorities,
  featuredReviews,
  fleet,
  topDestinations,
} from "../data/siteContent";
import { ReviewsCarousel } from "../components/ReviewsCarousel";
import { HomeHeroMedia } from "../components/HomeHeroMedia";
import { RouteSearchCard } from "../components/route-search/RouteSearchCard";
import { usePageMeta } from "../hooks/usePageMeta";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=%2B50672271058&text=Hello%20Figa%20Travel%2C%20I%20want%20to%20book%20a%20transfer&type=phone_number&app_absent=0";

const heroHighlights = [
  "Flight tracking",
  "Bilingual licensed drivers",
  "Fixed price, tolls included",
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

const bookingSteps = [
  {
    title: "Tell us your route",
    description:
      "Enter your pickup and drop-off: the airport, your hotel, or any address in Costa Rica. Your fixed price appears in seconds.",
  },
  {
    title: "Book and pay securely",
    description:
      "Reserve online with an encrypted card payment, or message us on WhatsApp. No meter and no hidden fees.",
  },
  {
    title: "Meet your driver",
    description:
      "Your bilingual driver tracks your flight, meets you at pickup, and takes you door to door in an air-conditioned vehicle.",
  },
];

export function HomePage() {
  const navigate = useNavigate();

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
    "Private Transfers & Airport Shuttle in Costa Rica",
    "Private transfers and airport shuttles in Costa Rica: SJO airport to La Fortuna/Arenal, Manuel Antonio, Tamarindo, Papagayo and Puerto Viejo. Bilingual licensed drivers, flight tracking, fixed door-to-door prices.",
    {
      keywords:
        "private shuttle Costa Rica, private driver Costa Rica, hotel transfer Costa Rica, tourist transfer Costa Rica, SJO to La Fortuna shuttle, San Jose to Arenal transfer, Manuel Antonio shuttle, Tamarindo shuttle",
    },
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
        data-cy="home-hero"
      >
        {/* Media is clipped in its own layer so the hero itself can stay
            overflow-visible and the address suggestions are never cut off. */}
        <HomeHeroMedia />

        <div className="home-hero-overlay">
          <p className="home-hero-badge" data-cy="home-hero-badge">
            <span className="home-hero-badge__stars" aria-hidden="true">
              ★★★★★
            </span>
            Rated 4.9/5 by travelers on Google and Tripadvisor
          </p>
          <h1>Discover the Beauty of Costa Rica with FIGA TRAVEL</h1>
          <p className="home-hero-subtitle">
            Private transfers, local guidance, and curated routes from volcanoes
            to beaches.
          </p>
          <ul className="home-hero-highlights" data-cy="home-hero-highlights">
            {heroHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="home-hero-search" data-cy="home-route-search">
          {/* Pricing happens on /book-online; the search is handed over in router state. */}
          <RouteSearchCard
            submitLabel="See my price"
            onSubmit={(search) => navigate("/book-online", { state: { routeSearch: search } })}
          />
        </div>
      </section>

      <section
        className="home-trust-strip home-reveal"
        aria-label="Trust indicators"
        data-cy="home-trust-strip"
      >
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

      <section
        className="home-services home-reveal"
        aria-label="Service highlights"
        data-cy="home-services"
      >
        {serviceStrip.map((service) => (
          <article key={service.label} className="home-service-item">
            <img src={service.icon} alt="" aria-hidden="true" loading="lazy" />
            <span>{service.label}</span>
          </article>
        ))}
      </section>

      <section
        className="home-steps home-reveal"
        aria-labelledby="home-steps-title"
        data-cy="home-steps"
      >
        <div className="home-section-head">
          <p className="eyebrow">Book in minutes</p>
          <h2 id="home-steps-title">How your private transfer works</h2>
        </div>

        <ol className="home-steps-list">
          {bookingSteps.map((step, index) => (
            <li key={step.title} className="home-step" data-cy="home-step">
              <span className="home-step__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="home-top-destinations home-reveal"
        aria-labelledby="home-destinations-title"
        data-cy="home-destinations"
      >
        <div className="home-split-head">
          <div>
            <p className="eyebrow">Where we drive</p>
            <h2 id="home-destinations-title">Top destinations in Costa Rica</h2>
          </div>
          <Link to="/destinations" className="home-inline-link">
            All destinations
          </Link>
        </div>

        {/* Bento grid: the first destination gets the large tile. Uses the
            high-resolution gallery photo when available. */}
        <div className="home-destination-grid">
          {topDestinations.map((destination) => (
            <Link
              key={destination.slug}
              to={`/destinations/${destination.slug}`}
              className="home-destination-tile"
              data-cy="home-destination-tile"
            >
              <img
                src={destination.gallery[0] ?? destination.cardImage}
                alt={destination.name}
                loading="lazy"
              />
              <div className="home-destination-tile__body">
                <h3>{destination.name}</h3>
                <p>{destination.transferTime}</p>
              </div>
              <span className="home-destination-tile__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="home-highlight-band home-reveal">
        <section
          className="home-priority-section"
          aria-labelledby="home-priority-title"
        >
          <div className="home-section-head">
            <p className="eyebrow">Why travelers pick Figa</p>
            <h2 id="home-priority-title">What every transfer includes</h2>
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
            <p className="eyebrow">Rated 4.9/5 on Google and Tripadvisor</p>
            <h2 id="home-testimonials-title">What travelers say</h2>
          </div>

          <ReviewsCarousel reviews={featuredReviews} />
        </section>
      </div>

      <section
        className="home-fleet-section home-reveal"
        aria-labelledby="home-fleet-title"
        data-cy="home-fleet"
      >
        <div className="home-fleet-head">
          <div>
            <p className="eyebrow">Our fleet</p>
            <h2 id="home-fleet-title">A vehicle for every group size</h2>
          </div>
          <Link to="/fleet" className="home-inline-link">
            View full fleet
          </Link>
        </div>

        <div className="home-fleet-grid">
          {fleet.map((vehicle) => (
            <Link
              key={vehicle.slug}
              to="/fleet"
              className="fleet-card fleet-card--compact"
              data-cy="home-fleet-card"
            >
              <div className="fleet-card__media">
                <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                {vehicle.premium ? (
                  <span className="fleet-card__badge">Premium</span>
                ) : null}
              </div>
              <div className="fleet-card__body">
                <h3 className="fleet-card__name">{vehicle.name}</h3>
                <p className="fleet-card__cap">{vehicle.capacity}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="home-faq-teaser home-reveal"
        aria-labelledby="home-faq-title"
        data-cy="home-faq"
      >
        <div className="home-faq-copy">
          <p className="eyebrow">Have any questions?</p>
          <h2 id="home-faq-title">Frequently Asked Questions</h2>
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
        className="home-final-cta home-reveal"
        aria-labelledby="home-final-cta-title"
        data-cy="home-final-cta"
      >
        <div className="home-final-cta__copy">
          <p className="eyebrow">Ready when you land</p>
          <h2 id="home-final-cta-title">
            Your private ride across Costa Rica starts here
          </h2>
          <p>
            Get a fixed door-to-door price in seconds. Tolls, taxes, and fuel
            included, no surprises.
          </p>
        </div>

        <div className="home-final-cta__actions">
          <Link
            to="/book-online"
            className="home-book-now"
            data-cy="home-final-cta-book"
          >
            Get my price
          </Link>
          <a
            href={WHATSAPP_URL}
            className="hero-cta hero-cta--outline-light"
            target="_blank"
            rel="noreferrer"
            data-cy="home-final-cta-whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
