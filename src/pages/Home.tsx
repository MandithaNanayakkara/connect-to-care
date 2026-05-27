import { Link } from 'react-router-dom'
import { AboutImage } from '../components/AboutImage'
import { CtaCard } from '../components/CtaCard'
import { EcosystemDiagram } from '../components/EcosystemDiagram'
import { Reveal } from '../components/Reveal'
import { trackEvent } from '../lib/analytics'
import './Home.css'

const collabPartners = [
  'Gates Foundation',
  'PATH',
  'World Food Programme',
  'UNOPS',
  'GFTN',
  'Sarvodaya',
  'World Bank',
  'ADB',
  'JICA',
  'UNICEF',
  'FAO',
]

const heroStats = [
  { value: '1B', label: 'Lives we aim toward', accent: true },
  { value: '12+', label: 'Institutional partners' },
  { value: '8', label: 'Outcome areas' },
]

const approachSteps = [
  {
    num: '01',
    title: 'Convene the ecosystem',
    text: 'Governments, funders and implementers around one fundable plan.',
  },
  {
    num: '02',
    title: 'Reduce the complexity',
    text: 'Reform commitments move through institutions into action.',
  },
  {
    num: '03',
    title: 'Enable delivery at scale',
    text: 'Advisory, data and coordination that keep programmes on track.',
  },
  {
    num: '04',
    title: 'Build systems that last',
    text: 'Governments own outcomes — capacity, not dependency.',
  },
]

const impactCards = [
  {
    variant: 'teal' as const,
    tag: 'Nutrition · Sri Lanka',
    title: 'Fortified rice from pilot to national nutrition policy.',
    body: 'Treasury unblocked. MRI survey underway. National pathway established.',
    image: '/home/home-impact-nutrition.jpg',
  },
  {
    variant: 'navy' as const,
    tag: 'Agriculture · Sri Lanka',
    title: 'AgriTech accelerator and national digital agriculture infrastructure.',
    body: 'IDAT across four ministries. GoviLab Demo Day. AITS as national DPI.',
    image: '/home/home-impact-agriculture.jpg',
  },
]

const exploreLinks = [
  { to: '/about', label: 'Who we are' },
  { to: '/outcomes', label: 'Focus' },
  { to: '/impact', label: 'Impact work' },
  { to: '/newsletter', label: 'Newsletter' },
]

