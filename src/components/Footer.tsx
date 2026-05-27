import { Link } from 'react-router-dom'
import { LogoMark } from './LogoMark'
import { TrackedLink } from './TrackedLink'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main container">
        <div className="site-footer__col site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label="Connect To Care home">
            <LogoMark />
          </Link>
          <p className="site-footer__tagline">
            Where purpose meets strategy — weaving governments, institutions and
            communities into lasting impact.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Explore">
          <p className="site-footer__heading">Explore</p>
          <Link to="/about">About</Link>
          <Link to="/team">Team</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/outcomes">Focus</Link>
          <Link to="/connect">Connect</Link>
        </nav>

        <div className="site-footer__col site-footer__connect">
          <p className="site-footer__heading">Connect</p>
          <a href="mailto:info@connecttocare.co">info@connecttocare.co</a>
          <TrackedLink
            href="https://linkedin.com/company/connect-to-care-consulting/"
            trackLabel="linkedin_footer"
          >
            LinkedIn
          </TrackedLink>
          <a href="https://newsletter.connecttocare.co" target="_blank" rel="noopener noreferrer">
            Newsletter
          </a>
          <p>One Galle Face Tower, Colombo 01</p>
        </div>
      </div>

      <div className="site-footer__bar container">
        <p>&copy; 2026 Connect To Care. All rights reserved.</p>
        <div className="site-footer__social">
          <TrackedLink
            href="https://linkedin.com/company/connect-to-care-consulting/"
            trackLabel="linkedin_footer_icon"
            className="site-footer__icon"
            aria-label="LinkedIn"
          >
            <span className="site-footer__icon-label">in</span>
          </TrackedLink>
          <TrackedLink
            href="https://www.instagram.com/connecttocare.co?igsh=Y2lpZnk5b3kzM21v"
            trackLabel="instagram_footer"
            className="site-footer__icon"
            aria-label="Instagram"
          >
            <span className="site-footer__icon-label">ig</span>
          </TrackedLink>
          <TrackedLink
            href="https://www.facebook.com/connecttocareco/"
            trackLabel="facebook_footer"
            className="site-footer__icon"
            aria-label="Facebook"
          >
            <span className="site-footer__icon-label">fb</span>
          </TrackedLink>
        </div>
      </div>
    </footer>
  )
}
