import type { SyntheticEvent } from 'react'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { faqItems } from '../data/siteContent'
import { useJsonLd } from '../hooks/useJsonLd'
import { usePageMeta } from '../hooks/usePageMeta'
import { formatIsoDate, whatsappUrl } from '../i18n/format'
import { useI18n } from '../i18n/useI18n'
import { useSiteContent } from '../i18n/useSiteContent'

// Shown on the page as a freshness signal for search engines and AI answers.
// Update it whenever the FAQ answers change.
const LAST_UPDATED = '2026-09-28'

export function FaqPage() {
  const { m, locale } = useI18n()
  const t = m.faqPage
  // Visible answers follow the chosen language; the JSON-LD below stays in
  // English to match the prerendered HTML crawlers read.
  const { faqItems: visibleFaqItems } = useSiteContent()

  const handleAccordionToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    const currentItem = event.currentTarget

    if (!currentItem.open) {
      return
    }

    const listContainer = currentItem.parentElement

    if (!listContainer) {
      return
    }

    listContainer.querySelectorAll('details[open]').forEach((item) => {
      if (item !== currentItem) {
        ;(item as HTMLDetailsElement).open = false
      }
    })

    if (window.innerWidth <= 840) {
      const { top, bottom } = currentItem.getBoundingClientRect()
      const isOutsideViewport = top < 96 || bottom > window.innerHeight

      if (isOutsideViewport) {
        window.requestAnimationFrame(() => {
          currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        })
      }
    }
  }

  usePageMeta(
    'Costa Rica Private Transfer & Airport Shuttle FAQ',
    'Answers about private transfers and airport shuttles in Costa Rica: SJO to La Fortuna, prices, travel times, vehicles, flight delays, child seats, and how to book with Figa Travel.',
    {
      keywords:
        'Costa Rica transfer FAQ, SJO to La Fortuna shuttle, how to get from San Jose airport to Arenal, Costa Rica private shuttle price, Costa Rica airport shuttle questions',
    },
  )

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [],
  )

  useJsonLd('faq-json-ld', faqJsonLd)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (window.innerWidth > 840) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const clickedOnAccordion = target.closest('.faq-accordion-item')

      if (clickedOnAccordion) {
        return
      }

      const faqList = document.querySelector('.faq-page .faq-list')

      if (!faqList) {
        return
      }

      faqList.querySelectorAll('details[open]').forEach((item) => {
        ;(item as HTMLDetailsElement).open = false
      })
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return (
    <main className="info-page faq-page" data-cy="faq-page">
      <header className="section page-hero faq-hero" data-cy="faq-hero">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="hero-copy">{t.intro}</p>
        <p className="hero-copy" data-cy="faq-last-updated">
          {m.common.lastUpdated} <time dateTime={LAST_UPDATED}>{formatIsoDate(LAST_UPDATED, locale)}</time>
        </p>
      </header>

      <section className="section" aria-labelledby="faq-list-title">
        <div className="section-head">
          <h2 id="faq-list-title">{t.listTitle}</h2>
          <p>{t.listIntro}</p>
        </div>

        <div className="faq-list" data-cy="faq-list">
          {visibleFaqItems.map((item, index) => (
            <details
              key={item.question}
              className="faq-item faq-accordion-item"
              onToggle={handleAccordionToggle}
              data-cy={`faq-item-${index}`}
              open={index === 0}
            >
              <summary className="faq-question">{item.question}</summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="faq-cta-row" data-cy="faq-cta-row">
          <a
            href={whatsappUrl()}
            className="hero-cta"
            target="_blank"
            rel="noreferrer"
            data-cy="faq-whatsapp"
          >
            {m.common.chatOnWhatsApp}
          </a>
          <Link to="/contact" className="hero-cta ghost" data-cy="faq-go-to-contact">
            {t.goToContact}
          </Link>
        </div>
      </section>
    </main>
  )
}
