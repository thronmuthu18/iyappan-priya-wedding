import React from 'react'
import { cn } from '@/lib/cn'

export interface OrnamentalDividerProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      className={cn("w-48 h-6 text-primary mx-auto my-8", className)}
      {...props}
    >
      <path
        d="M100 12 C 90 2, 70 2, 50 12 C 30 22, 10 22, 0 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 12 C 110 2, 130 2, 150 12 C 170 22, 190 22, 200 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="100" cy="12" r="3" fill="currentColor" />
      <path
        d="M95 12 C 95 9, 105 9, 105 12 C 105 15, 95 15, 95 12 Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  )
}
