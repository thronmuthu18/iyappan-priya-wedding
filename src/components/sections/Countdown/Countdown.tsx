import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const Countdown: React.FC = () => {
  const targetDate = new Date('2026-10-24T16:00:00+02:00').getTime()

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds }
  ]

  return (
    <Section id="countdown" className="bg-[#FAF7F2] py-16 md:py-24 border-t border-border/10">
      <Container size="standard">
        {/* Container overlay */}
        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center">
          
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-2">
            THE COUNTDOWN
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-light mb-4">
            Until We Say I Do
          </h2>
          
          <GoldLine className="mx-auto my-4" />

          {/* Time digits grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-[560px] my-8">
            {timeBlocks.map((block, index) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/50 border border-border/20 p-4 sm:p-6 flex flex-col items-center justify-center rounded-sm shadow-sm relative overflow-hidden"
              >
                {/* Micro ornament background */}
                <div className="absolute inset-0 bg-gradient-to-br from-bg-light/20 to-primary-light/10 pointer-events-none" />
                
                {/* Number */}
                <span className="font-display text-3xl sm:text-5xl md:text-6xl text-primary font-light block mb-2 tabular-nums">
                  {String(block.value).padStart(2, '0')}
                </span>
                
                {/* Label */}
                <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] text-text-secondary font-semibold uppercase">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Symmetrical date detail */}
          <span className="font-body text-xs tracking-widest text-[#A07850] uppercase mt-4">
            OCTOBER 24, 2026 • FLORENCE, ITALY
          </span>

        </div>
      </Container>
    </Section>
  )
}
