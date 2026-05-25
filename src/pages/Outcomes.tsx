import { Link } from 'react-router-dom'
import { AboutImage } from '../components/AboutImage'
import { CtaCard } from '../components/CtaCard'
import { Reveal } from '../components/Reveal'
import { outcomeAreas, outcomePathway, outcomeStats } from '../data/outcomes'
import './Outcomes.css'

export function Outcomes() {
  return (
    <div className="outcomes-page">
      <header className="oc-hero">
        <div className="oc-hero__bg">
          <AboutImage
            src="/outcomes/outcomes-hero.jpg"
            alt=""
            label="Impact at scale"
            className="oc-hero__image"
          />
          <div className="oc-hero__scrim" aria-hidden="true" />
        </div>
        <div className="container oc-hero__inner">
          <p className="section-label section-label--light oc-anim" style={{ animationDelay: '0.15s' }}>
            Where it shows up
          </p>
          <h1 className="oc-hero__title oc-anim" style={{ animationDelay: '0.3s' }}>
            Outcomes that strengthen lives and <em>economies.</em>
          </h1>
          <p className="oc-hero__sub oc-anim" style={{ animationDelay: '0.45s' }}>
            From nutrition and health to agriculture and climate — we work where national priorities
            meet measurable change on the ground.
          </p>
        </div>
      </header>

      <section className="oc-stats" aria-label="Outcomes at a glance">
        <div className="container oc-stats__inner">
          {outcomeStats.map((stat) => (
            <div key={stat.label} className="oc-stat">
              <p className={`oc-stat__value${stat.accent ? ' oc-stat__value--teal' : ''}`}>
                {stat.accent ? (
                  <>
                    Toward <em>1B</em>
                  </>
                ) : (
                  stat.value
                )}
              </p>
              <p className="oc-stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Reveal as="section" className="oc-ambition section-pad">
        <div className="container">
          <div className="oc-ambition__card">
            <p className="oc-ambition__eyebrow">Our ambition</p>
            <p className="oc-ambition__stat">
              Toward <em>one billion</em> lives
            </p>
            <p className="oc-ambition__text">
              Through economic empowerment and access to essential services — aligning
              governments, partners and delivery so impact compounds over time.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="oc-grid-section section-pad">
        <div className="container">
          <p className="section-label">Outcome areas</p>
          <h2 className="display-title oc-grid__headline">Eight places we drive change.</h2>
          <p className="oc-grid__intro">
            Hover a card to explore how Connect To Care shows up across sectors.
          </p>
          <div className="oc-grid">
            {outcomeAreas.map((area, i) => (
              <article
                key={area.id}
                className={`oc-card${i === 0 || i === 5 ? ' oc-card--feature' : ''}`}
                tabIndex={0}
              >
                <div className="oc-card__visual">
                  <AboutImage src={area.image} alt="" label={area.title} className="oc-card__image" />
                  <div className="oc-card__overlay">
                    <p className="oc-card__description">{area.description}</p>
                  </div>
                </div>
                <div className="oc-card__meta">
                  <h3 className="oc-card__title">{area.title}</h3>
                  <p className="oc-card__tagline">{area.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="oc-pathway section-pad">
        <div className="container oc-pathway__layout">
          <div className="oc-pathway__intro">
            <p className="section-label">How it happens</p>
            <h2 className="display-title">From convening to lasting systems.</h2>
            <p className="oc-pathway__text">
              Outcomes are not a single intervention — they emerge when ecosystems align and
              delivery holds.
            </p>
            <Link to="/about" className="btn btn--ghost">
              Our approach
            </Link>
          </div>
          <ol className="oc-pathway__steps">
            {outcomePathway.map((step) => (
              <li key={step.num} className="oc-pathway-step">
                <span className="oc-pathway-step__num">{step.num}</span>
                <div>
                  <h3 className="oc-pathway-step__title">{step.title}</h3>
                  <p className="oc-pathway-step__text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal as="section" className="oc-proof section-pad">
        <div className="container">
          <Link to="/impact" className="oc-proof__card">
            <div>
              <p className="section-label section-label--light">Proof in practice</p>
              <h2 className="display-title display-title--light oc-proof__title">
                See outcomes in real programmes.
              </h2>
              <p className="oc-proof__text">
                Case studies from nutrition policy, digital agriculture, dairy reform and more.
              </p>
            </div>
            <span className="oc-proof__cta">Explore impact work →</span>
          </Link>
        </div>
      </Reveal>

      <CtaCard
        label="Let's build it together"
        title="Have a mission that needs an ecosystem?"
        body="If you're a government, development agency or institution working toward outcomes at scale, we'd like to hear what you're trying to move."
        buttonText="Partner with us"
        trackLocation="outcomes_cta"
      />
    </div>
  )
}
