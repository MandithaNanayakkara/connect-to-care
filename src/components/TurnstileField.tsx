import { useEffect, useRef, useState } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

type TurnstileFieldProps = {
  onVerify: (token: string) => void
  onExpire?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback'?: () => void
        },
      ) => string
      remove: (id: string) => void
    }
  }
}

export function TurnstileField({ onVerify, onExpire }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    if (!SITE_KEY) return

    const existing = document.querySelector('script[src*="turnstile"]')
    if (existing) {
      setReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.onload = () => setReady(true)
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!ready || !SITE_KEY || !containerRef.current || !window.turnstile) return

    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: onVerify,
      'expired-callback': onExpire,
    })

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
      }
    }
  }, [ready, onVerify, onExpire])

  if (!SITE_KEY) return null

  return <div ref={containerRef} className="turnstile-field" />
}

export function isTurnstileEnabled() {
  return Boolean(SITE_KEY)
}
