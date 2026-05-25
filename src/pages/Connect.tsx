import { useCallback, useState, type FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { TrackedLink } from '../components/TrackedLink'
import { isTurnstileEnabled, TurnstileField } from '../components/TurnstileField'
import './Connect.css'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@connecttocare.co'
const NEWSLETTER_URL = 'https://newsletter.connecttocare.co'

const contactRows = [
  {
    label: 'Email',
    content: (
      <a href="mailto:info@connecttocare.co">info@connecttocare.co</a>
    ),
  },
  {
    label: 'Address',
    content: '1215, 12th Floor, One Galle Face Tower, Colombo 01, Sri Lanka',
  },
  {
    label: 'LinkedIn',
    content: (
      <TrackedLink
        href="https://linkedin.com/company/connect-to-care-consulting/"
        trackLabel="linkedin_connect"
      >
        Connect To Care Consulting
      </TrackedLink>
    ),
  },
  {
    label: 'Instagram',
    content: (
      <TrackedLink href="https://instagram.com/connect_to_care" trackLabel="instagram_connect">
        @connect_to_care
      </TrackedLink>
    ),
  },
  {
    label: 'Newsletter',
    content: (
      <a href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
        newsletter.connecttocare.co
      </a>
    ),
  },
]

export function Connect() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRequired = isTurnstileEnabled()

  const handleTurnstileVerify = useCallback((token: string) => setTurnstileToken(token), [])
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_honey')) return
    if (turnstileRequired && !turnstileToken) {
      setError('Please complete the security check below.')
      return
    }
    if (turnstileToken) data.append('cf-turnstile-response', turnstileToken)
    setSubmitting(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      form.reset()
    } catch {
      setError('Please email info@connecttocare.co directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="connect-page">
      <header className="connect-hero">
        <div className="container connect-hero__inner">
          <p className="section-label section-label--light connect-anim" style={{ animationDelay: '0.2s' }}>
            Partner with us
          </p>
          <h1 className="connect-hero__title connect-anim" style={{ animationDelay: '0.35s' }}>
            Ready to start a conversation?
          </h1>
          <p className="connect-hero__sub connect-anim" style={{ animationDelay: '0.5s' }}>
            We partner with governments, development agencies and institutions to design and
            deliver initiatives at scale. If you&apos;re working on a problem that demands
            ecosystem-level coordination, let&apos;s talk.
          </p>
        </div>
      </header>

      <section className="connect-main section-pad">
        <div className="container connect-layout">
          <Reveal className="connect-details">
            <p className="section-label">Get in touch</p>
            <h2 className="connect-details__title">Have a mission that needs an ecosystem?</h2>
            <p className="connect-details__intro">
              We work at the intersection of government, multilateral institutions and the private
              sector — removing friction so that reform commitments translate into outcomes on the
              ground.
            </p>
            <div className="connect-contact-rows">
              {contactRows.map((row) => (
                <div key={row.label} className="connect-contact-row">
                  <span className="connect-contact-row__label">{row.label}</span>
                  <div className="connect-contact-row__value">{row.content}</div>
                </div>
              ))}
            </div>
            <blockquote className="connect-quote">
              <p>
                We bring ecosystems together so governments and partners can deliver impact at
                scale.
              </p>
            </blockquote>
          </Reveal>

          <Reveal className="connect-form-wrap" delay={120}>
            <p className="section-label">Send us a message</p>
            {submitted ? (
              <div className="connect-success" role="status">
                <p>Message received. We&apos;ll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form className="connect-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="_honey"
                  className="connect-form__honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input type="hidden" name="_subject" value="New enquiry — Connect To Care" />
                <input type="hidden" name="_captcha" value="false" />
                <div className="connect-form__split">
                  <div className="connect-form__field">
                    <label htmlFor="c-name">Name</label>
                    <input id="c-name" name="name" required autoComplete="name" />
                  </div>
                  <div className="connect-form__field">
                    <label htmlFor="c-org">Organisation</label>
                    <input id="c-org" name="organisation" required />
                  </div>
                </div>
                <div className="connect-form__field">
                  <label htmlFor="c-email">Email address</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="connect-form__field">
                  <label htmlFor="c-role">Role / Title</label>
                  <input id="c-role" name="role" required autoComplete="organization-title" />
                </div>
                <div className="connect-form__field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about the challenge you're working on…"
                  />
                </div>
                <TurnstileField onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />
                {error && (
                  <p className="connect-form__error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--arrow" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Start a Conversation'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="connect-newsletter-cta section-pad">
        <div className="container">
          <div className="newsletter-cta-card">
            <p className="section-label section-label--light">Our newsletter</p>
            <h2 className="display-title display-title--light newsletter-cta-card__title">
              Stay close to the work.
            </h2>
            <p className="newsletter-cta-card__body">
              Monthly dispatches on what we&apos;re seeing across governments, development agencies
              and reform programmes.
            </p>
            <a
              href={NEWSLETTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--teal btn--arrow"
            >
              Subscribe on Beehiiv
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
