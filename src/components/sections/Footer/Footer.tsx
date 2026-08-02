import React from 'react'
import { Container } from '@/components/layout'
import { OrnamentalDivider } from '@/components/shared'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding.config'
import { useUIStore } from '@/store'

// ── Peacock Feather Row ──────────────────────────────────────────
const PeacockRow: React.FC = () => (
  <div className="flex items-center justify-center space-x-3 mb-8 opacity-50">
    {['🦚', '🌸', '✦', '🌸', '🦚'].map((e, i) => (
      <motion.span
        key={i}
        className="text-lg"
        animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
        transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
      >
        {e}
      </motion.span>
    ))}
  </div>
)

export const Footer: React.FC = () => {
  const { language } = useUIStore()

  const couple = weddingConfig.couple
  const footer = weddingConfig.footer

  return (
    <footer
      className="text-text-inverse py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060F1E 0%, #0A1D37 60%, #1A0A00 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(201,169,110,0.07) 0%, transparent 65%)' }}
      />

      {/* Floating marigold dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary"
            style={{
              left: `${(i * 41 + 7) % 100}%`,
              top:  `${(i * 73 + 5) % 100}%`,
              fontSize: 20,
            }}
          >
            ✿
          </div>
        ))}
      </div>

      <Container size="standard">
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 select-none">

          {/* Peacock row */}
          <PeacockRow />

          {/* Om Symbol */}
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 8px rgba(201,169,110,0.5))',
                'drop-shadow(0 0 24px rgba(201,169,110,1.0))',
                'drop-shadow(0 0 8px rgba(201,169,110,0.5))',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-primary font-serif"
            style={{ fontSize: 56, lineHeight: 1 }}
          >
            ॐ
          </motion.div>

          {/* Tamil/English blessings */}
          <div className="space-y-2">
            <p className="font-tamil text-primary/70 text-base">
              {language === 'ta' ? 'வாழ்க வளமுடன்! மங்களம் உண்டாகட்டும்!' : 'May blessings and prosperity always follow!'}
            </p>
            <p className="font-body text-xs tracking-widest text-text-inverse/40 uppercase">
              {language === 'ta' ? 'அன்போடு வாழ்த்துகிறோம்' : 'With Love and Warm Blessings'}
            </p>
          </div>

          {/* Couple names */}
          <div className="space-y-3">
            <h2 className="font-script" style={{ fontSize: 'clamp(40px, 8vw, 72px)', lineHeight: 1.1, background: 'linear-gradient(135deg, #A07850, #C9A96E, #F1E7D0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {couple.groom[language]} & {couple.bride[language]}
            </h2>
            <p className="font-body text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,169,110,0.4)' }}>
              {language === 'ta' ? 'திருமணம் • அக்டோபர் 30, 2026' : 'THIRUMANAM • OCTOBER 30, 2026'}
            </p>
          </div>

          <OrnamentalDivider className="text-primary/30 w-32 h-4 my-2" />

          {/* Closing message */}
          <p className="font-display italic text-base sm:text-lg max-w-[480px] leading-relaxed" style={{ color: 'rgba(245,230,224,0.75)' }}>
            "{footer.closingMessage[language]}"
          </p>

          {/* Lamp row */}
          <div className="flex items-center space-x-4 opacity-60">
            {[0, 1, 2, 1, 0].map((d, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ filter: ['drop-shadow(0 0 4px rgba(255,200,80,0.5))', 'drop-shadow(0 0 16px rgba(255,200,80,1.0))', 'drop-shadow(0 0 4px rgba(255,200,80,0.5))'] }}
                transition={{ duration: 1.5 + d * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                🪔
              </motion.span>
            ))}
          </div>

          {/* Copyright */}
          <div
            className="pt-8 w-full max-w-[360px] text-center space-y-2"
            style={{ borderTop: '1px solid rgba(201,169,110,0.08)' }}
          >
            <span className="font-body text-[9px] tracking-widest text-text-secondary uppercase block">
              © 2026 {couple.groom[language]} & {couple.bride[language]}. All Rights Reserved.
            </span>
            <span className="font-body text-[8px] uppercase block" style={{ color: 'rgba(201,169,110,0.25)' }}>
              {footer.designCredit}
            </span>
          </div>

        </div>
      </Container>
    </footer>
  )
}
