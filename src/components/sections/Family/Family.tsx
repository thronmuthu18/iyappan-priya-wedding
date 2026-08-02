import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'

interface FamilyMember {
  role: string
  name: string
  detail?: string
}

interface FamilyGroup {
  side: 'bride' | 'groom'
  heading: string
  parents: FamilyMember[]
  party: FamilyMember[]
}

export const Family: React.FC = () => {
  const families: FamilyGroup[] = [
    {
      side: 'bride',
      heading: "Aria's Family",
      parents: [
        { role: "Father of the Bride", name: "Arthur Montgomery" },
        { role: "Mother of the Bride", name: "Beatrice Montgomery" }
      ],
      party: [
        { role: "Maid of Honor • Sister", name: "Clara Montgomery" },
        { role: "Groomsman • Brother", name: "Edward Montgomery" }
      ]
    },
    {
      side: 'groom',
      heading: "Julian's Family",
      parents: [
        { role: "Father of the Groom", name: "Charles Westbrook" },
        { role: "Mother of the Groom", name: "Diana Westbrook" }
      ],
      party: [
        { role: "Best Man • Brother", name: "Liam Westbrook" },
        { role: "Bridesmaid • Sister", name: "Sophia Westbrook" }
      ]
    }
  ]

  const columnVariants = {
    hidden: (isBride: boolean) => ({
      opacity: 0,
      x: isBride ? -30 : 30
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  }

  return (
    <Section id="family" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            THE FAMILY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            Loved Ones
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 max-w-[960px] mx-auto items-start relative">
          
          {/* Vertical divider line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

          {families.map((family) => {
            const isBride = family.side === 'bride'
            return (
              <motion.div
                key={family.side}
                custom={isBride}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={columnVariants}
                className="flex flex-col items-center px-4 md:px-8 space-y-12"
              >
                {/* Column header */}
                <div className="text-center">
                  <h3 className="font-display text-2xl text-text-primary mb-2">
                    {family.heading}
                  </h3>
                  <div className="w-12 h-[1px] bg-primary/45 mx-auto" />
                </div>

                {/* Parents Block */}
                <div className="w-full text-center space-y-6">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold">
                    PARENTS
                  </h4>
                  <div className="space-y-4">
                    {family.parents.map((parent) => (
                      <div key={parent.name} className="space-y-0.5">
                        <span className="font-sans text-[10px] text-text-secondary tracking-wider block">
                          {parent.role}
                        </span>
                        <span className="font-body text-base text-text-primary font-medium block">
                          {parent.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wedding Party Block */}
                <div className="w-full text-center space-y-6">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold">
                    WEDDING PARTY
                  </h4>
                  <div className="space-y-4">
                    {family.party.map((member) => (
                      <div key={member.name} className="space-y-0.5">
                        <span className="font-sans text-[10px] text-text-secondary tracking-wider block">
                          {member.role}
                        </span>
                        <span className="font-body text-base text-text-primary font-medium block">
                          {member.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
