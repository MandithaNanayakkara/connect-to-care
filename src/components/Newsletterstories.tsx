import { useState, useRef, useEffect } from 'react'
import {
  NEWSLETTER_URL,
  getNewsletterData,
  saveNewsletterData,
  type NewsletterArticle,
} from '../data/newsletter'
import './Newsletterstories.css'

type StoryCategory = 'Community' | 'Impact' | 'Research' | 'Partner Stories' | 'Events'

interface Story {
  id: string
  title: string
  excerpt: string
  body: string
  author: string
  category: StoryCategory
  publishedAt: string
  imageUrl: string
}

const CATEGORIES: StoryCategory[] = ['Community', 'Impact', 'Research', 'Partner Stories', 'Events']

const categoryColor: Record<StoryCategory, string> = {
  Community: '#0d7c66',
  Impact: '#2563eb',
  Research: '#7c3aed',
  'Partner Stories': '#b45309',
  Events: '#be123c',
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function formatDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function mapNewsletterCategoryToStory(category: NewsletterArticle['category']): StoryCategory {
  switch (category) {
    case 'nutrition':
      return 'Research'
    case 'agriculture':
      return 'Impact'
    case 'policy':
      return 'Impact'
    case 'partnerships':
      return 'Partner Stories'
    case 'digest':
    default:
      return 'Community'
  }
}

function mapStoryCategoryToNewsletter(category: StoryCategory): NewsletterArticle['category'] {
  switch (category) {
    case 'Research':
      return 'nutrition'
    case 'Impact':
      return 'policy'
    case 'Partner Stories':
      return 'partnerships'
    case 'Events':
      return 'digest'
    case 'Community':
    default:
      return 'digest'
  }
}

function storyToNewsletterArticle(story: Story): NewsletterArticle {
  return {
    slug: story.id,
    title: story.title,
    excerpt: story.excerpt,
    body: story.body || story.excerpt,
    category: mapStoryCategoryToNewsletter(story.category),
    date: story.publishedAt,
    readTime: '5 min',
    image: story.imageUrl || '/newsletter/default-story.jpg',
    url: NEWSLETTER_URL,
    project: story.category,
  }
}

function loadStoredStories(): Story[] {
  if (typeof window === 'undefined') {
    return []
  }

  const { articles } = getNewsletterData()
  return articles.map((article) => ({
    id: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body ?? article.excerpt,
    author: 'Connect To Care',
    category: mapNewsletterCategoryToStory(article.category),
    publishedAt: article.date,
    imageUrl: article.image ?? '',
  }))
}

const emptyStory = (): Omit<Story, 'id'> => ({
  title: '',
  excerpt: '',
  body: '',
  author: '',
  category: 'Community',
  publishedAt: new Date().toISOString().slice(0, 10),
  imageUrl: '',
})

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}

function Modal({ title, onClose, children, wide }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="ns-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={`ns-modal ${wide ? 'ns-modal--wide' : ''}`}>
        {/* Header */}
        <div className="ns-modal-header">
          <h2 className="ns-modal-title">{title}</h2>
          <button type="button" onClick={onClose} className="ns-modal-close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {/* Body */}
        <div className="ns-modal-body">{children}</div>
      </div>
    </div>
  )
}

interface StoryFormProps {
  initial: Omit<Story, 'id'>
  onSave: (data: Omit<Story, 'id'>) => void
  onCancel: () => void
  submitLabel: string
}

