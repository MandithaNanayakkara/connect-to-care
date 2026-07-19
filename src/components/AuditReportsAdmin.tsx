import { useState } from 'react'
import { getAuditReportsData, saveAuditReportsData, type AuditReportItem } from '../data/auditReports'

interface AuditReportsAdminProps {
  onBack: () => void
}

export function AuditReportsAdmin({ onBack }: AuditReportsAdminProps) {
  const [items, setItems] = useState<AuditReportItem[]>(() => getAuditReportsData())
  const [saved, setSaved] = useState(false)

  function updateItem(index: number, field: keyof AuditReportItem, value: string) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    )
    setSaved(false)
  }

  function addItem() {
    setItems((current) => [...current, { title: '', text: '', href: '/about' }])
    setSaved(false)
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))
    setSaved(false)
  }

  function handleSave() {
    saveAuditReportsData(items)
    setSaved(true)
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
            Audit Reports & Policies
          </h1>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>
            Update the report section content shown on the public Audit Reports page.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={addItem}
            style={{
              padding: '10px 20px',
              borderRadius: 9,
              border: '1px solid #0a2540',
              background: '#fff',
              color: '#0a2540',
              cursor: 'pointer',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Add report
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '10px 20px',
              borderRadius: 9,
              border: 'none',
              background: '#0a2540',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Save changes
          </button>
        </div>
      </header>

      <div style={{ padding: '28px 32px', display: 'grid', gap: 18 }}>
        {items.map((item, index) => (
          <section
            key={`audit-report-${index}`}
            style={{
              background: '#fff',
              border: '1px solid #e8ecf1',
              borderRadius: 16,
              display: 'grid',
              gap: 12,
              padding: 20,
            }}
          >
            <label style={{ fontWeight: 600, color: '#0a2540' }}>Title</label>
            <input
              value={item.title}
              onChange={(e) => updateItem(index, 'title', e.target.value)}
              style={{
                width: '100%',
                border: '1.5px solid #dde3ea',
                borderRadius: 8,
                padding: '9px 12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            />

            <label style={{ fontWeight: 600, color: '#0a2540' }}>Description</label>
            <textarea
              rows={3}
              value={item.text}
              onChange={(e) => updateItem(index, 'text', e.target.value)}
              style={{
                width: '100%',
                border: '1.5px solid #dde3ea',
                borderRadius: 8,
                padding: '9px 12px',
                resize: 'vertical',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #b42318',
                  background: '#fff',
                  color: '#b42318',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Remove
              </button>
            </div>
          </section>
        ))}

        {saved && (
          <div
            style={{
              background: '#d8f3ec',
              color: '#0d7c66',
              borderRadius: 10,
              padding: '10px 12px',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Audit report content updated successfully.
          </div>
        )}
      </div>
    </div>
  )
}
