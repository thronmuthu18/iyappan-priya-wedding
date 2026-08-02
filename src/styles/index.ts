// Theme Tokens & Constants Specification

export const COLORS = {
  primary: '#C9A96E',
  primaryDark: '#A07850',
  primaryLight: '#F1E7D0',
  secondary: '#8A9E82',
  secondaryDark: '#5C7555',
  accent: '#E8C5B0',
  accentLight: '#F5E6E0',
  bgLight: '#FAF7F2',
  bgDark: '#2D2926',
  textPrimary: '#1A1714',
  textSecondary: '#5C5550',
  textInverse: '#FAF7F2',
  border: '#E2D9D0',
  borderAccent: '#C9A96E',
} as const

export const FONTS = {
  display: 'Cormorant Garamond, serif',
  body: 'DM Sans, sans-serif',
  script: 'Great Vibes, cursive',
} as const

export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const

export const EASINGS = {
  standard: 'cubic-bezier(0.25, 1, 0.5, 1)',
  decelerate: 'cubic-bezier(0.16, 1, 0.3, 1)',
  transition: 'cubic-bezier(0.76, 0, 0.24, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const GSAP_EASES = {
  standard: 'power3.out',
  decelerate: 'power4.out',
  bounce: 'back.out(1.7)',
  linear: 'none',
} as const