function StoryForm({ initial, onSave, onCancel, submitLabel }: StoryFormProps) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof Story, string>>>({})
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const errs: typeof errors = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.excerpt.trim()) errs.excerpt = 'Excerpt is required'
    if (!form.author.trim()) errs.author = 'Author is required'
    if (!form.publishedAt) errs.publishedAt = 'Date is required'
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    onSave(form)
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      set('imageUrl', result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="ns-form-grid">
        {/* Title — full width */}
        <div className="ns-form-field ns-form-field--full">
          <label className="ns-label">Title *</label>
          <input
            ref={titleRef}
            className={`ns-input ${errors.title ? 'ns-input--error' : ''}`}
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Story headline…"
          />
          {errors.title && <p className="ns-input-error-text">{errors.title}</p>}
        </div>

        {/* Author */}
        <div className="ns-form-field">
          <label className="ns-label">Author *</label>
          <input
            className={`ns-input ${errors.author ? 'ns-input--error' : ''}`}
            value={form.author}
            onChange={(e) => set('author', e.target.value)}
            placeholder="Full name"
          />
          {errors.author && <p className="ns-input-error-text">{errors.author}</p>}
        </div>

        {/* Date */}
        <div className="ns-form-field">
          <label className="ns-label">Publish Date *</label>
          <input
            type="date"
            className={`ns-input ${errors.publishedAt ? 'ns-input--error' : ''}`}
            value={form.publishedAt}
            onChange={(e) => set('publishedAt', e.target.value)}
          />
          {errors.publishedAt && <p className="ns-input-error-text">{errors.publishedAt}</p>}
        </div>

        {/* Category */}
        <div className="ns-form-field">
          <label className="ns-label">Category</label>
          <select
            className="ns-input ns-input--select"
            value={form.category}
            onChange={(e) => set('category', e.target.value as StoryCategory)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Excerpt — full width */}
        <div className="ns-form-field ns-form-field--full">
          <label className="ns-label">Excerpt *</label>
          <textarea
            rows={2}
            className={`ns-input ${errors.excerpt ? 'ns-input--error' : ''}`}
            style={{ resize: 'vertical' }}
            value={form.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
            placeholder="A short summary shown in the newsletter listing…"
          />
          {errors.excerpt && <p className="ns-input-error-text">{errors.excerpt}</p>}
        </div>

        {/* Body — full width */}
        <div className="ns-form-field ns-form-field--full">
          <label className="ns-label">Full Story</label>
          <textarea
            rows={6}
            className="ns-input"
            style={{ resize: 'vertical' }}
            value={form.body}
            onChange={(e) => set('body', e.target.value)}
            placeholder="Full article content…"
          />
        </div>

        {/* Cover Image — full width */}
        <div className="ns-form-field ns-form-field--full">
          <label className="ns-label">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ns-input ns-input--file"
          />
          {form.imageUrl && (
            <div className="ns-image-preview-wrap">
              <img src={form.imageUrl} alt="Cover preview" className="ns-image-preview" />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="ns-form-footer">
        <button type="button" onClick={onCancel} className="ns-btn-cancel">
          Cancel
        </button>
        <button type="submit" className="ns-btn-submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function DeleteConfirm({ story, onConfirm, onCancel }: { story: Story; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="ns-delete-body">
      <p className="ns-delete-text">
        Are you sure you want to delete <strong>"{story.title}"</strong>?
        This action cannot be undone.
      </p>
      <div className="ns-delete-actions">
        <button onClick={onCancel} className="ns-btn-keep">
          Keep Story
        </button>
        <button onClick={onConfirm} className="ns-btn-delete">
          Delete
        </button>
      </div>
    </div>
  )
}

interface CardProps {
  story: Story
  onEdit: () => void
  onDelete: () => void
}

function StoryCard({ story, onEdit, onDelete }: CardProps) {
  const catColor = categoryColor[story.category]

  return (
    <div
      className="ns-card"
      style={{ '--cat-color': catColor, '--cat-bg': catColor + '18' } as React.CSSProperties}
    >
      {/* Cover image */}
      {story.imageUrl && (
        <div className="ns-card-image-wrap">
          <img src={story.imageUrl} alt={story.title} className="ns-card-image" />
        </div>
      )}

      {/* Content */}
      <div className="ns-card-content">
        {/* Meta row */}
        <div className="ns-card-meta-row">
          <span className="ns-card-badge">{story.category}</span>
        </div>

        {/* Title */}
        <h3 className="ns-card-title">{story.title}</h3>

        {/* Excerpt */}
        <p className="ns-card-excerpt">{story.excerpt}</p>

        {/* Author + date */}
        <div className="ns-card-footer">
          <span className="ns-card-author">{story.author}</span>
          <span className="ns-card-date">{formatDate(story.publishedAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="ns-card-actions">
        <button onClick={onEdit} className="ns-card-action-btn ns-card-action-btn--edit">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9.5 2L12 4.5L5 11.5H2.5V9L9.5 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          Edit
        </button>
        <button onClick={onDelete} className="ns-card-action-btn ns-card-action-btn--delete">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1M11.5 3.5l-.8 8.2a.5.5 0 0 1-.5.3H3.8a.5.5 0 0 1-.5-.3L2.5 3.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

// ─── Newsletter Stories Page ────────────────────────────────────────────────
// This page owns all CRUD for newsletter stories: list, search/filter,
// create, edit and delete. It's rendered by the Admin page (Admin.tsx),
// which passes in an `onBack` handler to return to the admin dashboard.

type ModalState =
  | { type: 'none' }
  | { type: 'create' }
  | { type: 'edit'; story: Story }
  | { type: 'delete'; story: Story }

interface NewsletterStoriesProps {
  onBack?: () => void
}

export function NewsletterStories({ onBack }: NewsletterStoriesProps) {
  const [stories, setStories] = useState<Story[]>(() => loadStoredStories())
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<'All' | StoryCategory>('All')
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false })

  useEffect(() => {
    const { projectSpotlights } = getNewsletterData()
    saveNewsletterData(stories.map(storyToNewsletterArticle), projectSpotlights)
  }, [stories])

  function showToast(msg: string) {
    setToast({ msg, visible: true })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000)
  }

  function handleCreate(data: Omit<Story, 'id'>) {
    setStories((s) => [{ id: uid(), ...data }, ...s])
    setModal({ type: 'none' })
    showToast('Story created.')
  }

  function handleEdit(data: Omit<Story, 'id'>) {
    if (modal.type !== 'edit') return
    setStories((s) => s.map((st) => (st.id === modal.story.id ? { id: modal.story.id, ...data } : st)))
    setModal({ type: 'none' })
    showToast('Story updated.')
  }

  function handleDelete() {
    if (modal.type !== 'delete') return
    setStories((s) => s.filter((st) => st.id !== modal.story.id))
    setModal({ type: 'none' })
    showToast('Story deleted.')
  }

  const filtered = stories.filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCategory === 'All' || s.category === filterCategory
    return matchSearch && matchCat
  })

  return (
    <div className="ns-page">
      <main className="ns-main">
        {/* Top bar */}
        <header className="ns-topbar">
          <div>
            {onBack && (
              <button onClick={onBack} className="ns-back-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2.5L3 6l4.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Admin
              </button>
            )}
            <h1 className="ns-title">Newsletter Stories</h1>
            <p className="ns-subtitle">{stories.length} stories total</p>
          </div>
          <button onClick={() => setModal({ type: 'create' })} className="ns-new-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New Story
          </button>
        </header>

        <div className="ns-content">
          {/* Filters */}
          <div className="ns-filters">
            {/* Search */}
            <div className="ns-search-wrap">
              <svg className="ns-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or author…"
                className="ns-search-input"
              />
            </div>

            {/* Category filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
              className="ns-category-select"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="ns-empty">
              <p className="ns-empty-title">No stories found</p>
              <p className="ns-empty-desc">
                {search || filterCategory !== 'All'
                  ? 'Try adjusting your search or filters.'
                  : 'Create your first story to get started.'}
              </p>
            </div>
          ) : (
            <div className="ns-grid">
              {filtered.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onEdit={() => setModal({ type: 'edit', story })}
                  onDelete={() => setModal({ type: 'delete', story })}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {modal.type === 'create' && (
        <Modal title="New Story" onClose={() => setModal({ type: 'none' })} wide>
          <StoryForm
            initial={emptyStory()}
            onSave={handleCreate}
            onCancel={() => setModal({ type: 'none' })}
            submitLabel="Create Story"
          />
        </Modal>
      )}

      {modal.type === 'edit' && (
        <Modal title="Edit Story" onClose={() => setModal({ type: 'none' })} wide>
          <StoryForm
            initial={modal.story}
            onSave={handleEdit}
            onCancel={() => setModal({ type: 'none' })}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {modal.type === 'delete' && (
        <Modal title="Delete Story" onClose={() => setModal({ type: 'none' })}>
          <DeleteConfirm
            story={modal.story}
            onConfirm={handleDelete}
            onCancel={() => setModal({ type: 'none' })}
          />
        </Modal>
      )}

      {/* Toast */}
      <div className={`ns-toast ${toast.visible ? 'ns-toast--visible' : ''}`}>{toast.msg}</div>
    </div>
  )
}