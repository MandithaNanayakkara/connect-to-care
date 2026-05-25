import { useEffect } from 'react'

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN
const GA4_ID = import.meta.env.VITE_GA4_ID

export function AnalyticsScripts() {
  useEffect(() => {
    if (PLAUSIBLE_DOMAIN) {
      const s = document.createElement('script')
      s.defer = true
      s.dataset.domain = PLAUSIBLE_DOMAIN
      s.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(s)
    }

    if (GA4_ID) {
      const g = document.createElement('script')
      g.async = true
      g.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
      document.head.appendChild(g)

      window.dataLayer = window.dataLayer ?? []
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', GA4_ID)
    }
  }, [])

  return null
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}
