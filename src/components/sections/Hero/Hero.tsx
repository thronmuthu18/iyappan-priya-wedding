import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'
import heroImg from '@/assets/hero_south_indian.jpg'

// ── Falling Flower Petals ────────────────────────────────────────
interface PetalProps { delay: number; left: number; duration: number; size: number; emoji: string }
const FallingPetal: React.FC<PetalProps> = ({ delay, left, duration, size, emoji }) => (
  <motion.div
    className="absolute pointer-events-none select-none z-30"
    style={{ left: `${left}%`, top: -30, fontSize: size, lineHeight: 1 }}
    initial={{ y: -30, opacity: 0, rotate: 0, x: 0 }}
    animate={{
      y: '110vh',
      opacity: [0, 1, 0.8, 0.4, 0],
      rotate: [0, 180, 360, 540, 720],
      x: [0, 20, -15, 25, -10],
    }}
    transition={{ duration, delay, ease: 'linear', repeat: Infinity, repeatDelay: duration * 0.5 }}
  >
    {emoji}
  </motion.div>
)

// ── Temple Bell Ornament ─────────────────────────────────────────
const TempleBell: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.div
    className={`text-primary ${className}`}
    initial={{ rotate: 0 }}
    animate={{ rotate: [-15, 15, -15] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{ transformOrigin: 'top center', display: 'inline-block' }}
  >
    🔔
  </motion.div>
)

