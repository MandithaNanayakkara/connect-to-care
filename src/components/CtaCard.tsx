import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import './CtaCard.css'

type CtaCardProps = {
  label: string
  title: string
  body: string
  buttonText: string
  trackLocation?: string
}

export function CtaCard({ label, title, body, buttonText, trackLocation = 'cta' }: CtaCardProps) {
  return (
    <section className="cta-section section-pad">
      <div className="container">
        <div className="cta-card">
          <p className="section-label section-label--light">{label}</p>
          <h2 className="display-title display-title--light cta-card__title">{title}</h2>
          <p className="cta-card__body">{body}</p>
          <Link
            to="/connect"
            className="btn btn--teal btn--arrow"
            onClick={() => trackEvent('partner_cta_click', { location: trackLocation })}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
