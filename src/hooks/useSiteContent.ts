import { useEffect, useState } from 'react'
import { publicAsset } from '../lib/publicAsset'

export type SiteContent = {
  hero: {
    anchor: string
    headline: string
    headlineAccent: string
    tapestry: string
    subline: string
    ctaPrimary: string
    ctaSecondary: string
  }
  stats: Array<{ value: string; label: string; highlight?: boolean }>
}

const fallback: SiteContent = {
  hero: {
    anchor: 'Toward One Billion',
    headline: 'Where purpose meets ',
    headlineAccent: 'strategy.',
    tapestry: 'Weaving corporations, non-profits and government into a tapestry',
    subline:
      'We bring ecosystems together so governments and development partners can deliver impact at scale.',
    ctaPrimary: 'Partner with us',
    ctaSecondary: 'How it works',
  },
  stats: [
    { value: '6+', label: 'Multilateral partners engaged', highlight: true },
    { value: '4', label: 'Ministries aligned on DPI', highlight: false },
    { value: '1B', label: 'Lives — our ambition', highlight: true },
  ],
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallback)

  useEffect(() => {
    fetch(publicAsset('/content/site.json'))
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: SiteContent) => setContent(data))
      .catch(() => {})
  }, [])

  return content
}
