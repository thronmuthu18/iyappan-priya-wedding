import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  placeholderSrc?: string
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-[#FAF7F2] rounded-md",
        className
      )}
    >
      {/* Placeholder / Shimmer blur */}
      {!isLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-[#E5E0DA] animate-pulse transition-opacity duration-500",
            placeholderSrc ? "bg-cover bg-center filter blur-lg scale-110" : ""
          )}
          style={placeholderSrc ? { backgroundImage: `url(${placeholderSrc})` } : {}}
        />
      )}

      {/* Main Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
          )}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}
