import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/cn'

export interface SectionProps extends HTMLMotionProps<'section'> {
  animate?: boolean
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, className, children, animate = true, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        initial={animate ? { opacity: 0, y: 32 } : {}}
        whileInView={animate ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "py-16 md:py-28 lg:py-40 relative overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </motion.section>
    )
  }
)

Section.displayName = 'Section'
