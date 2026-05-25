import { Link } from 'react-router-dom'
import { AboutImage } from '../components/AboutImage'
import { CtaCard } from '../components/CtaCard'
import { Reveal } from '../components/Reveal'
import './About.css'

const partners = [
  'Gates Foundation',
  'PATH',
  'Global Health Strategies',
  'Sarvodaya',
  'Roshan Mahanama Trust',
  'Mithuru Mithuro',
]

const whoWeAreSteps = [
  'We operate in complex, multi-stakeholder environments where policy ambition must translate into real-world outcomes.',
  'Our role is to support that transition — strengthening coordination, enabling execution, and ensuring systems function as intended.',
  'We work visibly and behind the scenes — helping institutions navigate complexity, align stakeholders, and move initiatives forward sustainably.',
]

const whatWeDo = [
  {
    num: '01',
    title: 'Policy & Programme Design',
    text: 'We support governments and partners in shaping initiatives — translating high-level priorities into structured, implementable programmes.',
    image: '/about/what-01-policy.jpg',
    label: 'Policy design',
  },
  {
    num: '02',
    title: 'Implementation & Delivery Support',
    text: 'We work alongside institutions to ensure programmes are executed effectively — hands-on support to maintain momentum and achieve outcomes.',
    image: '/about/what-02-delivery.jpg',
    label: 'Delivery',
  },
  {
    num: '03',
    title: 'Stakeholder & Funding Coordination',
    text: 'We align governments, donors, private sector and technical partners — coordinating efforts, optimising resources, and minimising duplication.',
    image: '/about/what-03-coordination.jpg',
    label: 'Coordination',
  },
  {
    num: '04',
    title: 'Systems Strengthening & Problem Solving',
    text: 'We address structural and operational challenges in complex initiatives — resolving bottlenecks, improving coordination, and strengthening long-term systems.',
    image: '/about/what-04-systems.jpg',
    label: 'Systems',
  },
]

const focusAreas = [
  { name: 'Poverty Alleviation', tagline: 'Empowerment and opportunity' },
  { name: 'Food Security', tagline: 'Enough to eat, always' },
  { name: 'Nutrition', tagline: 'Better lives through good food' },
  { name: 'Climate Change', tagline: 'Sustainable futures' },
  { name: 'Drug Abuse Prevention', tagline: 'Prevention and recovery' },
  { name: 'Childhood Cancer', tagline: 'Support for young heroes' },
  { name: 'Children with Disabilities', tagline: 'An inclusive world for all' },
  { name: 'Health', tagline: 'Accessible care for all' },
  { name: 'Financial Inclusion', tagline: 'Economic independence' },
  { name: 'Agriculture', tagline: 'Sustainable farming and communities' },
]

export function About() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <div className="container about-hero__inner">
          <p className="section-label about-anim" style={{ animationDelay: '0.15s' }}>
            About us
          </p>
          <h1 className="about-hero__title about-anim" style={{ animationDelay: '0.3s' }}>
            Where national priorities become <em>real outcomes.</em>
          </h1>
          <p className="about-hero__sub about-anim" style={{ animationDelay: '0.45s' }}>
            An impact-driven organisation at the intersection of government, development
            partners, and implementation ecosystems — enabling delivery across Sri Lanka.
          </p>
        </div>
      </header>

      <Reveal as="section" className="about-who section-pad">
        <div className="container about-who__layout">
          <div className="about-who__visual">
            <AboutImage
              src="/about/who-we-are.jpg"
              alt="Connect To Care working with partners in Sri Lanka"
              label="Sri Lanka"
              className="about-who__image"
            />
            <div className="about-who__visual-accent" aria-hidden="true" />
          </div>
          <div className="about-who__content">
            <p className="section-label">Who we are</p>
            <p className="about-who__lead">
              Connect To Care is an impact-driven organisation that works at the intersection
              of government, development partners, and implementation ecosystems to enable the
              delivery of national priorities in Sri Lanka.
            </p>
            <ol className="about-who__steps">
              {whoWeAreSteps.map((step, i) => (
                <li key={step} className="about-who__step">
                  <span className="about-who__step-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="about-vm section-pad">
        <div className="container">
          <p className="section-label">Our vision &amp; mission</p>
          <h2 className="display-title about-vm__headline">Why we exist.</h2>
          <div className="vm-panels">
            <article className="vm-panel vm-panel--vision">
              <AboutImage
                src="/about/vision.jpg"
                alt=""
                label="Vision"
                className="vm-panel__bg"
              />
              <div className="vm-panel__content">
                <span className="vm-panel__tag">Our vision</span>
                <p className="vm-panel__text">
                  To enable a Sri Lanka where national priorities are delivered effectively
                  through strong systems, coordinated partnerships, and sustained impact.
                </p>
              </div>
            </article>
            <article className="vm-panel vm-panel--mission">
              <AboutImage
                src="/about/mission.jpg"
                alt=""
                label="Mission"
                className="vm-panel__bg"
              />
              <div className="vm-panel__content">
                <span className="vm-panel__tag">Our mission</span>
                <p className="vm-panel__text">
                  To support governments, organisations, and development partners in designing,
                  coordinating, and implementing initiatives that create measurable, long-term
                  impact — by strengthening systems, aligning stakeholders, and enabling delivery
                  at scale.
                </p>
              </div>
            </article>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="about-what section-pad">
        <div className="container">
          <p className="section-label">What we do</p>
          <h2 className="display-title about-what__headline">Four ways we move work forward.</h2>
          <div className="what-rows">
            {whatWeDo.map((item, i) => (
              <article
                key={item.num}
                className={`what-row${i % 2 === 1 ? ' what-row--reverse' : ''}`}
              >
                <div className="what-row__media">
                  <AboutImage
                    src={item.image}
                    alt=""
                    label={item.label}
                    className="what-row__image"
                  />
                  <span className="what-row__num" aria-hidden="true">
                    {item.num}
                  </span>
                </div>
                <div className="what-row__copy">
                  <h3 className="what-row__title">{item.title}</h3>
                  <p className="what-row__text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="about-partners-bar" aria-label="Collaborating partners">
        <div className="container">
          <span className="about-partners-bar__label">Trusted with</span>
          <div className="about-partners-bar__chips">
            {partners.map((name) => (
              <span key={name} className="partner-chip">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="about-focus section-pad">
        <div className="container">
          <p className="section-label">Focus areas</p>
          <h2 className="display-title about-focus__headline">Where we channel energy.</h2>
          <div className="focus-mosaic">
            {focusAreas.map((area, i) => (
              <article
                key={area.name}
                className={`focus-tile${i % 2 === 0 ? ' focus-tile--navy' : ' focus-tile--teal'}`}
                tabIndex={0}
                aria-label={`${area.name}: ${area.tagline}`}
              >
                <div className="focus-tile__top">
                  <span className="focus-tile__dot" aria-hidden="true" />
                  <h3 className="focus-tile__name">{area.name}</h3>
                </div>
                <div className="focus-tile__reveal">
                  <p className="focus-tile__tagline">{area.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="about-people-link">
        <div className="container">
          <Link to="/team" className="about-people-link__card">
            <span className="about-people-link__label">People</span>
            <span className="about-people-link__title">Board &amp; leadership team →</span>
          </Link>
        </div>
      </Reveal>

      <CtaCard
        label="Work with us"
        title="Ready to build something bigger?"
        body="We partner with governments, development agencies and institutions to design and deliver initiatives at scale."
        buttonText="Start a conversation"
        trackLocation="about_cta"
      />
    </div>
  )
}
