import { useCallback, useEffect, useRef, useState } from 'react'
import { REVIEW_PROFILE_URL } from '../data/siteContent'
import type { Review, ReviewSource } from '../data/siteContent'

interface ReviewsCarouselProps {
  reviews: Review[]
}

const SOURCE_LABEL: Record<ReviewSource, string> = {
  google: 'Google',
  tripadvisor: 'Tripadvisor',
}

const AUTO_ADVANCE_MS = 6500

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="review-brand__mark">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.28-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.67-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06L5.85 9.9C6.72 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  )
}

function TripadvisorMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="review-brand__mark">
      <circle cx="12" cy="12" r="11" fill="#34E0A1" />
      <circle cx="8.1" cy="12" r="3.4" fill="#000814" />
      <circle cx="15.9" cy="12" r="3.4" fill="#000814" />
      <circle cx="8.1" cy="12" r="1.35" fill="#fff" />
      <circle cx="15.9" cy="12" r="1.35" fill="#fff" />
      <path d="M12 8.3c-1.1-1.3-2.8-2-4.7-2M12 8.3c1.1-1.3 2.8-2 4.7-2" stroke="#000814" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <span className="review-stars" role="img" aria-label={`${rounded} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rounded ? 'is-full' : ''} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  )
}

interface TrackMetrics {
  /** Distance between two consecutive cards (card width + gap). */
  step: number
  /** How many whole cards are visible at once. */
  perView: number
  /** Number of navigable pages (dots). */
  pageCount: number
  /** Largest scrollLeft the track allows. */
  maxScroll: number
}

const EMPTY_METRICS: TrackMetrics = { step: 0, perView: 1, pageCount: 1, maxScroll: 0 }

// Dependency-free carousel: a native scroll-snap track for the swiping, with
// arrows and dots driving it via scrollTo. Navigation is page-based (one full
// row of visible cards per dot) so the last dots never land on the same view.
export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  // Paused while the user hovers, focuses inside, or the tab is hidden.
  const pausedRef = useRef(false)

  // Measured live so it survives responsive breakpoints and font loading.
  const measure = useCallback((): TrackMetrics => {
    const track = trackRef.current
    if (!track || track.children.length === 0) {
      return EMPTY_METRICS
    }
    const first = track.children[0] as HTMLElement
    const second = track.children[1] as HTMLElement | undefined
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
    const perView = step > 0 ? Math.max(1, Math.round(track.clientWidth / step)) : 1
    return {
      step,
      perView,
      pageCount: Math.max(1, Math.ceil(reviews.length / perView)),
      maxScroll: track.scrollWidth - track.clientWidth,
    }
  }, [reviews.length])

  // Which page a given scroll position falls on. The last page is snapped to
  // whenever the track is scrolled to its end, even if that page is partial.
  const pageFromScroll = useCallback(
    (scrollLeft: number, m: TrackMetrics) => {
      if (m.step <= 0) {
        return 0
      }
      if (scrollLeft >= m.maxScroll - 2) {
        return m.pageCount - 1
      }
      const page = Math.round(scrollLeft / (m.perView * m.step))
      return Math.max(0, Math.min(m.pageCount - 1, page))
    },
    [],
  )

  const goToPage = useCallback(
    (page: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current
      if (!track) {
        return
      }
      const m = measure()
      const clamped = Math.max(0, Math.min(m.pageCount - 1, page))
      track.scrollTo({ left: Math.min(clamped * m.perView * m.step, m.maxScroll), behavior })
      setActive(clamped)
    },
    [measure],
  )

  // Recompute page count on mount and whenever the track resizes.
  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }
    let frame = 0
    const recompute = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const m = measure()
        setPageCount(m.pageCount)
        setActive((current) => Math.min(current, m.pageCount - 1))
      })
    }
    recompute()
    const observer = new ResizeObserver(recompute)
    observer.observe(track)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [measure])

  // Keep the active dot in sync while the user swipes/scrolls the track.
  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setActive(pageFromScroll(track.scrollLeft, measure()))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [measure, pageFromScroll])

  // Auto-advance by page, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) {
        return
      }
      goToPage(active >= pageCount - 1 ? 0 : active + 1)
    }, AUTO_ADVANCE_MS)
    return () => {
      window.clearInterval(id)
    }
  }, [active, pageCount, goToPage])

  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  return (
    <div
      className="reviews-carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="Traveler reviews from Google and Tripadvisor"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      data-cy="reviews-carousel"
    >
      <div className="reviews-track" ref={trackRef} data-cy="reviews-track">
        {reviews.map((review, index) => (
          <a
            key={`${review.source}-${review.author}`}
            className="review-card"
            href={review.url ?? REVIEW_PROFILE_URL[review.source]}
            target="_blank"
            rel="noreferrer"
            aria-roledescription="slide"
            aria-label={`Review ${index + 1} of ${reviews.length} by ${review.author} on ${SOURCE_LABEL[review.source]} — opens in a new tab`}
            data-cy="review-card"
          >
            <div className="review-card__head">
              <span className={`review-brand review-brand--${review.source}`}>
                {review.source === 'google' ? <GoogleMark /> : <TripadvisorMark />}
                {SOURCE_LABEL[review.source]}
              </span>
              <Stars rating={review.rating} />
            </div>

            <blockquote className="review-quote">{review.quote}</blockquote>

            <footer className="review-author">
              <span className="review-author__name">{review.author}</span>
              {review.trip ? <span className="review-author__trip">{review.trip}</span> : null}
            </footer>

            <span className="review-card__open" aria-hidden="true">
              Read on {SOURCE_LABEL[review.source]}
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17 17 7M8 7h9v9"
                />
              </svg>
            </span>
          </a>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="reviews-controls">
          <button
            type="button"
            className="reviews-nav"
            onClick={() => goToPage(active - 1)}
            disabled={active === 0}
            aria-label="Previous reviews"
            data-cy="reviews-prev"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div className="reviews-dots" role="tablist" aria-label="Choose a set of reviews">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={index === active ? 'reviews-dot is-active' : 'reviews-dot'}
                aria-label={`Go to reviews ${index + 1} of ${pageCount}`}
                aria-current={index === active}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="reviews-nav"
            onClick={() => goToPage(active + 1)}
            disabled={active === pageCount - 1}
            aria-label="Next reviews"
            data-cy="reviews-next"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
