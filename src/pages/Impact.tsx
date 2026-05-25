import { Link } from 'react-router-dom'
import { CtaCard } from '../components/CtaCard'
import './Impact.css'

const featuredCases = [
  {
    variant: 'teal' as const,
    tag: 'Nutrition · Sri Lanka',
    title: 'Taking fortified rice from pilot to national nutrition policy.',
    blocks: [
      {
        label: 'Context',
        text: "Sri Lanka's national nutrition programme faced entrenched bottlenecks — fragmented stakeholder coordination, stalled Treasury financing and no unified mechanism to move the NMRA micronutrient survey forward.",
      },
      {
        label: 'What CTC catalysed',
        text: 'PSU convened a high-level Presidential Secretariat meeting bringing together the Ministry of Health, NFPB, Ministry of Agriculture, SLSI, ITI, University of Wayamba, PATH and WFP. Treasury financing unblocked. MRI collaboration secured.',
      },
      {
        label: 'Outcome',
        text: 'Domestic rice fortification programme unblocked at policy level. MRI survey underway. Pathway established to national-scale nutrition intervention.',
      },
    ],
    partners: ['Gates Foundation', 'PATH', 'WFP', 'Ministry of Health', 'NFPB'],
  },
  {
    variant: 'navy' as const,
    tag: 'Agriculture · Sri Lanka',
    title: 'Standing up an AgriTech accelerator from concept to national launch.',
    blocks: [
      {
        label: 'Context',
        text: "Sri Lanka's agricultural sector lacked integrated digital systems connecting smallholder farmers, government bodies and financial institutions.",
      },
      {
        label: 'What CTC catalysed',
        text: 'IDAT finalised across four ministries. Meetings secured with PM, Deputy Minister of Digital Economy and Deputy Ministers of Finance. GoviLab Regional Demo Day with Hatch and Sarvodaya. AITS positioned as national DPI.',
      },
      {
        label: 'Outcome',
        text: 'Cross-ministry digital alignment achieved. AgriTech accelerator cohort launched. AITS positioned as national infrastructure.',
      },
    ],
    partners: ['Gates Foundation', 'DevPro', 'Hatch', 'Sarvodaya', '4 Ministries'],
  },
]

const otherWork = [
  {
    tag: 'Dairy Reform',
    title: '5-Year Dairy Strategic Plan',
    summary:
      'Ministerial endorsement secured across 6 high-level meetings with DAPH, NLDB and the Ministry of Agriculture. CTC formally requested to co-design the national dairy reform programme.',
  },
  {
    tag: 'Food Fortification',
    title: 'India Learning Visit',
    summary:
      "High-level learning visit for Sri Lankan NFPB representatives to study India's large-scale fortification and Mid-Day Meal Program in Mumbai.",
  },
  {
    tag: 'Environment',
    title: 'SACEP Retreat',
    summary:
      "Facilitated the South Asian Co-operative Environment Programme's strategic retreat on future direction, regional cooperation and team development.",
  },
  {
    tag: 'Global Partnerships',
    title: 'UNOPS Collaboration',
    summary:
      'Explored cross-Asia collaboration with the UNOPS regional team on sustainable development challenges across the region.',
  },
  {
    tag: 'Financial Systems',
    title: 'GFTN Partnership',
    summary:
      'Active collaboration with the Global Finance & Technology Network — founded by MAS — on leveraging technology for inclusive financial ecosystems.',
  },
  {
    tag: 'Policy Advocacy',
    title: 'Global Health Strategies',
    summary:
      'Supporting the Bill & Melinda Gates Foundation in policy advocacy on nutrition and health system reform across Sri Lanka.',
  },
  {
    tag: 'Nutrition · Partnership',
    title: 'PATH Partnership',
    summary:
      'Furthering the Gates Foundation and WFP initiative to combat malnutrition through rice fortification across Sri Lanka.',
  },
  {
    tag: 'Digital Agriculture',
    title: 'GoviLab Regional Demo Day',
    summary:
      "IDAT programme's AgriTech Accelerator Cohort 1 Regional Demo Day delivered with Hatch and Sarvodaya.",
  },
  {
    tag: 'Dairy · Q1 2026',
    title: 'Power BI Dairy Dashboard',
    summary:
      'Developed for the Ministry with key dairy production metrics and policy levers for ongoing reform tracking.',
  },
]

