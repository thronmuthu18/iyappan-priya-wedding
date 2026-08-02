import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'
import { Button } from '@/components/ui'

export const Loader: React.FC = () => {
  const { isLoaderVisible, setLoaderVisible, setMusicEnabled } = useUIStore()
  const [progress, setProgress] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 12) + 6, 100))
      }, 80)
      return () => clearTimeout(timer)
    } else {
      // Once loaded, trigger the audio prompt modal
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const handleEnter = (music: boolean) => {
    setMusicEnabled(music)
    // Slide up transition starts
    setLoaderVisible(false)
  }

  return (
    <AnimatePresence>
      {isLoaderVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[2000] bg-bg-dark flex flex-col items-center justify-center text-text-inverse overflow-hidden"
        >
          {/* Main Monogram & Loader display */}
          <div className="flex flex-col items-center justify-center space-y-8 select-none">
            {/* Calligraphic SVG Monogram */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-primary">
              {/* Intertwined 'A' */}
              <motion.path
                d="M 32,75 L 50,25 L 68,75 M 38,55 L 62,55"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Intertwined 'J' */}
              <motion.path
                d="M 42,32 L 58,32 M 50,32 L 50,72 Q 50,85 36,85"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>

            {!showPrompt ? (
              <div className="flex flex-col items-center space-y-2">
                <span className="font-serif text-3xl tracking-widest text-primary">
                  A & J
                </span>
                <span className="font-sans text-xs tracking-[0.2em] text-text-secondary uppercase">
                  {progress}% Loaded
                </span>
                {/* Horizontal progress bar */}
                <div className="w-32 h-[1px] bg-border/20 relative">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              /* Audio Consent Card */
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card max-w-[340px] p-8 text-center rounded-lg border border-border/10 flex flex-col items-center space-y-6 mx-4"
              >
                <div className="space-y-2">
                  <h2 className="font-serif text-xl text-primary">A Gathering of Hearts</h2>
                  <p className="font-sans text-xs text-text-inverse/75 leading-relaxed">
                    We invite you to share in the beginning of our forever. Enable ambient music to fully experience our journey.
                  </p>
                </div>
                
                <div className="flex flex-col w-full space-y-3">
                  <Button variant="primary" onClick={() => handleEnter(true)} className="w-full">
                    Enter with Music
                  </Button>
                  <Button variant="ghost" onClick={() => handleEnter(false)} className="w-full text-text-inverse hover:text-primary">
                    Enter Silently
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
