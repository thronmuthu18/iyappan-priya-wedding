import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui'
import heroImg from '@/assets/hero_couple_tuscany.jpg'

export const Hero: React.FC = () => {
  const { scrollY } = useScroll()
  
  // Parallax transforms (GPU accelerated)
  const bgY = useTransform(scrollY, [0, 800], [0, 200])
  const bgScale = useTransform(scrollY, [0, 800], [1.02, 1.08])
  const textY = useTransform(scrollY, [0, 800], [0, 100])
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  const namesVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-bg-dark flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroImg}
          alt="Aria and Julian in Tuscany"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center filter brightness-[0.8]"
        />
        {/* Double-layered overlays as specified in UI Blueprint */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to top, #1A1714 0%, rgba(26, 23, 20, 0) 40%)'
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(circle, transparent 20%, rgba(26, 23, 20, 0.3) 100%)'
          }}
        />
        {/* Sun Rays Overlay centered behind the names */}
        <div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 235, 180, 0.6) 0%, rgba(26, 23, 20, 0) 65%)'
          }}
        />
      </motion.div>

      {/* Floating Corner Floral Ornaments */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
        {/* Top Left */}
        <svg viewBox="0 0 100 100" className="absolute top-6 left-6 w-20 h-20 text-primary/15 rotate-[-45deg]">
          <path d="M10 90 Q30 50 90 10 M30 80 Q15 60 40 40 M60 40 Q80 15 90 10" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        {/* Top Right */}
        <svg viewBox="0 0 100 100" className="absolute top-6 right-6 w-20 h-20 text-primary/15 rotate-[45deg]">
          <path d="M90 90 Q70 50 10 10 M70 80 Q85 60 60 40 M40 40 Q20 15 10 10" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Centered Top Monogram at 12% height */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 pointer-events-none z-20 hidden sm:block">
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-primary">
          {/* Intertwined 'A' */}
          <path
            d="M 32,75 L 50,25 L 68,75 M 38,55 L 62,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Intertwined 'J' */}
          <path
            d="M 42,32 L 58,32 M 50,32 L 50,72 Q 50,85 36,85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content Stack */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center text-text-inverse px-6 flex flex-col items-center max-w-[720px] select-none"
      >
        {/* Overhead tag */}
        <motion.span
          variants={itemVariants}
          className="font-body text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-3"
        >
          THE CELEBRATION OF
        </motion.span>

        {/* Tagline / Subtitle (Above Names) */}
        <motion.p
          variants={itemVariants}
          className="font-display italic text-[16px] md:text-[20px] text-[#F5E6E0] max-w-[480px] mb-6 font-light leading-relaxed"
        >
          “In the quiet space where our paths crossed, we found our forever home.”
        </motion.p>

        {/* Wedding Names */}
        <motion.h1
          variants={namesVariants}
          className="font-script text-[64px] md:text-[112px] text-primary mb-6 filter drop-shadow-[0_4px_12px_rgba(201,169,110,0.15)]"
        >
          Aria & Julian
        </motion.h1>

        {/* Date & Location Badging */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4 font-body text-xs sm:text-sm tracking-[0.2em] text-text-inverse/90 uppercase border-y border-border/10 py-3 px-6"
        >
          <span>OCTOBER 24, 2026</span>
          <span className="text-primary">•</span>
          <span>FLORENCE, ITALY</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-16"
        >
          <Button variant="primary" onClick={scrollToRSVP} className="w-full sm:w-48">
            RSVP Now
          </Button>
          <Button variant="outline" onClick={scrollToStory} className="w-full sm:w-48 border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-bg-dark">
            Our Story
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.8, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none"
      >
        <span className="font-body text-[10px] tracking-[0.2em] text-text-inverse/60 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative">
          <motion.div
            animate={{ y: [0, 42], opacity: [0, 1, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-[2.5px] -top-[3px] w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}
