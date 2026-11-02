import type { ReactNode } from 'react'

// Small stroke icons for the route search card. Decorative only: every icon
// is aria-hidden and sits next to visible text.
interface IconProps {
  className?: string
}

function StrokeIcon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? 'route-icon'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </StrokeIcon>
  )
}

export function SwapIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m16 3 4 4-4 4" />
      <path d="M20 7H4" />
      <path d="m8 21-4-4 4-4" />
      <path d="M4 17h16" />
    </StrokeIcon>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </StrokeIcon>
  )
}

export function BoltIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </StrokeIcon>
  )
}

export function DoorIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 21h18" />
      <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
      <path d="M14 12h.01" />
    </StrokeIcon>
  )
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </StrokeIcon>
  )
}

export function MinusIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 12h14" />
    </StrokeIcon>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </StrokeIcon>
  )
}
