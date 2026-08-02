import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { LazyImage, GoldLine } from '@/components/shared'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'
import ch1Img from '@/assets/story_chapter_1.jpg'
import ch2Img from '@/assets/story_chapter_2.jpg'
import ch3Img from '@/assets/story_chapter_3.jpg'

const imageMap: Record<string, string> = {
  story_chapter_1: ch1Img,
  story_chapter_2: ch2Img,
  story_chapter_3: ch3Img,
}

export const Story: React.FC = () => {
  const { language } = useUIStore()

  const revealVariants = {
    hidden:  (isEven: boolean) => ({ opacity: 0, x: isEven ? -40 : 40 }),
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
  }

  const imgVariants = {
    hidden:  (isEven: boolean) => ({ opacity: 0, x: isEven ? 40 : -40 }),
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
  }

  const storyData = weddingConfig.story

  return (
    <Section id="story" className="py-20 md:py-36" style={{ background: '#FAF7F2' }}>
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <p className="font-tamil text-primary/60 text-sm mb-2">{storyData.sectionTitle[language]}</p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {storyData.sectionSubtitle[language]}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {language === 'ta' ? 'எங்கள் காதல் கதை' : 'Our Love Story'}
          </h2>
          <GoldLine className="mx-auto" />
          <p className="font-display italic text-lg text-text-secondary mt-6 max-w-[480px] mx-auto">
            {language === 'ta'
              ? `"இரு இதயங்களின் தெய்வீகப் பயணம், அன்பிலும் நம்பிக்கையிலும் இணைந்து தொடர்கிறது."`
              : `"A love blessed by the gods, nurtured by family, and sealed in devotion."`}
          </p>
        </div>

        {/* Chapters */}
        <div className="flex flex-col space-y-24 md:space-y-40 max-w-[1024px] mx-auto">
          {storyData.chapters.map((chapter, index) => {
            const isEven = index % 2 === 0
            const chapImg = imageMap[chapter.imageKey] || ch1Img

            return (
              <div
                key={chapter.num}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Text column */}
                <motion.div
                  custom={isEven}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={revealVariants}
                  className="w-full md:w-1/2 flex flex-col justify-center px-4"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="font-display text-5xl font-extralight" style={{ color: 'rgba(201,169,110,0.35)' }}>
                      {chapter.num}
                    </span>
                    <div className="h-[1px] flex-grow" style={{ background: 'rgba(201,169,110,0.2)' }} />
                    {/* Small Om */}
                    <span className="text-primary/30 text-sm">ॐ</span>
                  </div>

                  <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: '#A07850' }}>
                    {chapter.date}
                  </span>
                  <span className="font-body text-[10px] tracking-wide text-text-secondary italic mb-4 block">
                    {chapter.location[language]}
                  </span>

                  <h3 className="font-display text-3xl text-text-primary mb-6 leading-tight">
                    {chapter.title[language]}
                  </h3>

                  <p className="font-body text-sm text-text-secondary leading-relaxed max-w-[420px]">
                    {chapter.text[language]}
                  </p>

                  {/* Decorative dots */}
                  <div className="flex items-center space-x-2 mt-6 text-primary/40">
                    <span className="text-xs">✿</span>
                    <div className="w-8 h-[1px] bg-primary/20" />
                    <span className="text-xs">✦</span>
                  </div>
                </motion.div>

                {/* Image column */}
                <motion.div
                  custom={isEven}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={imgVariants}
                  className="w-full md:w-1/2 px-4"
                >
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
                    style={{ border: '1px solid rgba(201,169,110,0.25)', boxShadow: '0 20px 60px -10px rgba(201,169,110,0.15)' }}
                  >
                    {/* Corner gold ornaments */}
                    <div className="absolute top-3 left-3 z-10 text-primary/40">
                      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M 0 0 L 10 0 L 10 1.5 L 1.5 1.5 L 1.5 10 L 0 10 Z" fill="currentColor" /></svg>
                    </div>
                    <div className="absolute top-3 right-3 z-10 rotate-90 text-primary/40">
                      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M 0 0 L 10 0 L 10 1.5 L 1.5 1.5 L 1.5 10 L 0 10 Z" fill="currentColor" /></svg>
                    </div>
                    <LazyImage
                      src={chapImg}
                      alt={chapter.alt[language]}
                      className="w-full h-full object-cover rounded-none transition-transform duration-[1200ms] hover:scale-105"
                    />
                    {/* Warm overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 50%)' }}
                    />
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
