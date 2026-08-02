import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'
import { weddingConfig } from '@/config/wedding.config'
import { useUIStore } from '@/store'

// ── Family Member Card ───────────────────────────────────────────
const MemberCard: React.FC<{ name: string; role: string }> = ({
  name, role
}) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(201,169,110,0.2)' }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center text-center p-6 rounded-sm"
    style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7F2 100%)',
      border: '1px solid rgba(201,169,110,0.25)',
      boxShadow: '0 4px 20px rgba(26,23,20,0.04)',
    }}
  >
    {/* Avatar circle with Om */}
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
      style={{
        background: 'linear-gradient(135deg, #0A1D37 0%, #1A3A6A 100%)',
        border: '2px solid rgba(201,169,110,0.4)',
        boxShadow: '0 0 20px rgba(201,169,110,0.15)',
      }}
    >
      <span className="text-primary text-xl font-serif">ॐ</span>
    </div>

    {/* Name */}
    <h4 className="font-display text-xl text-text-primary mb-1">{name}</h4>

    {/* Role */}
    <span className="font-body text-[10px] tracking-widest text-text-secondary uppercase">{role}</span>
  </motion.div>
)

// ── Side Column ──────────────────────────────────────────────────
const FamilySide: React.FC<{
  group:      any
  side:       'bride' | 'groom'
  index:      number
  language:   'ta' | 'en'
}> = ({ group, side, index, language }) => {
  const isBride = side === 'bride'

  const roles = isBride
    ? {
        father: { en: 'Father of the Bride', ta: 'மணப்பெண் தந்தை' },
        mother: { en: 'Mother of the Bride', ta: 'மணப்பெண் தாயார்' },
      }
    : {
        father: { en: 'Father of the Groom', ta: 'மணமகன் தந்தை' },
        mother: { en: 'Mother of the Groom', ta: 'மணமகன் தாயார்' },
      }

  return (
    <motion.div
      initial={{ opacity: 0, x: isBride ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }}
      className="flex flex-col items-center space-y-8 px-4 md:px-8"
    >
      {/* Column header */}
      <div className="text-center">
        <span
          className="inline-block font-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-2"
          style={{ color: isBride ? '#800020' : '#0A1D37' }}
        >
          {language === 'ta' ? group.heading.ta : group.heading.en}
        </span>
        <h3 className="font-display text-2xl text-text-primary">
          {language === 'ta' ? group.heading.ta : group.heading.en}
        </h3>
        <div
          className="w-16 h-[2px] mx-auto mt-3"
          style={{ background: isBride ? 'linear-gradient(90deg, #800020, #C9A96E)' : 'linear-gradient(90deg, #0A1D37, #C9A96E)' }}
        />
      </div>

      {/* Parents */}
      <div className="w-full space-y-4">
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-center font-semibold text-text-secondary">
          {language === 'ta' ? 'பெற்றோர்கள்' : 'PARENTS'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MemberCard
            name={language === 'ta' ? group.parents.father.ta : group.parents.father.en}
            role={roles.father[language]}
          />
          <MemberCard
            name={language === 'ta' ? group.parents.mother.ta : group.parents.mother.en}
            role={roles.mother[language]}
          />
        </div>
      </div>

      {/* Jasmine decoration */}
      <div className="flex items-center space-x-2 text-primary/30">
        <span className="text-sm">🌸</span>
        <div className="w-8 h-[1px] bg-primary/20" />
        <span className="text-xs">✦</span>
        <div className="w-8 h-[1px] bg-primary/20" />
        <span className="text-sm">🌸</span>
      </div>
    </motion.div>
  )
}

// ── Main Family Section ──────────────────────────────────────────
export const Family: React.FC = () => {
  const { language } = useUIStore()
  const { family } = weddingConfig

  return (
    <Section id="family" className="py-20 md:py-36" style={{ background: '#FAF7F2' }}>
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="font-tamil text-primary/60 text-sm mb-2">
            {family.sectionTitle[language]}
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {family.sectionSubtitle[language]}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {language === 'ta' ? 'அன்புக் குடும்பங்கள்' : 'The Families'}
          </h2>
          <GoldLine className="mx-auto" />
          <p className="font-display italic text-text-secondary text-base mt-6 max-w-[480px] mx-auto">
            {language === 'ta'
              ? `"இரு குடும்பங்களின் அன்பும் ஆசீர்வாதமும் இணைந்த மங்களத் தொடக்கம்."`
              : `"Two families, one heart — united by love, blessed by God."`}
          </p>
        </div>

        {/* Family columns */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 max-w-[1024px] mx-auto items-start">
          {/* Vertical divider with Om */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex-col items-center pointer-events-none">
            <div className="flex-1 w-[1px]" style={{ background: 'rgba(201,169,110,0.2)' }} />
            <span className="text-primary/30 text-2xl my-3 font-serif">ॐ</span>
            <div className="flex-1 w-[1px]" style={{ background: 'rgba(201,169,110,0.2)' }} />
          </div>

          {family.groups.map((group, index) => (
            <FamilySide
              key={group.side}
              group={group}
              side={group.side}
              index={index}
              language={language}
            />
          ))}
        </div>

        {/* Bottom blessing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 space-y-2"
        >
          <p className="font-tamil text-primary/50 text-sm">
            {language === 'ta' ? 'இரு குடும்பங்களின் ஆசீர்வாதத்துடன்' : 'With blessings from both families'}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
