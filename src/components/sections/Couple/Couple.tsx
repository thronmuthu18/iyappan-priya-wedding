import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { LazyImage, GoldLine } from '@/components/shared'
import brideImg from '@/assets/bride_portrait.jpg'
import groomImg from '@/assets/groom_portrait.jpg'

export const Couple: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: custom * 0.2,
      },
    }),
  }

  return (
    <Section id="couple" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Overhead Section Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            INTRODUCING THE COUPLE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            Bride & Groom
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 relative max-w-[1024px] mx-auto items-start">
          
          {/* Vertical Middle Divider (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

          {/* Column 1: Bride */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="flex flex-col items-center text-center px-4 md:px-12"
          >
            {/* Symmetrical Luxury Framed Portrait */}
            <div className="relative w-full max-w-[320px] aspect-[3/4] mb-8 group">
              {/* Offset Gold Border Frame */}
              <div className="absolute inset-2 border border-primary z-10 transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 border border-border transition-transform duration-500 group-hover:scale-[0.98]" />
              
              <LazyImage
                src={brideImg}
                alt="Aria Montgomery"
                className="w-full h-full object-cover grayscale-[15%] transition-all duration-700 group-hover:grayscale-0 rounded-none"
              />
            </div>

            {/* Profile Info */}
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold mb-2 block">
              THE BRIDE
            </span>
            <h3 className="font-display text-3xl text-text-primary mb-1">
              Aria Montgomery
            </h3>
            <span className="font-sans text-[11px] tracking-wide text-text-secondary italic mb-4 block">
              Daughter of Arthur & Beatrice Montgomery
            </span>
            
            <p className="font-body text-xs text-text-secondary leading-relaxed max-w-[340px]">
              A designer with a passion for capturing light in watercolours, Aria views life as a canvas of endless beauty. She believes the best stories are found between the lines of favorite books and travels off the beaten path.
            </p>
          </motion.div>

          {/* Column 2: Groom */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="flex flex-col items-center text-center px-4 md:px-12"
          >
            {/* Symmetrical Luxury Framed Portrait */}
            <div className="relative w-full max-w-[320px] aspect-[3/4] mb-8 group">
              {/* Offset Gold Border Frame */}
              <div className="absolute inset-2 border border-primary z-10 transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 border border-border transition-transform duration-500 group-hover:scale-[0.98]" />
              
              <LazyImage
                src={groomImg}
                alt="Julian Westbrook"
                className="w-full h-full object-cover grayscale-[15%] transition-all duration-700 group-hover:grayscale-0 rounded-none"
              />
            </div>

            {/* Profile Info */}
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold mb-2 block">
              THE GROOM
            </span>
            <h3 className="font-display text-3xl text-text-primary mb-1">
              Julian Westbrook
            </h3>
            <span className="font-sans text-[11px] tracking-wide text-text-secondary italic mb-4 block">
              Son of Charles & Diana Westbrook
            </span>
            
            <p className="font-body text-xs text-text-secondary leading-relaxed max-w-[340px]">
              An architect who finds poetry in symmetry and structural lines, Julian constructs spaces that balance strength with grace. He believes a home is built not on timber or stone, but on laughter and silent understanding.
            </p>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