export function Impact() {
  return (
    <div className="impact-page">
      <header className="impact-hero">
        <div className="container impact-hero__inner">
          <p className="section-label section-label--light impact-anim" style={{ animationDelay: '0.15s' }}>
            Proof in practice
          </p>
          <h1 className="impact-hero__title impact-anim" style={{ animationDelay: '0.3s' }}>
            From analysis to implementation.
          </h1>
          <p className="impact-hero__sub impact-anim" style={{ animationDelay: '0.45s' }}>
            A record of programmes designed, coalitions built and reforms delivered across
            Sri Lanka and the wider region.
          </p>
        </div>
      </header>

      <section className="impact-stats" aria-label="Impact at a glance">
        <div className="container impact-stats__inner">
          <div className="impact-stat">
            <p className="impact-stat__value impact-stat__value--teal">6+</p>
            <p className="impact-stat__label">Multilateral partners engaged</p>
          </div>
          <div className="impact-stat">
            <p className="impact-stat__value">4</p>
            <p className="impact-stat__label">Ministries aligned on DPI</p>
          </div>
          <div className="impact-stat">
            <p className="impact-stat__value">
              Toward <em>1B</em>
            </p>
            <p className="impact-stat__label">Lives — our ambition</p>
          </div>
        </div>
      </section>

      <section className="section-pad impact-featured">
        <div className="container">
          <p className="section-label">Featured work</p>
          <h2 className="display-title impact-featured__headline">
            What catalysing looks like in practice.
          </h2>
          <div className="featured-cases">
            {featuredCases.map((study) => (
              <article key={study.title} className={`featured-case featured-case--${study.variant}`}>
                <span className="featured-case__tag">{study.tag}</span>
                <h3 className="featured-case__title">{study.title}</h3>
                {study.blocks.map((block) => (
                  <div key={block.label} className="featured-case__block">
                    <p className="featured-case__block-label">{block.label}</p>
                    <p className="featured-case__block-text">{block.text}</p>
                  </div>
                ))}
                <div className="featured-case__partners">
                  {study.partners.map((partner) => (
                    <span key={partner} className="partner-pill">
                      {partner}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad impact-other">
        <div className="container">
          <p className="section-label">Other work</p>
          <h2 className="display-title impact-other__headline">More of what we&apos;ve done.</h2>
          <div className="other-work-grid">
            {otherWork.map((item) => (
              <article key={item.title} className="other-work-tile">
                <span className="other-work-tile__tag">{item.tag}</span>
                <h3 className="other-work-tile__title">{item.title}</h3>
                <p className="other-work-tile__text">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad impact-newsletter">
        <div className="container">
          <Link to="/newsletter" className="impact-newsletter-promo">
            <div>
              <p className="section-label">From our team</p>
              <h2 className="display-title impact-newsletter-promo__title">
                Thinking out loud on impact.
              </h2>
              <p className="impact-newsletter-promo__text">
                Stories, monthly digests, and field notes on programmes across Sri Lanka.
              </p>
            </div>
            <span className="impact-newsletter-promo__cta">Explore the newsletter →</span>
          </Link>
        </div>
      </section>

      <CtaCard
        label="Let's build it together"
        title="Have a mission that needs an ecosystem?"
        body="If you're a government, development agency or institution working toward outcomes at scale, we'd like to hear what you're trying to move."
        buttonText="Partner with us"
        trackLocation="impact_cta"
      />
    </div>
  )
}
