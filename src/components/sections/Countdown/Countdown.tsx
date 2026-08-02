import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine, AtmosphericBackground } from '@/components/shared'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

interface TimeLeft {
  days:    number
  hours:   number
  minutes: number
  seconds: number
}

const WEDDING_DATE = new Date('2026-10-30T08:00:00+05:30').getTime()

const calculateTimeLeft = (): TimeLeft => {
  const diff = WEDDING_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

// ── Animated Number Block ────────────────────────────────────────
const TimeBlock: React.FC<{ value: number; label: string; tamilLabel: string; index: number; lang: 'ta' | 'en' }> = ({
  value, label, tamilLabel, index, lang
}) => {
  const [prev, setPrev] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setIsFlipping(true)
      const t = setTimeout(() => { setPrev(value); setIsFlipping(false) }, 300)
      return () => clearTimeout(t)
    }
  }, [value, prev])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      {/* Number card */}
      <div
        className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 flex items-center justify-center rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0A1D37 0%, #1A3A6A 100%)',
          border: '1px solid rgba(201,169,110,0.3)',
          boxShadow: '0 0 30px rgba(201,169,110,0.1)',
        }}
      >
        {/* Top separator line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2" style={{ background: 'rgba(201,169,110,0.15)' }} />

        <AnimatePresence mode="wait">
          <motion.span
            key={`${label}-${isFlipping}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="font-display tabular-nums font-light"
            style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #C9A96E, #F1E7D0, #A07850)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>

        {/* Corner ornaments */}
        <div className="absolute top-1.5 left-1.5 text-primary/20 text-[8px]">✦</div>
        <div className="absolute top-1.5 right-1.5 text-primary/20 text-[8px]">✦</div>
        <div className="absolute bottom-1.5 left-1.5 text-primary/20 text-[8px]">✦</div>
        <div className="absolute bottom-1.5 right-1.5 text-primary/20 text-[8px]">✦</div>
      </div>

      {/* Labels based on language selection */}
      <span className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold mt-2 text-text-secondary">
        {lang === 'ta' ? tamilLabel : label}
      </span>
    </motion.div>
  )
}

// ── Lamp Row Decoration ──────────────────────────────────────────
const LampRow: React.FC = () => (
  <div className="flex items-end justify-center space-x-4 mb-8 opacity-70">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="text-2xl"
        animate={{ filter: ['drop-shadow(0 0 4px rgba(255,200,80,0.5))', 'drop-shadow(0 0 12px rgba(255,200,80,1.0))', 'drop-shadow(0 0 4px rgba(255,200,80,0.5))'] }}
        transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
      >
        🪔
      </motion.span>
    ))}
  </div>
)

// ── Main Countdown ───────────────────────────────────────────────
export const Countdown: React.FC = () => {
  const { language } = useUIStore()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const blocks = [
    { label: 'Days',    tamilLabel: 'நாட்கள்',  value: timeLeft.days    },
    { label: 'Hours',   tamilLabel: 'மணிகள்',   value: timeLeft.hours   },
    { label: 'Minutes', tamilLabel: 'நிமிடங்கள்', value: timeLeft.minutes },
    { label: 'Seconds', tamilLabel: 'வினாடிகள்', value: timeLeft.seconds },
  ]

  const isWeddingDay = WEDDING_DATE - Date.now() <= 0
  const cData = weddingConfig.countdown

  return (
    <Section
      ref={sectionRef}
      id="countdown"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <AtmosphericBackground type="countdown" targetRef={sectionRef} />
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary"
            style={{
              left: `${(i * 43 + 8) % 100}%`,
              top:  `${(i * 67 + 5) % 100}%`,
              fontSize: 32,
            }}
          >
            ✿
          </div>
        ))}
      </div>

      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 65%)' }}
      />

      <Container size="standard">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center relative z-10">

          {/* Lamps */}
          <LampRow />

          {/* Tamil/English headings */}
          <p className="font-tamil text-primary/60 text-sm mb-2">
            {language === 'ta' ? 'திருமணம் வரை' : 'The Wedding Countdown'}
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] text-text-secondary/70 uppercase block mb-2">
            {language === 'ta' ? 'மங்களத் திருநாள்' : 'THE SACRED COUNTDOWN'}
          </span>
          <h2 className="font-display font-light mb-4" style={{ fontSize: 'clamp(28px, 6vw, 48px)', color: '#C9A96E' }}>
            {cData.label[language]}
          </h2>

          <GoldLine className="mx-auto" />

          {/* Time grid */}
          {isWeddingDay ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="my-12 text-center"
            >
              <span className="text-6xl mb-4 block">🎊</span>
              <p className="font-script text-4xl text-primary mb-2">
                {language === 'ta' ? 'இன்று திருமண நாள்!' : 'Today is the Wedding Day!'}
              </p>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-3 sm:space-x-6 my-10">
              {blocks.map((block, i) => (
                <React.Fragment key={block.label}>
                  <TimeBlock {...block} index={i} lang={language} />
                  {i < blocks.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="font-display text-3xl font-light pb-6"
                      style={{ color: 'rgba(201,169,110,0.5)' }}
                    >
                      :
                    </motion.span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Date detail */}
          <span className="font-body text-xs tracking-widest uppercase mt-4" style={{ color: '#A07850' }}>
            {language === 'ta'
              ? 'அக்டோபர் 30, 2026 • திருமணம் • தமிழ் இந்து திருமணம்'
              : 'OCTOBER 30, 2026 • THIRUMANAM • TAMIL HINDU WEDDING'}
          </span>

          {/* Decorative row */}
          <div className="flex items-center space-x-3 mt-8 text-primary/30">
            <span className="text-sm">✿</span>
            <div className="w-16 h-[1px] bg-primary/20" />
            <span className="text-base">ॐ</span>
            <div className="w-16 h-[1px] bg-primary/20" />
            <span className="text-sm">✿</span>
          </div>
        </div>
      </Container>
    </Section>
  )
}
