import { useEffect, useState } from 'react'
import { Reveal } from '../components/Reveal'
import {
  AUDIT_REPORTS_DATA_CHANGED_EVENT,
  AUDIT_REPORTS_STORAGE_KEY,
  getAuditReportsData,
  type AuditReportItem,
} from '../data/auditReports'
import './AuditReports.css'

export function AuditReports() {
  const [reportItems, setReportItems] = useState<AuditReportItem[]>(() => getAuditReportsData())

  useEffect(() => {
    const syncReportItems = () => {
      setReportItems(getAuditReportsData())
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === AUDIT_REPORTS_STORAGE_KEY) {
        syncReportItems()
      }
    }

    const handleDataChange = () => {
      syncReportItems()
    }

    syncReportItems()
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(AUDIT_REPORTS_DATA_CHANGED_EVENT, handleDataChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(AUDIT_REPORTS_DATA_CHANGED_EVENT, handleDataChange)
    }
  }, [])

  return (
    <div className="audit-reports-page">
      <header className="audit-reports-hero">
        <div className="container">
          <p className="section-label">Audit Reports</p>
          <h1 className="display-title">Transparency, oversight and governance.</h1>
          <p className="audit-reports-hero__sub">
            Explore the documents that support accountability, financial stewardship, and
            institutional trust.
          </p>
        </div>
      </header>

      <Reveal as="section" className="section-pad">
        <div className="container">
          <div className="audit-reports-grid">
            {reportItems.map((item) => (
              <article key={item.title} className="audit-reports-card">
                <h2 className="audit-reports-card__title">{item.title}</h2>
                <p className="audit-reports-card__text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
