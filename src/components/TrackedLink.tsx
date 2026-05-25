import { type AnchorHTMLAttributes, type ReactNode } from 'react'
import { trackOutboundLink } from '../lib/analytics'

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  trackLabel: string
}

export function TrackedLink({
  children,
  trackLabel,
  href,
  onClick,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={(e) => {
        if (href) trackOutboundLink(href, trackLabel)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
