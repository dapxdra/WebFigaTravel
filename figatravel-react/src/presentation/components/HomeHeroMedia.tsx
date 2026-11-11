import { useEffect, useRef, useState } from 'react'
import { env } from '../../shared/config/env'

/** Drop a real POV clip here (or set VITE_HOME_HERO_VIDEO_URL) to replace the GIF. */
const DEFAULT_HERO_VIDEO = '/assets/home/hero-pov.mp4'
const HERO_VIDEO_SRC =
  typeof env.homeHeroVideoUrl === 'string' && env.homeHeroVideoUrl.length > 0
    ? env.homeHeroVideoUrl
    : DEFAULT_HERO_VIDEO
const HERO_POSTER = '/assets/home/hero-header.png'
/** Shown, in order, when the video is missing or can't play. */
const HERO_IMAGE_FALLBACKS = ['/assets/home/home-hero.gif', HERO_POSTER]

/**
 * Background media for the home hero.
 *
 * It tries the POV video first; if the file is missing or the browser can't
 * decode it (a missing file comes back as the SPA HTML shell, which fires the
 * video `error` event), it falls back to the animated GIF, then to a still.
 * Autoplay is muted + inline (required by mobile browsers) and skipped for
 * users who prefer reduced motion; a pause button satisfies WCAG 2.2.2.
 */
export function HomeHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    // On prerendered pages the video can fail before React hydrates and
    // attaches onError, so check for an earlier failure here too.
    if (video.error) {
      setVideoFailed(true)
      return
    }

    // React doesn't always serialize the `muted` attribute, and iOS only
    // allows autoplay for muted videos, so set it imperatively.
    video.muted = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }

    // play() rejects when autoplay is blocked (e.g. low-power mode); the
    // poster stays visible and the user can press play.
    video.play().catch(() => setIsPlaying(false))
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }

  return (
    <>
      <div className="home-hero-media" aria-hidden="true">
        {videoFailed ? (
          <img
            src={HERO_IMAGE_FALLBACKS[imageIndex]}
            alt=""
            className="home-hero-image"
            loading="eager"
            data-cy="home-hero-image"
            onError={() =>
              setImageIndex((current) => Math.min(current + 1, HERO_IMAGE_FALLBACKS.length - 1))
            }
          />
        ) : (
          <video
            ref={videoRef}
            className="home-hero-image"
            src={HERO_VIDEO_SRC}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            data-cy="home-hero-video"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoFailed(true)}
          />
        )}
      </div>

      {videoFailed ? null : (
        <div className="home-hero-video-controls">
          <span className="home-hero-pov-tag" data-cy="home-hero-pov-tag">
            <span className="home-hero-pov-dot" aria-hidden="true" />
            POV · A real ride with Figa
          </span>
          <button
            type="button"
            className="home-hero-video-toggle"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            data-cy="home-hero-video-toggle"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  )
}
