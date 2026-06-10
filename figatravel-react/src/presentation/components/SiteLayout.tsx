import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Book Online', to: '/book-online' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
]

export function SiteLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { isAuthenticated, session, signInWithGoogle, signOut, authError } =
    useAuth()

  const footerLinks = navItems

  return (
    <div className="page-shell min-h-screen flex flex-col">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <nav className="top-nav w-full" aria-label="Principal">
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
              <button
                type="button"
                className="auth-button login-like"
                onClick={() => void signInWithGoogle()}
              >
                <span className="login-icon" aria-hidden="true">
                  ●
                </span>
                Log In
              </button>
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
            <p>
              <a href="https://www.instagram.com/figatravelcr/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://www.facebook.com/profile.php?id=100067353755078" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </p>
            <p>
              <a href="https://api.whatsapp.com/send/?phone=%2B50672271058&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </p>
          </section>
        </div>

        <p className="footer-copy">©2026 by Figa Travel Costa Rica</p>
      </footer>
    </div>
  )
}
