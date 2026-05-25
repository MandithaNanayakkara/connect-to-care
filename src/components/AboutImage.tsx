import { useState } from 'react'
import { publicAsset } from '../lib/publicAsset'

type AboutImageProps = {
  src?: string
  alt: string
  label?: string
  className?: string
}

export function AboutImage({ src, alt, label, className = '' }: AboutImageProps) {
  const [failed, setFailed] = useState(false)
  const resolvedSrc = src ? publicAsset(src) : undefined
  const showImage = resolvedSrc && !failed

  return (
    <figure className={`about-image ${className}`.trim()}>
      {showImage ? (
        <img src={resolvedSrc} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="about-image__placeholder" aria-hidden="true">
          <span className="about-image__pattern" />
          {label && <span className="about-image__label">{label}</span>}
        </div>
      )}
    </figure>
  )
}
