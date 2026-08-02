import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

export const Timeline: React.FC = () => {
  const { language } = useUIStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const milestones = weddingConfig.story.chapters
  const emojis = ['💍', '🌿', '🪔'] // Emojis corresponding to the 3 timeline phases

  return (
    <Section id="timeline" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <p className="font-tamil text-primary/60 text-sm mb-2">
            {language === 'ta' ? 'நிகழ்வு கோடு' : 'Our Milestone Path'}
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {language === 'ta' ? 'அழகிய பயணம்' : 'THE JOURNEY'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {language === 'ta' ? 'எங்கள் பயணம்' : 'Our Journey'}
          </h2>
          <GoldLine className="mx-auto" />
          <p className="font-display italic text-text-secondary text-base mt-4 max-w-[480px] mx-auto">
            {language === 'ta'
              ? '"11 ஆண்டுகால தூய காதல், இப்போது நன்முறையில் இணைகிறது."'
              : '"An 11-year journey of love and commitment leading to this sacred union."'}
          </p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative max-w-[800px] mx-auto px-4 md:px-0">

          {/* Vertical Track */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" style={{ background: 'rgba(201,169,110,0.15)' }} />

          {/* Animated Gold Fill */}
          <motion.div
            className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, #C9A96E, #A07850)', scaleY, originY: 0 }}
          />

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0
              const emoji = emojis[index % emojis.length]

              return (
                <div
                  key={milestone.num}
                  className="flex flex-col md:flex-row relative items-start md:items-center"
                >
                  {/* Timeline node */}
                  <div
                    className="absolute left-[24px] md:left-1/2 w-10 h-10 rounded-full -translate-x-1/2 z-10 flex items-center justify-center text-lg animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, #0A1D37, #1A3A6A)',
                      border: '2px solid rgba(201,169,110,0.5)',
                      boxShadow: '0 0 20px rgba(201,169,110,0.2)',
                    }}
                  >
                    {emoji}
                  </div>

                  {/* Left Side (Desktop only, even milestones) */}
                  <div className="hidden md:flex w-1/2 justify-end pr-16 text-right">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="max-w-[340px]"
                      >
                        <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold block mb-1" style={{ color: '#A07850' }}>
                          {milestone.date}
                        </span>
                        <p className="font-tamil text-primary/60 text-xs mb-1">{milestone.title[language]}</p>
                        <h3 className="font-display text-xl text-text-primary mb-2">{milestone.title[language]}</h3>
                        <span className="font-body text-[10px] text-text-secondary italic tracking-wider block mb-3">{milestone.location[language]}</span>
                        <p className="font-body text-xs text-text-secondary leading-relaxed">{milestone.text[language]}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Spacer (mobile) */}
                  <div className="w-8 md:w-0" />

                  {/* Right Side */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-16 text-left">
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="max-w-[340px]"
                      >
                        <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold block mb-1" style={{ color: '#A07850' }}>
                          {milestone.date}
                        </span>
                        <p className="font-tamil text-primary/60 text-xs mb-1">{milestone.title[language]}</p>
                        <h3 className="font-display text-xl text-text-primary mb-2">{milestone.title[language]}</h3>
                        <span className="font-body text-[10px] text-text-secondary italic tracking-wider block mb-3">{milestone.location[language]}</span>
                        <p className="font-body text-xs text-text-secondary leading-relaxed">{milestone.text[language]}</p>
                      </motion.div>
                    ) : (
                      <div className="block md:hidden">
                        <motion.div
                          initial={{ opacity: 0, x: 24 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-100px' }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                          className="max-w-[340px]"
                        >
                          <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold block mb-1" style={{ color: '#A07850' }}>
                            {milestone.date}
                          </span>
                          <p className="font-tamil text-primary/60 text-xs mb-1">{milestone.title[language]}</p>
                          <h3 className="font-display text-xl text-text-primary mb-2">{milestone.title[language]}</h3>
                          <span className="font-body text-[10px] text-text-secondary italic tracking-wider block mb-3">{milestone.location[language]}</span>
                          <p className="font-body text-xs text-text-secondary leading-relaxed">{milestone.text[language]}</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom blessing */}
        <div className="text-center mt-16">
          <p className="font-tamil text-primary/40 text-sm">
            {language === 'ta' ? 'ஒரு புனிதமான பயணத்தின் தொடக்கம்' : 'The beginning of a sacred journey'}
          </p>
        </div>
      </Container>
    </Section>
  )
}
