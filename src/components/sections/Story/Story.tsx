import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { LazyImage, GoldLine } from '@/components/shared'
import ch1Img from '@/assets/story_chapter_1.jpg'
import ch2Img from '@/assets/story_chapter_2.jpg'
import ch3Img from '@/assets/story_chapter_3.jpg'

export const Story: React.FC = () => {
  const chapters = [
    {
      num: "01",
      title: "Where It Began",
      date: "SEPTEMBER 2023",
      location: "PARIS, FRANCE",
      text: "It was in the quiet rain of a Paris autumn that our paths first crossed. A shared umbrella, a spilled coffee, and a conversation that outlasted the storm. We found in each other a familiar silence and a shared curiosity.",
      img: ch1Img,
      alt: "Cozy Parisian café"
    },
    {
      num: "02",
      title: "The First Spark",
      date: "MAY 2024",
      location: "LONDON, UNITED KINGDOM",
      text: "In London, amidst blueprints and watercolour sketches, we built a world of shared dreams. Symmetrical lines met soft washes of colour, and we realized that our differences were the very things that made us whole.",
      img: ch2Img,
      alt: "Blueprints and paint jars"
    },
    {
      num: "03",
      title: "The Proposal",
      date: "OCTOBER 2025",
      location: "TUSCANY, ITALY",
      text: "Under the golden Tuscan sun, surrounded by whispering olive groves, Julian asked Aria for her forever. The wind carried our laughter, and the earth bore witness to a promise that had already been written in our hearts.",
      img: ch3Img,
      alt: "Tuscan olive groves"
    }
  ]

  const revealVariants = {
    hidden: (isEven: boolean) => ({
      opacity: 0,
      x: isEven ? -40 : 40,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  }

  const imgVariants = {
    hidden: (isEven: boolean) => ({
      opacity: 0,
      x: isEven ? 40 : -40,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  }

  return (
    <Section id="story" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            OUR JOURNEY TOGETHER
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            Our Love Story
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Chapters Stack */}
        <div className="flex flex-col space-y-24 md:space-y-40 max-w-[1024px] mx-auto">
          {chapters.map((chapter, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={chapter.num}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Column 1: Narrative Copy */}
                <motion.div
                  custom={isEven}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealVariants}
                  className="w-full md:w-1/2 flex flex-col justify-center px-4"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="font-display text-5xl font-extralight text-primary/45">
                      {chapter.num}
                    </span>
                    <div className="h-[1px] bg-border flex-grow" />
                  </div>

                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold mb-1">
                    {chapter.date}
                  </span>
                  <span className="font-sans text-[10px] tracking-wide text-text-secondary italic mb-4 block">
                    {chapter.location}
                  </span>

                  <h3 className="font-display text-3xl text-text-primary mb-6 leading-tight">
                    {chapter.title}
                  </h3>

                  <p className="font-body text-sm text-text-secondary leading-relaxed max-w-[420px]">
                    {chapter.text}
                  </p>
                </motion.div>

                {/* Column 2: Side Image */}
                <motion.div
                  custom={isEven}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={imgVariants}
                  className="w-full md:w-1/2 px-4"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden shadow-medium border border-border/10 rounded-sm">
                    <LazyImage
                      src={chapter.img}
                      alt={chapter.alt}
                      className="w-full h-full object-cover rounded-none transition-transform duration-[1200ms] hover:scale-105"
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
