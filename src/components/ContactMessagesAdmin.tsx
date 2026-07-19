import { getContactMessages } from '../data/contactMessages'

interface ContactMessagesAdminProps {
  onBack: () => void
}

export function ContactMessagesAdmin({ onBack }: ContactMessagesAdminProps) {
  const messages = getContactMessages()

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <button
            type="button"
            onClick={onBack}
            style={{
              border: 'none',
              background: 'none',
              color: '#0d7c66',
              cursor: 'pointer',
              padding: 0,
              marginBottom: 6,
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            ← Back to Admin
          </button>
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
            Contact Messages
          </h1>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>
            View the latest messages sent through the public contact form.
          </p>
        </div>
      </header>

      <div style={{ padding: '28px 32px', display: 'grid', gap: 18 }}>
        {messages.length === 0 ? (
          <div
            style={{
              background: '#fff',
              border: '1px solid #e8ecf1',
              borderRadius: 16,
              padding: 24,
              color: '#64748b',
              fontSize: 14,
            }}
          >
            No messages have been received yet.
          </div>
        ) : (
          messages.map((message, index) => (
            <section
              key={`${message.email}-${message.submittedAt}-${index}`}
              style={{
                background: '#fff',
                border: '1px solid #e8ecf1',
                borderRadius: 16,
                padding: 20,
                display: 'grid',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <strong style={{ color: '#0a2540' }}>{message.name}</strong>
                <span style={{ color: '#64748b', fontSize: 13 }}>• {message.organisation}</span>
                <span style={{ color: '#64748b', fontSize: 13 }}>• {message.role}</span>
              </div>

              <div style={{ color: '#475569', fontSize: 13 }}>
                <div><strong>Email:</strong> {message.email}</div>
                <div><strong>Received:</strong> {new Date(message.submittedAt).toLocaleString()}</div>
              </div>

              <div
                style={{
                  color: '#334155',
                  fontSize: 14,
                  lineHeight: 1.7,
                  background: '#f8fafc',
                  borderRadius: 10,
                  padding: 14,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message.message}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
