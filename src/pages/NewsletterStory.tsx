import { Link, useParams } from 'react-router-dom'
import { AboutImage } from '../components/AboutImage'
import { getNewsletterData } from '../data/newsletter'

const categoryLabels: Record<string, string> = {
  digest: 'Monthly digest',
  nutrition: 'Nutrition',
  agriculture: 'Agriculture',
  policy: 'Policy',
  partnerships: 'Partnerships',
}

export function NewsletterStory() {
  const { slug } = useParams()
  const { articles } = getNewsletterData()
  const article = articles.find((entry) => entry.slug === slug)

  if (!article) {
    return (
      <div className="section-pad">
        <div className="container" style={{ display: 'grid', gap: 16 }}>
          <p className="section-label">Newsletter</p>
          <h1 className="display-title">Story not found</h1>
          <p>That newsletter story could not be located.</p>
          <Link to="/newsletter" className="btn btn--primary">
            Back to newsletter
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad">
      <div className="container" style={{ display: 'grid', gap: 24, maxWidth: 900 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <p className="section-label">Newsletter story</p>
          <h1 className="display-title" style={{ margin: 0 }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', color: '#475569' }}>
            <span className="nl-tag">{categoryLabels[article.category]}</span>
            <span>{article.date}</span>
            <span>{article.readTime} read</span>
          </div>
        </div>

        {article.image && (
          <AboutImage
            src={article.image}
            alt={article.title}
            label={categoryLabels[article.category]}
            className="nl-featured-card__image"
          />
        )}

        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.8, color: '#334155' }}>
          {article.body ?? article.excerpt}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/newsletter" className="btn btn--secondary">
            Back to all stories
          </Link>
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Open original story
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
