export type AuditReportItem = {
  title: string
  text: string
  href: string
}

export const AUDIT_REPORTS_STORAGE_KEY = 'connect-to-care-audit-reports-data'
export const AUDIT_REPORTS_DATA_CHANGED_EVENT = 'connect-to-care-audit-reports-data-changed'

export const DEFAULT_AUDIT_REPORT_ITEMS: AuditReportItem[] = [
  {
    title: 'Annual audited accounts',
    text: 'Access the latest audited financial statements and governance disclosures.',
    href: '/about',
  },
  {
    title: 'Policies and governance',
    text: 'Review the core governance documents that guide how we operate and deliver impact.',
    href: '/about',
  },
]

function loadStoredAuditReportsData(): AuditReportItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_AUDIT_REPORT_ITEMS
  }

  const stored = window.localStorage.getItem(AUDIT_REPORTS_STORAGE_KEY)
  if (!stored) {
    return DEFAULT_AUDIT_REPORT_ITEMS
  }

  try {
    const parsed = JSON.parse(stored) as AuditReportItem[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AUDIT_REPORT_ITEMS
  } catch {
    return DEFAULT_AUDIT_REPORT_ITEMS
  }
}

export function getAuditReportsData() {
  return loadStoredAuditReportsData()
}

export function saveAuditReportsData(items: AuditReportItem[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AUDIT_REPORTS_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent(AUDIT_REPORTS_DATA_CHANGED_EVENT, { detail: items }))
}
