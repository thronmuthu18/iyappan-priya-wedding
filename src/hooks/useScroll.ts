import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrollY(y)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? y / docHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Setup IntersectionObserver for sections
    const sections = ['hero', 'couple', 'story', 'timeline', 'events', 'family', 'venue', 'rsvp']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-40% 0px -50% 0px' } // Trigger when section is in the middle of viewport
      )
      observer.observe(el)
      return { observer, el }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el)
      })
    }
  }, [])

  return { scrollY, scrollProgress, activeSection }
}
