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
  const { isAuthenticated, session, signInWithGoogle, signOut, authError } =
    useAuth()

  const footerLinks = navItems

  return (
    <div className="page-shell">
      <nav className="top-nav" aria-label="Principal">
        <div className="home-logo-wrap">
          <NavLink to="/" className="logo-link" aria-label="Figa Travel Home">
            <img src="/assets/home/logo-figa.png" alt="Figa Travel Costa Rica" className="home-logo" />
          </NavLink>
        </div>

        <div className="nav-right home-nav-right">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
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
                >
                  Admin
                </NavLink>
              </li>
            ) : null}
          </ul>

          <div className="auth-block home-auth-block">
            <input
              type="search"
              placeholder="Search..."
              className="home-search-input"
              aria-label="Search"
            />

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

      <Outlet />

      <footer className="site-footer" aria-label="Footer">
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
              <a href="https://instagram.com/figatravel?igshid=NjIwNzIyMDk2Mg==" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://www.facebook.com/profile.php?id=100064039205150" target="_blank" rel="noreferrer">
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
