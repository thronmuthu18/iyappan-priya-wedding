import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '@/hooks'
import { cn } from '@/lib/cn'
import { useUIStore } from '@/store'

export const Navbar: React.FC = () => {
  const { scrollY, scrollProgress, activeSection } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage } = useUIStore()

  const isScrolled = scrollY > 80

  const leftLinks = [
    { id: 'story', label: { en: 'Our Story', ta: 'எங்கள் கதை' } },
    { id: 'events', label: { en: 'Events', ta: 'நிகழ்வுகள்' } },
    { id: 'countdown', label: { en: 'Countdown', ta: 'கவுண்ட்டவுன்' } },
  ]

  const rightLinks = [
    { id: 'family', label: { en: 'Family', ta: 'குடும்பம்' } },
    { id: 'rsvp', label: { en: 'RSVP', ta: 'பதிவு' } },
  ]

  const allLinks = [...leftLinks, ...rightLinks]

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleLanguage = () => {
    setLanguage(language === 'ta' ? 'en' : 'ta')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
        isScrolled
          ? 'backdrop-blur-md border-b h-16 md:h-20'
          : 'bg-transparent h-20 md:h-24',
      )}
      style={isScrolled ? { background: 'rgba(10,29,55,0.92)', borderColor: 'rgba(201,169,110,0.2)' } : {}}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(201,169,110,0.1)' }}>
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #A07850, #C9A96E, #F1E7D0)',
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between relative">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center space-x-8 w-1/3 justify-end">
          {leftLinks.map((link) => (
            <NavLink
              key={link.id}
              link={link}
              isScrolled={isScrolled}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              language={language}
            />
          ))}
        </nav>

        {/* Mobile left placeholder / Language Switcher */}
        <div className="w-1/3 md:hidden flex items-center">
          <button
            onClick={toggleLanguage}
            className="font-body text-[10px] font-semibold tracking-widest uppercase border py-1 px-2 rounded-sm"
            style={{ borderColor: 'rgba(201,169,110,0.3)', color: '#C9A96E' }}
          >
            {language === 'ta' ? 'EN' : 'தமிழ்'}
          </button>
        </div>

        {/* Center: Om Monogram */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center cursor-pointer select-none group"
          >
            <span
              className="font-serif leading-none transition-all duration-300 group-hover:scale-110"
              style={{
                fontSize: 22,
                color: '#C9A96E',
                filter: 'drop-shadow(0 0 8px rgba(201,169,110,0.5))',
              }}
            >
              ॐ
            </span>
            <span
              className={cn(
                'font-display text-sm tracking-[0.15em] font-light mt-0.5',
                isScrolled ? 'text-primary' : 'text-text-inverse',
              )}
            >
              I & P
            </span>
          </button>
        </div>

        {/* Right Nav */}
        <nav className="hidden md:flex items-center space-x-8 w-1/3 justify-start">
          {rightLinks.map((link) => (
            <NavLink
              key={link.id}
              link={link}
              isScrolled={isScrolled}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              language={language}
            />
          ))}
          <button
            onClick={toggleLanguage}
            className="font-body text-[10px] font-semibold tracking-widest uppercase border py-1 px-3 rounded-sm transition-all duration-300 hover:scale-105"
            style={{ borderColor: 'rgba(201,169,110,0.3)', color: '#C9A96E' }}
          >
            {language === 'ta' ? 'English' : 'தமிழ்'}
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center justify-end w-1/3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col space-y-1.5 cursor-pointer z-50 p-3 min-h-[48px] min-w-[48px] items-center justify-center touch-manipulation"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="w-6 h-[1.5px] block"
              style={{ background: isMenuOpen || !isScrolled ? '#FAF7F2' : '#C9A96E' }}
            />
            <motion.span
              animate={isMenuOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-[1.5px] block self-end"
              style={{ background: isMenuOpen || !isScrolled ? '#FAF7F2' : '#C9A96E' }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="h-[1.5px] block self-end"
              style={{ background: isMenuOpen || !isScrolled ? '#FAF7F2' : '#C9A96E' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[900] flex flex-col items-center justify-center pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
            style={{ background: 'rgba(6,15,30,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {/* Om symbol */}
            <div className="mb-6 text-primary" style={{ fontSize: 44, filter: 'drop-shadow(0 0 12px rgba(201,169,110,0.8))' }}>ॐ</div>
            {/* Tamil names */}
            <p className="font-tamil text-primary/60 text-sm mb-4">இயப்பன் & பிரியா</p>

            <nav className="flex flex-col items-center space-y-2">
              {allLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    'font-display text-xl tracking-widest text-text-inverse hover:text-primary transition-colors cursor-pointer py-2 px-4 min-h-[48px] touch-manipulation flex items-center justify-center relative',
                    activeSection === link.id && 'text-primary',
                  )}
                >
                  {link.label[language]}
                  {activeSection === link.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </motion.button>
              ))}
            </nav>

            <button
              onClick={toggleLanguage}
              className="mt-6 font-body text-xs font-semibold tracking-widest uppercase border py-3 px-6 min-h-[48px] touch-manipulation rounded-sm text-primary flex items-center justify-center"
              style={{ borderColor: 'rgba(201,169,110,0.3)' }}
            >
              {language === 'ta' ? 'Switch to English' : 'தமிழ் மொழிக்கு மாற்றவும்'}
            </button>

            <div className="mt-6 flex items-center space-x-3 text-primary/40">
              <span>✿</span><span>✦</span><span>✿</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ── Nav Link helper ──────────────────────────────────────────────
const NavLink: React.FC<{
  link: { id: string; label: { en: string; ta: string } }
  isScrolled: boolean
  activeSection: string
  scrollToSection: (id: string) => void
  language: 'ta' | 'en'
}> = ({ link, isScrolled, activeSection, scrollToSection, language }) => (
  <button
    onClick={() => scrollToSection(link.id)}
    className={cn(
      'relative font-body text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer pb-2',
      activeSection === link.id
        ? 'text-primary'
        : isScrolled
        ? 'text-text-inverse hover:text-primary'
        : 'text-text-inverse hover:text-primary',
    )}
  >
    {link.label[language]}
    {activeSection === link.id && (
      <motion.div
        layoutId="activeDot"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
      />
    )}
  </button>
)
