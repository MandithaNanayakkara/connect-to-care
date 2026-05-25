type EventParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventParams }) => void
    gtag?: (...args: unknown[]) => void
  }
}

/** Track custom events — Plausible (preferred) or GA4 when configured via env. */
export function trackEvent(name: string, params?: EventParams) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, params)
  }

  if (typeof window.plausible === 'function') {
    window.plausible(name, params ? { props: params } : undefined)
    return
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

export function trackOutboundLink(url: string, label: string) {
  trackEvent('outbound_click', { url, label })

  if (typeof window.plausible === 'function') {
    window.plausible('Outbound Link: Click', { props: { url } })
  }
}
