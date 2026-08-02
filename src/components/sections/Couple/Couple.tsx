import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { LazyImage, GoldLine, AtmosphericBackground } from '@/components/shared'
import { weddingConfig } from '@/config/wedding.config'
import { useUIStore } from '@/store'
import brideImg from '@/assets/bride_portrait.png'
import groomImg from '@/assets/groom_portrait.png'

// ── Portrait Frame ───────────────────────────────────────────────
const PortraitFrame: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative w-full max-w-[300px] aspect-[3/4] mb-8 group z-10">
    {/* Outer gold border */}
    <div
      className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]"
      style={{ border: '2px solid rgba(201,169,110,0.4)' }}
    />
    {/* Inner offset */}
    <div
      className="absolute inset-3 transition-transform duration-500 group-hover:scale-[0.97]"
      style={{ border: '1px solid rgba(201,169,110,0.2)' }}
    />
    {/* Corner ornaments */}
    {['top-2 left-2', 'top-2 right-2 rotate-90', 'bottom-2 right-2 rotate-180', 'bottom-2 left-2 -rotate-90'].map((pos, i) => (
      <div key={i} className={`absolute ${pos} w-5 h-5 text-primary/50`}>
        <svg viewBox="0 0 20 20" className="w-full h-full">
          <path d="M 0 0 L 8 0 L 8 1 L 1 1 L 1 8 L 0 8 Z" fill="currentColor" />
        </svg>
      </div>
    ))}
    <LazyImage
      src={src}
      alt={alt}
      className="w-full h-full object-cover grayscale-[10%] transition-all duration-700 group-hover:grayscale-0 rounded-none"
    />
    {/* Warm vignette overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(6,15,30,0.3) 100%)' }}
    />
  </div>
)

// ── Jasmine Divider ──────────────────────────────────────────────
const JasmineDivider: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 my-3">
    <span className="text-primary/50 text-xs">🌼</span>
    <div className="w-12 h-[1px] bg-primary/30" />
    <span className="text-primary text-sm">✦</span>
    <div className="w-12 h-[1px] bg-primary/30" />
    <span className="text-primary/50 text-xs">🌼</span>
  </div>
)

// ── Main Couple Section ──────────────────────────────────────────
export const Couple: React.FC = () => {
  const { language } = useUIStore()
  const sectionRef = useRef<HTMLElement>(null)

  const cardVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: custom * 0.2 },
    }),
  }

  const couple = weddingConfig.couple
  const parents = weddingConfig.parents
  const intro = weddingConfig.introduction

  const bios = {
    bride: {
      en: "With grace in every step and warmth in every glance, Priya embodies the beauty of Tamil tradition. Her heart is full of devotion, her smile lights every room, and her love for family is the foundation of her world.",
      ta: "அன்பும் அடக்கமும் நிறைந்த குணவதியான பிரியா, குடும்பத்தின் தூணாக விளங்கி இல்லறத்தை ஒளிரச் செய்யவிருக்கிறார்.",
    },
    groom: {
      en: "Steadfast as a temple pillar, gentle as the evening veena — Iyappan carries the strength of his heritage and the tenderness of a devoted heart. His love for Priya is written in every prayer and every breath.",
      ta: "நம்பிக்கையும் பண்பும் கொண்ட இயப்பன், குடும்பப் பொறுப்புகளை உணர்ந்து இல்லறப் பயணத்தை நன்முறையில் நடத்தவிருக்கிறார்.",
    },
  }

  return (
    <Section ref={sectionRef} id="couple" className="py-20 md:py-36 relative overflow-hidden" style={{ background: 'transparent' }}>
      <AtmosphericBackground type="couple" targetRef={sectionRef} />
      <Container size="standard" className="relative z-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          {/* Tamil/English labels */}
          <p className="font-tamil text-primary/60 text-sm mb-2">
            {language === 'ta' ? 'மணமக்கள் அறிமுகம்' : 'Introducing the Couple'}
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {language === 'ta' ? 'தம்பதிகள் அறிமுகம்' : 'BRIDE & GROOM'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {language === 'ta' ? 'மணமக்கள்' : 'Bride & Groom'}
          </h2>
          <GoldLine className="mx-auto" />

          {/* Introduction blessing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-[600px] mx-auto text-center space-y-2"
          >
            <p className="font-tamil text-primary/70 text-sm">
              {intro.blessing[language]}
            </p>
            <p className="font-display italic text-lg text-text-secondary">
              "{intro.message[language]}"
            </p>
          </motion.div>
        </div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 relative max-w-[1024px] mx-auto items-start">
          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2" style={{ background: 'rgba(201,169,110,0.3)' }} />
          {/* Vertical divider Om */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-primary/30" style={{ fontSize: 24 }}>ॐ</div>

          {/* Bride */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={cardVariants}
            className="flex flex-col items-center text-center px-4 md:px-10"
          >
            <PortraitFrame src={brideImg} alt={`${couple.bride[language]} — The Bride`} />

            <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-2 block" style={{ color: '#800020' }}>
              {language === 'ta' ? 'மணப்பெண்' : 'THE BRIDE'}
            </span>
            <h3 className="font-display text-3xl text-text-primary mb-1">
              {couple.bride[language]}
            </h3>
            <span className="font-body text-[11px] tracking-wide text-text-secondary italic mb-4 block">
              {language === 'ta'
                ? `${parents.bride.father} & ${parents.bride.mother} அவர்களின் புதல்வி`
                : `Daughter of ${parents.bride.father} & ${parents.bride.mother}`}
            </span>
            <JasmineDivider />
            <p className="font-body text-xs text-text-secondary leading-relaxed max-w-[320px] mt-2">
              {bios.bride[language]}
            </p>
          </motion.div>

          {/* Groom */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={cardVariants}
            className="flex flex-col items-center text-center px-4 md:px-10"
          >
            <PortraitFrame src={groomImg} alt={`${couple.groom[language]} — The Groom`} />

            <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-2 block" style={{ color: '#0A1D37' }}>
              {language === 'ta' ? 'மணமகன்' : 'THE GROOM'}
            </span>
            <h3 className="font-display text-3xl text-text-primary mb-1">
              {couple.groom[language]}
            </h3>
            <span className="font-body text-[11px] tracking-wide text-text-secondary italic mb-4 block">
              {language === 'ta'
                ? `${parents.groom.father} & ${parents.groom.mother} அவர்களின் புதல்வன்`
                : `Son of ${parents.groom.father} & ${parents.groom.mother}`}
            </span>
            <JasmineDivider />
            <p className="font-body text-xs text-text-secondary leading-relaxed max-w-[320px] mt-2">
              {bios.groom[language]}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
