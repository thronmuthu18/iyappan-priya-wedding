import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

/** Animated Om Symbol using SVG path drawing */
const OmSymbol: React.FC<{ size?: number; className?: string; animate?: boolean }> = ({
  size = 96,
  className = '',
  animate: shouldAnimate = true,
}) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={className}
    aria-label="Om symbol"
  >
    {/* Outer circular halo */}
    <motion.circle
      cx="50" cy="50" r="46"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    />
    {/* Om ॐ glyph — simplified artistic path */}
    <motion.text
      x="50"
      y="62"
      textAnchor="middle"
      fontSize="48"
      fontFamily="serif"
      fill="currentColor"
      initial={shouldAnimate ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
    >
      ॐ
    </motion.text>
    {/* Top arc decoration */}
    <motion.path
      d="M 20 18 Q 50 8 80 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.5"
      initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
    />
    {/* Bottom arc decoration */}
    <motion.path
      d="M 20 82 Q 50 92 80 82"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.5"
      initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
    />
  </svg>
)



export const Loader: React.FC = () => {
  const { isLoaderVisible, setLoaderVisible, language } = useUIStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 12) + 6, 100))
      }, 80)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setLoaderVisible(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [progress, setLoaderVisible])

  const loaderData = weddingConfig.loader
  const couple = weddingConfig.couple

  return (
    <AnimatePresence>
      {isLoaderVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #060F1E 0%, #0A1D37 40%, #1A0A00 100%)',
          }}
        >
          {/* Radial gold glow behind Om */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 65%)',
            }}
          />

          {/* Floating kolam dots background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary"
                style={{
                  left: `${(i * 37 + 15) % 100}%`,
                  top: `${(i * 53 + 10) % 100}%`,
                }}
              />
            ))}
          </div>

          {/* Main centered content */}
          <div className="flex flex-col items-center justify-center space-y-8 select-none relative z-10">
            {/* Om Symbol */}
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 8px rgba(201,169,110,0.6))', 'drop-shadow(0 0 24px rgba(201,169,110,1.0))', 'drop-shadow(0 0 8px rgba(201,169,110,0.6))'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <OmSymbol size={100} className="text-primary" />
            </motion.div>

            {/* Temple bell decoration */}
            <motion.div
              className="flex items-center space-x-6 text-primary/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 1 }}
            >
              <span className="text-lg" style={{ display: 'inline-block', animation: 'bell-swing 2.2s ease-in-out infinite', transformOrigin: 'top center' }}>🔔</span>
              <div className="w-16 h-[1px] bg-primary/20" />
              <span className="font-script text-3xl text-primary">{loaderData.initials}</span>
              <div className="w-16 h-[1px] bg-primary/20" />
              <span className="text-lg" style={{ display: 'inline-block', animation: 'bell-swing 2.2s ease-in-out infinite 0.5s', transformOrigin: 'top center' }}>🔔</span>
            </motion.div>

            <div className="flex flex-col items-center space-y-4">
              {/* Tamil & English names dynamically based on selected language */}
              <motion.span
                className="font-tamil text-primary/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {couple.groom[language]} & {couple.bride[language]}
              </motion.span>
              <span className="font-body text-[11px] tracking-[0.2em] text-text-inverse/40 uppercase">
                {progress}% Loading
              </span>
              <div className="w-40 h-[1px] bg-white/10 relative">
                <motion.div
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #A07850, #C9A96E, #F1E7D0)',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
