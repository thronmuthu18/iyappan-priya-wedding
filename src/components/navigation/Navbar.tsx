import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '@/hooks'
import { cn } from '@/lib/cn'

export const Navbar: React.FC = () => {
  const { scrollY, scrollProgress, activeSection } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isScrolled = scrollY > 80

  const leftLinks = [
    { id: 'story', label: 'Our Story' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'events', label: 'Events' },
  ]

  const rightLinks = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'venue', label: 'Venue' },
    { id: 'rsvp', label: 'RSVP' },
  ]

  const allLinks = [...leftLinks, ...rightLinks]

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
        isScrolled
          ? "bg-bg-light/85 backdrop-blur-md border-b border-border h-16 md:h-20"
          : "bg-transparent h-20 md:h-24"
      )}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/20">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between relative">
        {/* Left Side: Empty placeholder on mobile, Desktop links */}
        <nav className="hidden md:flex items-center space-x-8 w-1/3 justify-end">
          {leftLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "relative font-body text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer pb-2",
                activeSection === link.id
                  ? "text-primary"
                  : isScrolled
                  ? "text-text-primary hover:text-primary"
                  : "text-text-inverse hover:text-primary"
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </nav>
        <div className="w-1/3 md:hidden flex items-center">
          {/* Left indicator placeholder / Music trigger placeholder */}
          <div className="w-6 h-6 text-primary" />
        </div>

        {/* Center: Monogram Logo */}
        <div className="flex items-center justify-center w-1/3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
              "font-display text-2xl tracking-[0.2em] font-light cursor-pointer select-none",
              isScrolled ? "text-primary" : "text-text-inverse"
            )}
          >
            A & J
          </button>
        </div>

        {/* Right Side: Hamburger on mobile, Desktop links */}
        <nav className="hidden md:flex items-center space-x-8 w-1/3 justify-start">
          {rightLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "relative font-body text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer pb-2",
                activeSection === link.id
                  ? "text-primary"
                  : isScrolled
                  ? "text-text-primary hover:text-primary"
                  : "text-text-inverse hover:text-primary"
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger menu */}
        <div className="md:hidden flex items-center justify-end w-1/3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col space-y-1.5 cursor-pointer z-50 p-2"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className={cn(
                "w-6 h-[1.5px] block transition-colors",
                isMenuOpen || !isScrolled ? "bg-text-inverse" : "bg-text-primary"
              )}
            />
            <motion.span
              animate={isMenuOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-4 h-[1.5px] block self-end transition-colors",
                isMenuOpen || !isScrolled ? "bg-text-inverse" : "bg-text-primary"
              )}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className={cn(
                "h-[1.5px] block self-end transition-colors",
                isMenuOpen || !isScrolled ? "bg-text-inverse" : "bg-text-primary"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-bg-dark/95 backdrop-blur-lg z-[900] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-6">
              {allLinks.map((link, index) => (
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "font-display text-2xl tracking-widest text-text-inverse hover:text-primary transition-colors cursor-pointer pb-1 relative",
                    activeSection === link.id && "text-primary"
                  )}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
