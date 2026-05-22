import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Book Online', to: '/book-online' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
  { label: 'Admin', to: '/admin' },
]

export function SiteLayout() {
  return (
    <div className="page-shell">
      <nav className="top-nav" aria-label="Principal">
        <p className="brand">FIGA TRAVEL</p>
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
        </ul>
      </nav>

      <Outlet />

      <footer className="site-footer">
        <p>Ph. +506 7139 2747 | infofigatravel@gmail.com</p>
        <p>Instagram: @figatravel | Facebook: Figa Travel</p>
        <p>©2026 by Figa Travel Costa Rica</p>
      </footer>
    </div>
  )
}
