import React from 'react'
import { cn } from '@/lib/cn'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'standard' | 'reading'
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = 'standard',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8",
        size === 'standard' && "max-w-[1280px]",
        size === 'reading' && "max-w-[720px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
