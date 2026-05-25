import { useEffect, useRef, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
  as?: 'div' | 'section' | 'article'
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  id,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