// ── Golden Lamp (Kuthuvilakku) ───────────────────────────────────
const GoldenLamp: React.FC = () => (
  <motion.div
    className="flex flex-col items-center"
    animate={{
      filter: [
        'drop-shadow(0 0 8px rgba(201,169,110,0.7))',
        'drop-shadow(0 0 20px rgba(255,200,80,1.0))',
        'drop-shadow(0 0 8px rgba(201,169,110,0.7))',
      ],
    }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 60 80" width="48" height="64" className="text-primary">
      {/* Flame */}
      <motion.ellipse
        cx="30" cy="14" rx="5" ry="10"
        fill="#FFD700"
        animate={{ ry: [10, 14, 10], cy: [14, 11, 14] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        opacity="0.9"
      />
      <motion.ellipse
        cx="30" cy="15" rx="3" ry="6"
        fill="#FF8C00"
        animate={{ ry: [6, 9, 6] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        opacity="0.8"
      />
      {/* Wick */}
      <rect x="28.5" y="22" width="3" height="6" fill="#C9A96E" rx="1" />
      {/* Bowl */}
      <path d="M 15 28 Q 10 50 30 52 Q 50 50 45 28 Z" fill="#C9A96E" />
      <path d="M 15 28 Q 10 44 30 46 Q 50 44 45 28 Z" fill="#D4AF6E" opacity="0.5" />
      {/* Stand */}
      <rect x="27" y="52" width="6" height="20" fill="#A07850" rx="2" />
      {/* Base */}
      <ellipse cx="30" cy="72" rx="14" ry="4" fill="#A07850" />
    </svg>
  </motion.div>
)

// ── Luxury Gold Border ───────────────────────────────────────────
const GoldBorder: React.FC = () => (
  <div className="absolute inset-4 md:inset-8 pointer-events-none z-20 hidden sm:block">
    {/* Outer border */}
    <div className="absolute inset-0 border border-primary/30" />
    {/* Inner border offset */}
    <div className="absolute inset-3 border border-primary/15" />
    {/* Corner ornaments */}
    {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
      <div key={i} className={`absolute ${pos} w-8 h-8`}>
        <svg viewBox="0 0 30 30" className="w-full h-full text-primary/60">
          <path d="M 0 0 L 12 0 L 12 1.5 L 1.5 1.5 L 1.5 12 L 0 12 Z" fill="currentColor" />
          <path d="M 2 2 L 8 2 L 8 3 L 3 3 L 3 8 L 2 8 Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    ))}
  </div>
)

// ── Om Overlay (top center) ───────────────────────────────────────
const OmOverlay: React.FC = () => (
  <motion.div
    className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 0.8, scale: 1 }}
    transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
    style={{ filter: 'drop-shadow(0 0 12px rgba(201,169,110,0.8))' }}
  >
    <span className="text-primary font-serif" style={{ fontSize: 36, lineHeight: 1, display: 'block' }}>
      ॐ
    </span>
  </motion.div>
)

// ── Kolam / Mandala border bottom ───────────────────────────────
const KolamBorder: React.FC = () => (
  <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden h-16 opacity-20">
    <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="w-full h-full text-primary">
      {Array.from({ length: 24 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 50}, 0)`}>
          <circle cx="25" cy="32" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="25" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <path d="M 12 20 Q 25 8 38 20 Q 38 44 25 56 Q 12 44 12 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
    </svg>
  </div>
)

// ── Main Hero ────────────────────────────────────────────────────
export const Hero: React.FC = () => {
  const { scrollY } = useScroll()
  const { isLoaderVisible, language } = useUIStore()

  const bgY     = useTransform(scrollY, [0, 800], [0, 200])
  const bgScale = useTransform(scrollY, [0, 800], [1.02, 1.10])
  const textY   = useTransform(scrollY, [0, 800], [0, 100])
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const scrollToRSVP  = () => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToStory = () => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })

  const petalsConfig: PetalProps[] = [
    { delay: 0,   left: 5,  duration: 7, size: 14, emoji: '🌸' },
    { delay: 1.5, left: 18, duration: 9, size: 11, emoji: '✿'  },
    { delay: 3,   left: 30, duration: 8, size: 13, emoji: '🌼' },
    { delay: 0.8, left: 45, duration: 10,size: 10, emoji: '🌸' },
    { delay: 2.2, left: 58, duration: 7, size: 14, emoji: '✿'  },
    { delay: 1,   left: 72, duration: 9, size: 12, emoji: '🌼' },
    { delay: 4,   left: 85, duration: 8, size: 10, emoji: '🌸' },
    { delay: 2.8, left: 93, duration: 11,size: 13, emoji: '✿'  },
  ]

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const } },
  }
  const namesVariants = {
    hidden:  { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 } },
  }

  const couple = weddingConfig.couple
  const heroData = weddingConfig.hero

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#060F1E' }}
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 w-full h-full">
        <motion.img
          src={heroImg}
          alt="South Indian Hindu Wedding — Iyappan & Priya"
          variants={{ hidden: { scale: 1.12, filter: 'blur(16px)', opacity: 0 }, visible: { scale: 1.0, filter: 'blur(0px)', opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } } }}
          initial="hidden"
          animate={isLoaderVisible ? 'hidden' : 'visible'}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.55)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, #060F1E 0%, rgba(6,15,30,0.1) 45%, transparent 65%)' }} />
        <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(circle, transparent 25%, rgba(6,15,30,0.4) 100%)' }} />
        {/* Gold sun-ray center glow */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-25" style={{ background: 'radial-gradient(circle at center, rgba(255,210,100,0.7) 0%, transparent 60%)' }} />
      </motion.div>

      {/* Gold Luxury Border */}
      <GoldBorder />

      {/* Falling Flower Petals */}
      {!isLoaderVisible && petalsConfig.map((p, i) => <FallingPetal key={i} {...p} />)}

      {/* Om Symbol top center */}
      {!isLoaderVisible && <OmOverlay />}

      {/* Temple Bells — top corners */}
      {!isLoaderVisible && (
        <>
          <motion.div
            className="absolute top-6 left-8 z-20 hidden sm:flex flex-col items-center space-y-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <TempleBell delay={0} />
            <div className="w-[1px] h-8 bg-primary/20" />
          </motion.div>
          <motion.div
            className="absolute top-6 right-8 z-20 hidden sm:flex flex-col items-center space-y-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            <TempleBell delay={0.5} />
            <div className="w-[1px] h-8 bg-primary/20" />
          </motion.div>
        </>
      )}

      {/* Golden Lamp — right side */}
      {!isLoaderVisible && (
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 2, duration: 1.2 }}
        >
          <GoldenLamp />
        </motion.div>
      )}

      {/* Content Stack */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate={isLoaderVisible ? 'hidden' : 'visible'}
        className="relative z-20 text-center px-6 flex flex-col items-center max-w-[760px] select-none"
      >
        {/* Tamil / English blessing line */}
        <motion.span variants={itemVariants} className="font-tamil text-primary/80 text-sm mb-1 block">
          {language === 'ta' ? 'ஸ்ரீ கணேஷாய நமஃ' : 'Sri Ganeshay Namah'}
        </motion.span>

        {/* Overhead tag */}
        <motion.span
          variants={itemVariants}
          className="font-body text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-3 block"
          style={{ color: '#C9A96E' }}
        >
          {heroData.overheadTag[language]}
        </motion.span>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="font-display italic text-[16px] md:text-[20px] max-w-[480px] mb-8 font-light leading-relaxed"
          style={{ color: 'rgba(245,230,224,0.9)' }}
        >
          "{heroData.tagline[language]}"
        </motion.p>

        {/* Wedding Names */}
        <motion.h1
          variants={namesVariants}
          className="font-script mb-2"
          style={{
            fontSize: 'clamp(52px, 12vw, 116px)',
            lineHeight: 1.1,
            filter: 'drop-shadow(0 4px 20px rgba(201,169,110,0.35))',
          }}
        >
          <span style={{ color: '#0B1F4D', textShadow: '0 2px 10px rgba(255,255,255,0.9), 0 0 1px rgba(201,169,110,0.9)' }}>
            {couple.groom[language]}
          </span>
          <span className="mx-2" style={{ textShadow: 'none' }}>❤️</span>
          <span style={{ color: '#0B1F4D', textShadow: '0 2px 10px rgba(255,255,255,0.9), 0 0 1px rgba(201,169,110,0.9)' }}>
            {couple.bride[language]}
          </span>
        </motion.h1>

        {/* Dynamic language name transliteration under main title if needed */}
        {language === 'en' && (
          <motion.p
            variants={itemVariants}
            className="font-tamil text-primary/60 text-sm mb-6"
          >
            ஐயப்பன் & பிரியா
          </motion.p>
        )}

        {/* Date badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-3 font-body text-xs sm:text-sm tracking-[0.2em] uppercase py-3 px-6 mb-8"
          style={{
            borderTop: '1px solid rgba(201,169,110,0.2)',
            borderBottom: '1px solid rgba(201,169,110,0.2)',
            color: 'rgba(250,247,242,0.85)',
          }}
        >
          <span>{language === 'ta' ? 'அக்டோபர் 30, 2026' : 'October 30, 2026'}</span>
          <span style={{ color: '#C9A96E' }}>•</span>
          <span>{language === 'ta' ? 'திருமணம்' : 'Thirumanam'}</span>
          <span style={{ color: '#C9A96E' }}>•</span>
          <span>{language === 'ta' ? 'தமிழ் இந்து' : 'Tamil Hindu'}</span>
        </motion.div>

        {/* Marigold / jasmine decorative dots */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-3 mb-8 text-primary"
        >
          <span className="text-base opacity-60">✿</span>
          <span className="text-xl opacity-80">✦</span>
          <span className="text-base opacity-60">✿</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button variant="primary" onClick={scrollToRSVP} className="w-full sm:w-52">
            {language === 'ta' ? 'பதிவு செய்யவும்' : 'RSVP Now'}
          </Button>
          <Button
            variant="outline"
            onClick={scrollToStory}
            className="w-full sm:w-52 border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-bg-dark"
          >
            {language === 'ta' ? 'எங்கள் கதை' : 'Our Story'}
          </Button>
        </motion.div>
      </motion.div>

      {/* Kolam border at bottom */}
      <KolamBorder />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2, duration: 1.0 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(250,247,242,0.5)' }}>
          {language === 'ta' ? 'கீழே செல்லவும்' : 'Scroll'}
        </span>
        <div className="w-[1px] h-12 relative" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            animate={{ y: [0, 40], opacity: [0, 1, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-[2.5px] -top-[3px] w-1.5 h-1.5 rounded-full"
            style={{ background: '#C9A96E' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
