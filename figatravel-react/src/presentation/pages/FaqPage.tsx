import type { SyntheticEvent } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faqItems } from '../data/siteContent'
import { usePageMeta } from '../hooks/usePageMeta'

export function FaqPage() {
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
    'FAQ',
    'Find answers about transfers, schedules, and booking details with Figa Travel Costa Rica.',
  )

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
    <main className="info-page faq-page">
      <header className="section page-hero faq-hero">
        <p className="eyebrow">HAVE ANY QUESTIONS?</p>
        <h1>FAQ</h1>
        <p className="hero-copy">
          Quick answers to help you plan your trip with complete clarity.
        </p>
      </header>

      <section className="section" aria-labelledby="faq-list-title">
        <div className="section-head">
          <h2 id="faq-list-title">Frequently Asked Questions</h2>
          <p>If you need anything else, contact us via WhatsApp, email, or the contact form.</p>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => (
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

        <div className="faq-cta-row">
          <a
            href="https://api.whatsapp.com/send/?phone=%2B50672271058&text&type=phone_number&app_absent=0"
            className="hero-cta"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
          <Link to="/contact" className="hero-cta ghost">
            Go to contact
          </Link>
        </div>
      </section>
    </main>
  )
}
