import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { LazyImage, GoldLine } from '@/components/shared'
import { X, ChevronLeft, ChevronRight, Upload, Camera } from 'lucide-react'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

import gallery1 from '@/assets/gallery_1.jpg'
import gallery2 from '@/assets/gallery_2.jpg'
import gallery3 from '@/assets/gallery_3.jpg'
import gallery4 from '@/assets/gallery_4.jpg'
import gallery5 from '@/assets/gallery_5.jpg'
import gallery6 from '@/assets/gallery_6.jpg'

const imageMap: Record<string, string> = {
  gallery_1: gallery1,
  gallery_2: gallery2,
  gallery_3: gallery3,
  gallery_4: gallery4,
  gallery_5: gallery5,
  gallery_6: gallery6,
}

const placeholderConfig: Record<string, { label: { en: string; ta: string }; emoji: string }> = {
  'Bride Photos': { label: { en: 'Bride Photos', ta: 'மணப்பெண் படங்கள்' }, emoji: '💐' },
  'Groom Photos': { label: { en: 'Groom Photos', ta: 'மணமகன் படங்கள்' }, emoji: '🌺' },
  'Temple Photos': { label: { en: 'Temple Photos', ta: 'கோவில் படங்கள்' }, emoji: '🪔' },
  'Engagement Photos': { label: { en: 'Engagement Photos', ta: 'நிச்சயதார்த்த படங்கள்' }, emoji: '💍' },
  'Family Photos': { label: { en: 'Family Photos', ta: 'குடும்ப படங்கள்' }, emoji: '👨‍👩‍👧' },
  'Wedding Photos': { label: { en: 'Wedding Photos', ta: 'திருமண படங்கள்' }, emoji: '🎉' },
}

