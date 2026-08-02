import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'

interface Milestone {
  date: string
  title: string
  location: string
  description: string
}

export const Timeline: React.FC = () => {
  const milestones: Milestone[] = [
    {
      date: "SEPTEMBER 2023",
      title: "The First Meeting",
      location: "PARIS, FRANCE",
      description: "A chance meeting on a rainy afternoon that sparked a lifetime of conversations."
    },
    {
      date: "DECEMBER 2023",
      title: "The First Adventure",
      location: "SWISS ALPS",
      description: "Skiing through soft powder and sharing hot chocolate by a fireplace."
    },
    {
      date: "AUGUST 2024",
      title: "Building a Home",
      location: "LONDON, UK",
      description: "Merging books, sketches, and dreams into a cozy flat in the heart of London."
    },
    {
      date: "OCTOBER 2025",
      title: "The Promise",
      location: "TUSCANY, ITALY",
      description: "Julian asked, Aria answered, and a thousand stars witnessed our forever promise."
    },
    {
      date: "OCTOBER 24, 2026",
      title: "The Celebration",
      location: "FLORENCE, ITALY",
      description: "The day we weave our stories together in front of all the hearts we love."
    }
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll inside this specific timeline element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smooth scaleY transform
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="timeline" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            OUR TIMELINE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            How We Got Here
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative max-w-[800px] mx-auto px-4 md:px-0">
          
          {/* Vertical Track (Desktop: centered; Mobile: left aligned at 24px) */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border/40 -translate-x-1/2" />
          
          {/* Animated Gold Fill overlay */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2"
          />

          {/* Milestones Stack */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={milestone.title}
                  className="flex flex-col md:flex-row relative items-start md:items-center"
                >
                  {/* Timeline node point */}
                  <div className="absolute left-[24px] md:left-1/2 w-4 h-4 rounded-full border-2 border-primary bg-[#FAF7F2] -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  </div>

                  {/* Left Side (Desktop: displays even milestones) */}
                  <div className="hidden md:flex w-1/2 justify-end pr-12 text-right">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="max-w-[340px]"
                      >
                        <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold block mb-1">
                          {milestone.date}
                        </span>
                        <h3 className="font-display text-xl text-text-primary mb-2">
                          {milestone.title}
                        </h3>
                        <span className="font-sans text-[10px] text-text-secondary italic tracking-wider block mb-3">
                          {milestone.location}
                        </span>
                        <p className="font-body text-xs text-text-secondary leading-relaxed">
                          {milestone.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Spacer for layout offset */}
                  <div className="w-8 md:w-0" />

                  {/* Right Side (Desktop: odd milestones; Mobile: all milestones) */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-12 text-left">
                    {!isEven ? (
                      /* Odd milestone: displays on mobile and desktop right side */
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="max-w-[340px]"
                      >
                        <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold block mb-1">
                          {milestone.date}
                        </span>
                        <h3 className="font-display text-xl text-text-primary mb-2">
                          {milestone.title}
                        </h3>
                        <span className="font-sans text-[10px] text-text-secondary italic tracking-wider block mb-3">
                          {milestone.location}
                        </span>
                        <p className="font-body text-xs text-text-secondary leading-relaxed">
                          {milestone.description}
                        </p>
                      </motion.div>
                    ) : (
                      /* Even milestone: displays ONLY on mobile right side (hidden on desktop right side) */
                      <div className="block md:hidden">
                        <motion.div
                          initial={{ opacity: 0, x: 24 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                          className="max-w-[340px]"
                        >
                          <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold block mb-1">
                            {milestone.date}
                          </span>
                          <h3 className="font-display text-xl text-text-primary mb-2">
                            {milestone.title}
                          </h3>
                          <span className="font-sans text-[10px] text-text-secondary italic tracking-wider block mb-3">
                            {milestone.location}
                          </span>
                          <p className="font-body text-xs text-text-secondary leading-relaxed">
                            {milestone.description}
                          </p>
                        </motion.div>
                      </div>
                    )}
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </Container>
    </Section>
  )
}
