import { useEffect } from 'react'
import { publicAsset } from '../lib/publicAsset'

export type PageMetaProps = {
  title: string
  description: string
  path?: string
  image?: string
}

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://connecttocare.co'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`
const FALLBACK_IMAGE = publicAsset('/og-image.svg')

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function PageMeta({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
}: PageMetaProps) {
  const ogImage = import.meta.env.PROD ? image : FALLBACK_IMAGE
  const fullTitle = title.includes('Connect To Care') ? title : `${title} | Connect To Care`
  const url = `${SITE_URL}${path}`

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [fullTitle, description, url, ogImage])

  return null
}
