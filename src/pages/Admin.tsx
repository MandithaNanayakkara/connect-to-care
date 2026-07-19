import { useEffect, useState } from 'react'
import { NewsletterStories } from '../components/Newsletterstories'
import { AuditReportsAdmin } from '../components/AuditReportsAdmin'
import { ContactMessagesAdmin } from '../components/ContactMessagesAdmin'
import './Admin.css'

type Section = 'dashboard' | 'newsletter-stories' | 'audit-reports' | 'contact-messages'

const ADMIN_USERNAME = 'info@connecttocare.co'
const ADMIN_PASSWORD = 'Care#321*$'
const ADMIN_AUTH_STORAGE_KEY = 'connect-to-care-admin-auth'

interface SectionCardProps {
  title: string
  description: string
  onClick: () => void
}

function SectionCard({ title, description, onClick }: SectionCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'left',
        background: '#fff',
        border: hovered ? '1.5px solid #0a2540' : '1.5px solid #e8ecf1',
        borderRadius: 14,
        padding: '22px 24px',
        cursor: 'pointer',
        transition: 'border-color 0.18s, box-shadow 0.18s, transform 0.18s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(10,37,64,0.1)' : '0 1px 4px rgba(10,37,64,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 20,
          fontWeight: 600,
          color: '#0a2540',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5,
          color: '#64748b',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5,
          fontWeight: 600,
          color: '#0d7c66',
          marginTop: 6,
        }}
      >
        Open →
      </span>
    </button>
  )
}

export function Admin() {
  const [section, setSection] = useState<Section>('dashboard')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, String(isAuthenticated))
    }
  }, [isAuthenticated])

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedUsername = username.trim()
    const normalizedPassword = password.trim()

    if (!normalizedUsername || !normalizedPassword) {
      setLoginError('Please enter both a username and password.')
      return
    }

    if (normalizedUsername === ADMIN_USERNAME && normalizedPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError('')
      setPassword('')
      return
    }

    setLoginError('Incorrect username or password.')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setSection('dashboard')
    setUsername('')
    setPassword('')
    setLoginError('')
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-page admin-page--login">
        <div className="admin-login-card">
          <div className="admin-login-card__header">
            <p className="admin-login-card__eyebrow">Restricted area</p>
            <h1>Admin login</h1>
            <p>Sign in to access the Connect to Care admin dashboard.</p>
          </div>

          <form className="admin-login-form" onSubmit={handleLogin}>
            <label>
              <span>Username</span>
              <input
                type="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="your email address"
                autoComplete="username"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </label>

            {loginError ? <p className="admin-login-form__error">{loginError}</p> : null}

            <button type="submit" className="btn btn--primary">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (section === 'newsletter-stories') {
    return <NewsletterStories onBack={() => setSection('dashboard')} />
  }

  if (section === 'audit-reports') {
    return <AuditReportsAdmin onBack={() => setSection('dashboard')} />
  }

  if (section === 'contact-messages') {
    return <ContactMessagesAdmin onBack={() => setSection('dashboard')} />
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f4f9',
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: 'calc(var(--header-height) + 1.5rem)',
      }}
    >
      <header
        style={{
          padding: '16px 32px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 26,
                fontWeight: 600,
                color: '#0a2540',
                lineHeight: 1.1,
              }}
            >
              Admin
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>
              Manage site content
            </p>
          </div>

          <button type="button" className="btn btn--secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <div style={{ padding: '28px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          <SectionCard
            title="Newsletter Stories"
            description="Create, edit, and manage the stories that appear in the newsletter."
            onClick={() => setSection('newsletter-stories')}
          />
          <SectionCard
            title="Audit Reports & Policies"
            description="Update the audited accounts and policies section shown on the public audit report page."
            onClick={() => setSection('audit-reports')}
          />
          <SectionCard
            title="Contact Messages"
            description="Review messages submitted from the public Connect page."
            onClick={() => setSection('contact-messages')}
          />
        </div>
      </div>
    </div>
  )
}