export const Gallery: React.FC = () => {
  const { language } = useUIStore()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeIndex,    setActiveIndex]    = useState<number | null>(null)

  const gData = weddingConfig.gallery
  const items = gData.items

  const filtered = items.filter(
    (i) => activeCategory === 'All' || i.category === activeCategory
  )

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIndex === null) return
    const fi  = filtered.findIndex((x) => x.id === activeIndex)
    const prev = fi <= 0 ? filtered.length - 1 : fi - 1
    setActiveIndex(filtered[prev].id)
  }, [activeIndex, filtered])

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIndex === null) return
    const fi   = filtered.findIndex((x) => x.id === activeIndex)
    const next = fi >= filtered.length - 1 ? 0 : fi + 1
    setActiveIndex(filtered[next].id)
  }, [activeIndex, filtered])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return
      if (e.key === 'Escape')      setActiveIndex(null)
      if (e.key === 'ArrowLeft')   showPrev()
      if (e.key === 'ArrowRight')  showNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, showPrev, showNext])

  const lightboxItem = activeIndex !== null ? items.find((i) => i.id === activeIndex) : null

  // Helper to translate categories for UI filter tabs
  const translateCategory = (cat: string) => {
    if (cat === 'All') return language === 'ta' ? 'அனைத்தும்' : 'All'
    return placeholderConfig[cat]?.label[language] || cat
  }

  // Get active placeholders to show
  const activePlaceholders = Object.keys(placeholderConfig).filter(
    (cat) => activeCategory === 'All' || cat === activeCategory
  )

  return (
    <Section id="gallery" className="py-20 md:py-36" style={{ background: '#FAF7F2' }}>
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-tamil text-primary/60 text-sm mb-2">{gData.sectionTitle[language]}</p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {gData.sectionSubtitle[language]}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {language === 'ta' ? 'அழகிய தருணங்கள்' : 'Captured Moments'}
          </h2>
          <GoldLine className="mx-auto" />
          <p className="font-display italic text-text-secondary text-base mt-4 max-w-[480px] mx-auto">
            {language === 'ta'
              ? `"ஒவ்வொரு புகைப்படமும் அன்பின் ஒரு அழகிய நினைவுக் குறிப்பு."`
              : `"Every photograph is a love letter — written in light."`}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['All', ...gData.categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-body text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300"
              style={{
                background:   activeCategory === cat ? 'linear-gradient(135deg, #C9A96E, #A07850)' : 'transparent',
                color:        activeCategory === cat ? '#FAF7F2' : '#5C5550',
                border:       `1px solid ${activeCategory === cat ? '#C9A96E' : 'rgba(201,169,110,0.2)'}`,
                boxShadow:    activeCategory === cat ? '0 4px 20px rgba(201,169,110,0.25)' : 'none',
              }}
            >
              {translateCategory(cat)}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-[1100px] mx-auto">
          {filtered.map((item, index) => {
            const imgSrc = imageMap[item.imageKey] || gallery1
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                onClick={() => setActiveIndex(item.id)}
                className="break-inside-avoid relative overflow-hidden cursor-pointer group rounded-sm"
                style={{ border: '1px solid rgba(201,169,110,0.2)', boxShadow: '0 4px 20px rgba(26,23,20,0.04)' }}
              >
                <LazyImage
                  src={imgSrc}
                  alt={item.alt}
                  className="w-full h-auto object-cover rounded-none transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"
                  style={{ background: 'rgba(6,15,30,0.7)', backdropFilter: 'blur(2px)' }}
                >
                  <Camera size={24} className="text-primary mb-2" />
                  <span className="font-body text-xs tracking-widest text-text-inverse uppercase">{item.caption[language]}</span>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="font-body text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm"
                    style={{ background: 'rgba(6,15,30,0.7)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.3)' }}
                  >
                    {translateCategory(item.category)}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Placeholder cards for future uploads */}
          {activePlaceholders.map((cat, i) => {
            const cfg = placeholderConfig[cat]
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (filtered.length + i) * 0.08 }}
                className="break-inside-avoid relative overflow-hidden rounded-sm aspect-square flex flex-col items-center justify-center space-y-3 p-8"
                style={{
                  background: 'linear-gradient(160deg, #0A1D37 0%, #1A3A6A 100%)',
                  border: '2px dashed rgba(201,169,110,0.25)',
                  boxShadow: '0 0 30px rgba(201,169,110,0.05)',
                }}
              >
                <span className="text-4xl">{cfg.emoji}</span>
                <p className="font-body text-xs tracking-widest uppercase text-center" style={{ color: '#C9A96E' }}>
                  {cfg.label[language]}
                </p>
                <p className="font-tamil text-primary/40 text-xs text-center">
                  {language === 'ta' ? 'படங்கள் விரைவில்' : 'Photos coming soon'}
                </p>
                <div className="flex items-center space-x-2 text-primary/30 mt-1">
                  <Upload size={14} />
                  <span className="font-body text-[10px] text-text-inverse/30">
                    {language === 'ta' ? 'பதிவேற்றப்படும்' : 'Upload pending'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="font-body text-xs text-text-secondary">
            {language === 'ta'
              ? 'திருமண நிகழ்வுக்கு பின் கூடுதல் புகைப்படங்கள் இங்கே பதிவேற்றப்படும்.'
              : 'More photos will be added here after the wedding celebrations.'}
          </p>
        </motion.div>
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
            style={{ background: 'rgba(6,15,30,0.97)', backdropFilter: 'blur(8px)' }}
          >
            {/* Close */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 z-50 cursor-pointer p-2 rounded-full"
              style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E' }}
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={showPrev}
              className="absolute left-6 z-50 cursor-pointer p-3 rounded-full transition-all hover:scale-110"
              style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E' }}
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <div className="max-w-[1024px] max-h-[85vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                src={imageMap[lightboxItem.imageKey] || gallery1}
                alt={lightboxItem.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-sm"
                style={{ border: '1px solid rgba(201,169,110,0.2)' }}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-5 space-y-1"
              >
                <p className="font-display text-lg italic" style={{ color: '#C9A96E' }}>{lightboxItem.caption[language]}</p>
              </motion.div>
            </div>

            {/* Next */}
            <button
              onClick={showNext}
              className="absolute right-6 z-50 cursor-pointer p-3 rounded-full transition-all hover:scale-110"
              style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E' }}
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