export function Home() {
  return (
    <div className="home">
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero__media" aria-hidden="true">
          <AboutImage src="/home/home-hero.jpg" alt="" className="home-hero__image home-hero__image--a" />
          <AboutImage
            src="/home/home-approach.jpg"
            alt=""
            className="home-hero__image home-hero__image--b"
          />
          <div className="home-hero__scrim" />
        </div>

        <div className="container home-hero__content">
          <div className="home-hero__layout">
            <div className="home-hero__copy">
              <p className="section-label section-label--light hero-anim" style={{ animationDelay: '0.15s' }}>
                Connect To Care
              </p>
              <h1 className="home-hero__title hero-anim" style={{ animationDelay: '0.3s' }}>
                Helping governments and partners deliver <em>impact at scale.</em>
              </h1>
              <p className="home-hero__body hero-anim" style={{ animationDelay: '0.45s' }}>
                We reduce the complexity of large-scale delivery — convening governments,
                funders and implementers so national priorities become measurable outcomes.
              </p>
              <div className="home-hero__actions hero-anim" style={{ animationDelay: '0.55s' }}>
                <Link
                  to="/connect"
                  className="btn btn--teal btn--arrow"
                  onClick={() => trackEvent('partner_cta_click', { location: 'hero' })}
                >
                  Start a conversation
                </Link>
                <a href="#approach" className="btn btn--ghost btn--ghost--light">
                  How it works
                </a>
              </div>
            </div>

            <aside className="home-hero__panel hero-anim" style={{ animationDelay: '0.5s' }}>
              <p className="home-hero__panel-label">Our approach</p>
              <h2 className="home-hero__panel-title">
                A catalyst between those who fund, govern and deliver.
              </h2>
              <p className="home-hero__panel-text">
                We sit at the intersection of government, multilateral institutions and the
                private sector — removing friction so reform becomes outcomes on the ground.
              </p>
              <ul className="home-hero__panel-list">
                <li>Policy &amp; programme design</li>
                <li>Stakeholder coordination</li>
                <li>Delivery at national scale</li>
              </ul>
            </aside>
          </div>

          <div className="home-hero__stats hero-anim" style={{ animationDelay: '0.65s' }}>
            {heroStats.map((stat) => (
              <div key={stat.label} className="home-hero-stat">
                <p className={`home-hero-stat__value${stat.accent ? ' home-hero-stat__value--accent' : ''}`}>
                  {stat.accent ? (
                    <>
                      Toward <em>1B</em>
                    </>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="home-hero-stat__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="home-hero__scroll" aria-hidden="true">
          <span>Scroll</span>
        </div>
      </section>

      <section className="home-marquee" aria-label="Collaborating partners">
        <div className="home-marquee__label-wrap container">
          <p className="home-marquee__label">
            <span className="home-marquee__label-line" aria-hidden="true" />
            <span className="home-marquee__label-text">
              <span className="home-marquee__label-in">In</span> collaboration with
            </span>
            <span className="home-marquee__label-line" aria-hidden="true" />
          </p>
        </div>
        <div className="home-marquee__track">
          {[...collabPartners, ...collabPartners].map((name, i) => (
            <span key={`${name}-${i}`} className="home-marquee__item">
              {name}
            </span>
          ))}
        </div>
      </section>

      <Reveal as="section" id="approach" className="home-approach section-pad">
        <div className="container home-approach__grid">
          <div className="home-approach__visual">
            <AboutImage
              src="/home/home-approach.jpg"
              alt="Connect To Care convening partners"
              className="home-approach__image"
            />
            <div className="home-approach__diagram">
              <EcosystemDiagram />
            </div>
          </div>
          <div className="home-approach__content">
            <p className="section-label">The platform model</p>
            <h2 className="display-title home-approach__headline">
              A catalyst between those who fund, govern and deliver.
            </h2>
            <p className="home-approach__intro">
              Large-scale change stalls when the right actors aren&apos;t aligned. We do the
              connective work — so partners can focus on outcomes.
            </p>
            <ol className="home-steps">
              {approachSteps.map((step) => (
                <li key={step.num} className="home-step">
                  <span className="home-step__num">{step.num}</span>
                  <div>
                    <h3 className="home-step__title">{step.title}</h3>
                    <p className="home-step__text">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/about" className="btn btn--ghost">
              About Connect To Care
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-explore section-pad">
        <div className="container">
          <div className="home-explore__grid">
            {exploreLinks.map((link) => (
              <Link key={link.to} to={link.to} className="home-explore-card">
                <span className="home-explore-card__label">{link.label}</span>
                <span className="home-explore-card__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-outcomes section-pad">
        <div className="container">
          <Link to="/outcomes" className="home-outcomes-band">
            <div className="home-outcomes-band__copy">
              <p className="section-label section-label--light">Where it shows up</p>
              <h2 className="display-title display-title--light">
                Outcomes that strengthen lives and economies.
              </h2>
              <p className="home-outcomes-band__text">
                Health, nutrition, agriculture, climate and more — toward one billion lives.
              </p>
            </div>
            <span className="home-outcomes-band__cta">Explore focus →</span>
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="home-impact section-pad">
        <div className="container">
          <div className="home-impact__header">
            <div>
              <p className="section-label">Proof in practice</p>
              <h2 className="display-title home-impact__headline">
                What catalysing looks like on the ground.
              </h2>
            </div>
            <Link to="/impact" className="btn btn--primary btn--arrow">
              See all work
            </Link>
          </div>
          <div className="home-impact__cards">
            {impactCards.map((card) => (
              <article key={card.title} className={`home-impact-card home-impact-card--${card.variant}`}>
                <div className="home-impact-card__visual">
                  <AboutImage src={card.image} alt="" className="home-impact-card__image" />
                  <div className="home-impact-card__scrim" />
                  <span className="home-impact-card__tag">{card.tag}</span>
                </div>
                <div className="home-impact-card__body">
                  <h3 className="home-impact-card__title">{card.title}</h3>
                  <p className="home-impact-card__text">{card.body}</p>
                  <Link to="/impact" className="home-impact-card__link">
                    Read the case →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="home-newsletter">
        <div className="container">
          <Link to="/newsletter" className="home-newsletter-band">
            <div>
              <p className="section-label">From our team</p>
              <h2 className="display-title">Thinking out loud on impact.</h2>
              <p className="home-newsletter-band__text">
                Monthly dispatches on programmes, policy and reform across Sri Lanka.
              </p>
            </div>
            <span className="home-newsletter-band__cta">Read the newsletter →</span>
          </Link>
        </div>
      </Reveal>

      <CtaCard
        label="Let's build it together"
        title="Have a mission that needs an ecosystem?"
        body="If you're a government, development agency or institution working toward outcomes at scale, we'd like to hear what you're trying to move."
        buttonText="Partner with us"
        trackLocation="home_cta"
      />
    </div>
  )
}
