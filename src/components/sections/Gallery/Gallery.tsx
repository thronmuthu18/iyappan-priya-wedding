import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { LazyImage, GoldLine } from '@/components/shared'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import gallery1 from '@/assets/gallery_1.jpg'
import gallery2 from '@/assets/gallery_2.jpg'
import gallery3 from '@/assets/gallery_3.jpg'
import gallery4 from '@/assets/gallery_4.jpg'
import gallery5 from '@/assets/gallery_5.jpg'
import gallery6 from '@/assets/gallery_6.jpg'

interface GalleryItem {
  id: number
  src: string
  alt: string
  caption: string
}

export const Gallery: React.FC = () => {
  const items: GalleryItem[] = [
    { id: 0, src: gallery1, alt: "Walking in Tuscany", caption: "Love in Tuscany" },
    { id: 1, src: gallery2, alt: "Intertwined hands", caption: "A Lifetime Promise" },
    { id: 2, src: gallery3, alt: "Laughing under archway", caption: "Laughter in Florence" },
    { id: 3, src: gallery4, alt: "Florence sunset", caption: "Sunset over the Arno" },
    { id: 4, src: gallery5, alt: "Bride looking out window", caption: "Quiet Anticipation" },
    { id: 5, src: gallery6, alt: "Dancing under string lights", caption: "Dancing Under Stars" },
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Navigate lightbox
  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev! - 1))
    }
  }

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev! + 1))
    }
  }

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  return (
    <Section id="gallery" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            VISUAL JOURNAL
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            Captured Moments
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] max-w-[1024px] mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={() => setActiveIndex(item.id)}
              className="break-inside-avoid relative overflow-hidden cursor-pointer group rounded-sm border border-border/15 shadow-sm hover:shadow-medium transition-all duration-300"
            >
              <LazyImage
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover rounded-none transition-transform duration-[1200ms] group-hover:scale-103"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="font-body text-xs tracking-widest text-text-inverse uppercase border-y border-text-inverse/25 py-2 px-4">
                  View Fullscreen
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-sm flex items-center justify-center px-4"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 text-text-inverse/70 hover:text-text-inverse z-50 cursor-pointer p-2"
              aria-label="Close Lightbox"
            >
              <X size={28} />
            </button>

            {/* Left navigation */}
            <button
              onClick={showPrev}
              className="absolute left-6 text-text-inverse/70 hover:text-text-inverse z-50 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Main content display container */}
            <div className="max-w-[1024px] max-h-[80vh] flex flex-col items-center justify-center relative select-none">
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as const }}
                src={items[activeIndex].src}
                alt={items[activeIndex].alt}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-[75vh] object-contain shadow-luxury"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-4 text-text-inverse/85"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-display text-lg italic">{items[activeIndex].caption}</p>
              </motion.div>
            </div>

            {/* Right navigation */}
            <button
              onClick={showNext}
              className="absolute right-6 text-text-inverse/70 hover:text-text-inverse z-50 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
