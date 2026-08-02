import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useSmoothScroll = () => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    // Sync scroll triggers with Lenis scroll events
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Add lenis RAF callback to GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)

    gsap.ticker.lagSmoothing(0)

    // Optional: Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
