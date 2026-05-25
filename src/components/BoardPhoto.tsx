import { useState } from 'react'
import { publicAsset } from '../lib/publicAsset'

type BoardPhotoProps = {
  name: string
  image?: string
  className?: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function BoardPhoto({ name, image, className = '' }: BoardPhotoProps) {
  const [failed, setFailed] = useState(false)
  const resolvedSrc = image ? publicAsset(image) : undefined
  const showImage = resolvedSrc && !failed

  return (
    <div className={`board-photo ${className}`.trim()}>
      {showImage ? (
        <img src={resolvedSrc} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="board-photo__initials" aria-hidden="true">
          {getInitials(name)}
        </span>
      )}
    </div>
  )
}
