import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { FloatingWhatsApp } from './FloatingWhatsApp'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Book Online', to: '/book-online' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
]

export function SiteLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const { isAuthenticated, session, signOut, authError } =
    useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const footerLinks = navItems

  return (
    <div className="page-shell min-h-screen flex flex-col">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <nav
        className={isNavScrolled ? 'top-nav top-nav-scrolled w-full' : 'top-nav w-full'}
        aria-label="Principal"
      >
        <div className="home-logo-wrap">
          <NavLink to="/" className="logo-link" aria-label="Figa Travel Home">
            <img src="/assets/home/logo-figa.png" alt="Figa Travel Costa Rica" className="home-logo" />
          </NavLink>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isNavOpen}
          aria-controls="main-nav-list"
          onClick={() => {
            setIsNavOpen((previous) => !previous)
          }}
        >
          Menu
        </button>

        <div
          className={
            isNavOpen
              ? 'nav-right home-nav-right open'
              : 'nav-right home-nav-right'
          }
        >
          <ul id="main-nav-list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => {
                    setIsNavOpen(false)
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {isAuthenticated ? (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => {
                    setIsNavOpen(false)
                  }}
                >
                  Admin
                </NavLink>
              </li>
            ) : null}
          </ul>

          <div className="auth-block home-auth-block">
            <a
              href="https://api.whatsapp.com/send/?phone=%2B50672271058&text=Hello%20Figa%20Travel%2C%20I%20want%20to%20book%20a%20transfer&type=phone_number&app_absent=0"
              className="quick-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            {isAuthenticated ? (
              <>
                <span className="auth-user" title={session?.user.email ?? ''}>
                  {session?.user.email}
                </span>
                <button
                  type="button"
                  className="auth-button"
                  onClick={() => void signOut()}
                >
                  Log Out
                </button>
              </>
            ) : (
              <NavLink
                to="/admin"
                className="auth-button login-like"
                onClick={() => {
                  setIsNavOpen(false)
                }}
              >
                <span className="login-icon" aria-hidden="true">
                  ●
                </span>
                Log In
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {authError ? <p className="error-text auth-error-bar">{authError}</p> : null}

      <div id="main-content" className="flex-1 w-full">
        <Outlet />
      </div>

      <footer className="site-footer w-full" aria-label="Footer">
        <div className="footer-grid">
          <section className="footer-block">
            <h2>Additional Links</h2>
            <ul className="footer-link-list">
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer-block">
            <h2>Contact</h2>
            <p>Ph. +506 7139 2747</p>
            <p>infofigatravel@gmail.com</p>
            <p>Los Angeles, La Fortuna, San Carlos, Alajuela, Costa Rica</p>
          </section>

          <section className="footer-block">
            <h2>Social</h2>
            <div className="footer-social-brand">
              <img src="/assets/home/logo-figa.png" alt="Figa Travel" className="footer-social-logo" />
              <p>Follow us and contact us directly.</p>
            </div>

            <div className="footer-social-links" aria-label="Social links">
              <a
                href="https://www.instagram.com/figatravelcr/"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="social-icon-svg">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100067353755078"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="social-icon-svg">
                  <path d="M13.5 22v-8H16l.5-3h-3V9.2c0-.9.3-1.6 1.6-1.6H16.6V5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V11H7.5v3H10v8h3.5Z" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B50672271058&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="social-icon-svg">
                  <path d="M20 4.1A10 10 0 0 0 4 18.7L2.8 22l3.4-1.1A10 10 0 1 0 20 4.1ZM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2 .7.7-2-.2-.3A8 8 0 1 1 12 20Zm4.3-5.9c-.2-.1-1.4-.7-1.6-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.1 1.6 2.5 3.9 3.4 1.6.7 2.3.7 2.8.6.3-.1 1.1-.5 1.3-1 .2-.5.2-.9.1-1Z" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        <p className="footer-copy">©2026 by Figa Travel Costa Rica</p>
      </footer>

      <FloatingWhatsApp />
    </div>
  )
}
