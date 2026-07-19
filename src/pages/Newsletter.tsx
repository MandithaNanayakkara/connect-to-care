import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AboutImage } from '../components/AboutImage'
import { Reveal } from '../components/Reveal'
import {
  categories,
  getNewsletterData,
  NEWSLETTER_URL,
  type NewsletterCategory,
} from '../data/newsletter'
import './Newsletter.css'

const categoryLabels: Record<string, string> = {
  digest: 'Monthly digest',
  nutrition: 'Nutrition',
  agriculture: 'Agriculture',
  policy: 'Policy',
  partnerships: 'Partnerships',
}

export function Newsletter() {
  const [activeCategory, setActiveCategory] = useState<NewsletterCategory>('all')
  const { articles, projectSpotlights } = useMemo(() => getNewsletterData(), [])

  const featured = articles.find((a) => a.featured) ?? articles[0]

  const filtered = useMemo(() => {
    const list = articles.filter((a) => !a.featured || a.slug !== featured.slug)
    if (activeCategory === 'all') return list
    return list.filter((a) => a.category === activeCategory)
  }, [activeCategory, articles, featured.slug])

  return (
    <div className="newsletter-page">
      <header className="nl-hero">
        <div className="nl-hero__mesh" aria-hidden="true" />
        <div className="container nl-hero__inner">
          <div className="nl-hero__copy">
            <p className="section-label section-label--light nl-anim" style={{ animationDelay: '0.15s' }}>
              From our team
            </p>
            <h1 className="nl-hero__title nl-anim" style={{ animationDelay: '0.3s' }}>
              Thinking out loud on <em>impact.</em>
            </h1>
            <p className="nl-hero__sub nl-anim" style={{ animationDelay: '0.45s' }}>
              Monthly dispatches on programmes, policy windows, and what we are seeing across
              governments, development agencies, and reform in Sri Lanka.
            </p>
            <div className="nl-hero__actions nl-anim" style={{ animationDelay: '0.55s' }}>
              <a
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--teal btn--arrow"
              >
                Subscribe on Beehiiv
              </a>
              <span className="nl-hero__note">Published monthly · No noise</span>
            </div>
          </div>
          <div className="nl-hero__issue nl-anim" style={{ animationDelay: '0.4s' }} aria-hidden="true">
            <span className="nl-hero__issue-label">Current edition</span>
            <span className="nl-hero__issue-num">03</span>
            <span className="nl-hero__issue-month">March 2025</span>
          </div>
        </div>
      </header>

      <Reveal as="section" className="nl-featured section-pad">
        <div className="container">
          <p className="section-label">Featured story</p>
          <Link to={`/newsletter/${featured.slug}`} className="nl-featured-card">
            <div className="nl-featured-card__visual">
              <AboutImage
                src={featured.image}
                alt=""
                label={categoryLabels[featured.category]}
                className="nl-featured-card__image"
              />
            </div>
            <div className="nl-featured-card__body">
              <div className="nl-featured-card__meta">
                <span className="nl-tag">{categoryLabels[featured.category]}</span>
                <span className="nl-meta">{featured.date}</span>
                <span className="nl-meta">{featured.readTime} read</span>
              </div>
              <h2 className="nl-featured-card__title">{featured.title}</h2>
              <p className="nl-featured-card__excerpt">{featured.excerpt}</p>
              {featured.project && (
                <span className="nl-featured-card__project">{featured.project}</span>
              )}
              <span className="nl-read-link">Read full story →</span>
            </div>
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="nl-feed section-pad">
        <div className="container nl-feed__layout">
          <div className="nl-feed__main">
            <div className="nl-feed__header">
              <h2 className="display-title nl-feed__title">Latest stories</h2>
              <p className="nl-feed__count">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
              </p>
            </div>

            <div className="nl-filters" role="tablist" aria-label="Filter articles">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`nl-filter${activeCategory === cat.id ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="nl-masonry">
              {filtered.map((article, i) => (
                <Link
                  key={article.slug}
                  to={`/newsletter/${article.slug}`}
                  className={`nl-card${i % 5 === 0 ? ' nl-card--tall' : ''}${i % 3 === 1 ? ' nl-card--wide' : ''}`}
                >
                  <div className="nl-card__visual">
                    <AboutImage
                      src={article.image}
                      alt=""
                      label={categoryLabels[article.category]}
                      className="nl-card__image"
                    />
                    <span className="nl-card__shade" aria-hidden="true" />
                  </div>
                  <div className="nl-card__body">
                    <div className="nl-card__meta">
                      <span className="nl-tag nl-tag--small">{categoryLabels[article.category]}</span>
                      <span className="nl-meta">{article.date}</span>
                    </div>
                    <h3 className="nl-card__title">{article.title}</h3>
                    <p className="nl-card__excerpt">{article.excerpt}</p>
                    <span className="nl-card__footer">
                      <span>{article.readTime}</span>
                      <span className="nl-card__arrow">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="nl-empty">No stories in this category yet — check back next month.</p>
            )}
          </div>

          <aside className="nl-sidebar">
            <div className="nl-sidebar__subscribe">
              <p className="section-label">Stay in the loop</p>
              <h3 className="nl-sidebar__title">Get it in your inbox.</h3>
              <p className="nl-sidebar__text">
                Field notes, programme updates, and analysis from the CTC team — once a month.
              </p>
              <a
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--arrow"
              >
                Subscribe free
              </a>
            </div>

            <div className="nl-sidebar__projects">
              <p className="section-label">On the ground</p>
              <h3 className="nl-sidebar__title">Projects we write about.</h3>
              <ul className="nl-project-list">
                {projectSpotlights.map((project) => (
                  <li key={project.title}>
                    <Link to={project.href} className="nl-project-pill">
                      <span className="nl-project-pill__tag">{project.tag}</span>
                      <span className="nl-project-pill__title">{project.title}</span>
                      <span className="nl-project-pill__summary">{project.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/impact" className="nl-sidebar__impact-link">
                See all impact work →
              </Link>
            </div>
          </aside>
        </div>
      </Reveal>

      <Reveal as="section" className="nl-ticker" aria-label="Topics we cover">
        <div className="nl-ticker__track">
          {[...categories.slice(1), ...categories.slice(1)].map((cat, i) => (
            <span key={`${cat.id}-${i}`} className="nl-ticker__item">
              {cat.label}
            </span>
          ))}
        </div>
      </Reveal>

      <section className="nl-bottom-cta section-pad">
        <div className="container">
          <div className="nl-bottom-cta__card">
            <p className="section-label section-label--light">Newsletter</p>
            <h2 className="display-title display-title--light">
              Never miss a dispatch.
            </h2>
            <p className="nl-bottom-cta__text">
              Join readers from government, development and the private sector following
              Connect To Care&apos;s work across Sri Lanka.
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
      </section>
    </div>
  )
}
