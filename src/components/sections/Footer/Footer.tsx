import React from 'react'
import { Container } from '@/components/layout'
import { OrnamentalDivider } from '@/components/shared'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-dark text-text-inverse py-16 md:py-24 border-t border-border/10">
      <Container size="standard">
        <div className="flex flex-col items-center justify-center text-center space-y-8 select-none">
          
          {/* Calligraphic Monogram SVG */}
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-primary">
            {/* Intertwined 'A' */}
            <path
              d="M 32,75 L 50,25 L 68,75 M 38,55 L 62,55"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Intertwined 'J' */}
            <path
              d="M 42,32 L 58,32 M 50,32 L 50,72 Q 50,85 36,85"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Symmetrical Names */}
          <div className="space-y-2">
            <h2 className="font-script text-4xl sm:text-5xl text-primary">
              Aria & Julian
            </h2>
            <p className="font-sans text-[9px] tracking-[0.25em] text-text-secondary uppercase">
              FLORENCE • OCTOBER 24, 2026
            </p>
          </div>

          <OrnamentalDivider className="text-primary/30 w-32 h-4 my-2" />

          {/* Warm closing thank you note */}
          <p className="font-display italic text-base sm:text-lg text-accent-light/80 max-w-[420px] leading-relaxed">
            “With all our love, thank you for being a part of our story. We cannot wait to celebrate with you.”
          </p>

          {/* Copyright details */}
          <div className="pt-8 border-t border-border/5 w-full max-w-[320px] text-center space-y-1">
            <span className="font-sans text-[9px] tracking-widest text-text-secondary uppercase block">
              © 2026 Aria & Julian. All Rights Reserved.
            </span>
            <span className="font-sans text-[8px] text-text-secondary/40 uppercase block">
              Designed for a lifetime of love.
            </span>
          </div>

        </div>
      </Container>
    </footer>
  )
}
