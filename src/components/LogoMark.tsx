import { publicAsset } from '../lib/publicAsset'
import './LogoMark.css'

const LOGO_SRC = publicAsset('/logo/connect-to-care-logo.jpeg')

type LogoMarkProps = {
  className?: string
  variant?: 'full' | 'mark'
}

export function LogoMark({ className = '', variant = 'full' }: LogoMarkProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="Connect To Care"
      className={`site-logo site-logo--${variant}${className ? ` ${className}` : ''}`}
      width={variant === 'mark' ? 48 : 220}
      height={variant === 'mark' ? 48 : 48}
      decoding="async"
    />
  )
}
