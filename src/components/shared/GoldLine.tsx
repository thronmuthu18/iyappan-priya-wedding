import React from 'react'
import { cn } from '@/lib/cn'

export interface GoldLineProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const GoldLine: React.FC<GoldLineProps> = ({ className, ...props }) => {
  return (
    <div className={cn("flex items-center justify-center my-6", className)} {...props}>
      <div className="h-[1px] bg-primary w-24" />
      <div className="w-2 h-2 rotate-45 border border-primary mx-3 bg-primary" />
      <div className="h-[1px] bg-primary w-24" />
    </div>
  )
}
