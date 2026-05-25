type IconProps = { className?: string }

export function HealthIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 4v16M8 8h8M6 12h12" strokeLinecap="round" />
      <path d="M4 12c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

export function NutritionIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" strokeLinecap="round" />
      <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChildIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="15" cy="7" r="2.5" />
      <path d="M5 18c0-2.5 2-4.5 4-4.5s4 2 4 4.5M11 18c0-2.5 2-4.5 4-4.5" strokeLinecap="round" />
    </svg>
  )
}

export function FinanceIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 20V8l8-4 8 4v12" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6M12 8v4" strokeLinecap="round" />
    </svg>
  )
}

export function AgricultureIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 18h16M6 18V10l6-4 6 4v8" strokeLinejoin="round" />
      <path d="M12 6v4M9 14h6" strokeLinecap="round" />
    </svg>
  )
}
