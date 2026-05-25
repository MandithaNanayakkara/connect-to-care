import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogoMark } from './LogoMark'
import { trackEvent } from '../lib/analytics'
import './Header.css'

const SCROLL_THRESHOLD = 40

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/impact', label: 'Impact' },
  { to: '/newsletter', label: 'Newsletter' },
  { to: '/outcomes', label: 'Outcomes' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={[
        'site-header',
        scrolled ? 'site-header--scrolled' : '',
        menuOpen ? 'site-header--menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="site-header__inner container">
        <Link to="/" className="site-header__logo" aria-label="Connect To Care home">
          <LogoMark />
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-header__nav${menuOpen ? ' is-open' : ''}`} aria-label="Main">
          {menuOpen && (
            <button
              type="button"
              className="site-header__close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          )}

          <div className="site-header__links">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `site-header__link${isActive ? ' site-header__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/connect"
              className={({ isActive }) =>
                `site-header__link site-header__link--mobile-only${
                  isActive ? ' site-header__link--active' : ''
                }`
              }
              onClick={() => trackEvent('partner_cta_click', { location: 'nav_mobile' })}
            >
              Partner with us
            </NavLink>
          </div>

          <NavLink
            to="/connect"
            className={({ isActive }) =>
              `site-header__cta btn btn--primary${isActive ? ' site-header__cta--active' : ''}`
            }
            onClick={() => trackEvent('partner_cta_click', { location: 'nav' })}
          >
            Partner with us
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
