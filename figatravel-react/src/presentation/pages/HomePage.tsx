import type { SyntheticEvent } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { featuredReviews } from "../data/siteContent";
import { ReviewsCarousel } from "../components/ReviewsCarousel";
import { HomeHeroMedia } from "../components/HomeHeroMedia";
import { RouteSearchCard } from "../components/route-search/RouteSearchCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { whatsappUrl } from "../i18n/format";
import { useI18n } from "../i18n/useI18n";
import { useSiteContent } from "../i18n/useSiteContent";

// Icons in the same order as the translated labels in m.home.services.
const serviceIcons = [
  "/assets/home/icon-wifi.png",
  "/assets/home/icon-customer-service.png",
  "/assets/home/icon-eco.png",
  "/assets/home/icon-vehicle.png",
];

export function HomePage() {
  const navigate = useNavigate();
  const { m } = useI18n();
  const t = m.home;
  const { destinations, fleet, priorities, faqItems } = useSiteContent();

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
        aria-label={t.heroAria}
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
            {t.heroBadge}
          </p>
          <h1>{t.heroTitle}</h1>
          <p className="home-hero-subtitle">{t.heroSubtitle}</p>
          <ul className="home-hero-highlights" data-cy="home-hero-highlights">
            {t.heroHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="home-hero-search" data-cy="home-route-search">
          {/* Pricing happens on /book-online; the search is handed over in router state. */}
          <RouteSearchCard
            submitLabel={t.seeMyPrice}
            onSubmit={(search) => navigate("/book-online", { state: { routeSearch: search } })}
          />
        </div>
      </section>

      <section
        className="home-trust-strip home-reveal"
        aria-label={t.trustAria}
        data-cy="home-trust-strip"
      >
        <article>
          <h2>500+</h2>
          <p>{t.trustTransfers}</p>
        </article>
        <article>
          <h2>24/7</h2>
          <p>{t.trustSupport}</p>
        </article>
        <article>
          <h2>4.9/5</h2>
          <p>{t.trustRating}</p>
        </article>
      </section>

      <section
        className="home-services home-reveal"
        aria-label={t.servicesAria}
        data-cy="home-services"
      >
        {serviceIcons.map((icon, index) => (
          <article key={icon} className="home-service-item" data-cy="home-service-item">
            <img src={icon} alt="" aria-hidden="true" loading="lazy" />
            <span>{t.services[index]}</span>
          </article>
        ))}
      </section>

      <section
        className="home-steps home-reveal"
        aria-labelledby="home-steps-title"
        data-cy="home-steps"
      >
        <div className="home-section-head">
          <p className="eyebrow">{t.stepsEyebrow}</p>
          <h2 id="home-steps-title">{t.stepsTitle}</h2>
        </div>

        <ol className="home-steps-list">
          {t.steps.map((step, index) => (
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
            <p className="eyebrow">{t.destinationsEyebrow}</p>
            <h2 id="home-destinations-title">{t.destinationsTitle}</h2>
          </div>
          <Link to="/destinations" className="home-inline-link" data-cy="home-all-destinations">
            {t.allDestinations}
          </Link>
        </div>

        {/* Bento grid: the first destination gets the large tile. Uses the
            high-resolution gallery photo when available. */}
        <div className="home-destination-grid">
          {destinations.map((destination) => (
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
            <p className="eyebrow">{t.prioritiesEyebrow}</p>
            <h2 id="home-priority-title">{t.prioritiesTitle}</h2>
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
            <p className="eyebrow">{t.testimonialsEyebrow}</p>
            <h2 id="home-testimonials-title">{t.testimonialsTitle}</h2>
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
            <p className="eyebrow">{t.fleetEyebrow}</p>
            <h2 id="home-fleet-title">{t.fleetTitle}</h2>
          </div>
          <Link to="/fleet" className="home-inline-link" data-cy="home-view-fleet">
            {t.viewFullFleet}
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
                  <span className="fleet-card__badge">{m.common.premium}</span>
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
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2 id="home-faq-title">{t.faqTitle}</h2>
          <p>
            {t.faqTextBefore}{" "}
            <Link to="/faq" className="home-inline-link" data-cy="home-faq-link">
              {t.faqLink}
            </Link>
          </p>
        </div>

        <div className="home-faq-preview">
          <div className="home-faq-preview-head">
            <h3>{t.topQuestions}</h3>
            <Link to="/faq" className="home-inline-link home-faq-preview-link" data-cy="home-faq-view-all">
              {t.viewAll}
            </Link>
          </div>

          {faqItems.slice(0, 3).map((item, index) => (
            <details
              key={item.question}
              className="faq-item faq-accordion-item"
              onToggle={handleAccordionToggle}
              open={index === 0}
              data-cy={`home-faq-item-${index}`}
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
          <p className="eyebrow">{t.finalEyebrow}</p>
          <h2 id="home-final-cta-title">{t.finalTitle}</h2>
          <p>{t.finalText}</p>
        </div>

        <div className="home-final-cta__actions">
          <Link
            to="/book-online"
            className="home-book-now"
            data-cy="home-final-cta-book"
          >
            {t.getMyPrice}
          </Link>
          <a
            href={whatsappUrl(m.common.whatsappBookingText)}
            className="hero-cta hero-cta--outline-light"
            target="_blank"
            rel="noreferrer"
            data-cy="home-final-cta-whatsapp"
          >
            {m.common.chatOnWhatsApp}
          </a>
        </div>
      </section>
    </main>
  );
}
