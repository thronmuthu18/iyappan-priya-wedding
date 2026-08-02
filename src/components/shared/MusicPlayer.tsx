import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'
import { VolumeX } from 'lucide-react'
import { weddingConfig } from '@/config/wedding.config'

export const MusicPlayer: React.FC = () => {
  const { musicEnabled, setMusicEnabled, language, isLoaderVisible } = useUIStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeIntervalRef = useRef<number | null>(null)

  const audioUrl = weddingConfig.music.backgroundTrack

  // Helper: Fade in audio volume smoothly
  const fadeInAudio = useCallback((audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    audio.volume = 0
    
    audio.play()
      .then(() => {
        setIsPlaying(true)
        setMusicEnabled(true)
        localStorage.setItem('wedding_music', 'enabled')
        
        let vol = 0
        fadeIntervalRef.current = window.setInterval(() => {
          vol += 0.05
          if (vol >= 0.8) {
            audio.volume = 0.8
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
          } else {
            audio.volume = vol
          }
        }, 60)
      })
      .catch((err) => {
        console.warn("Audio play blocked by browser autoplay policy. Showing interaction prompt.", err)
        setShowPopup(true)
      })
  }, [setMusicEnabled])

  // Helper: Fade out audio volume smoothly
  const fadeOutAudio = useCallback((audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    let vol = audio.volume

    fadeIntervalRef.current = window.setInterval(() => {
      vol -= 0.05
      if (vol <= 0.05) {
        audio.volume = 0
        audio.pause()
        setIsPlaying(false)
        setMusicEnabled(false)
        localStorage.setItem('wedding_music', 'disabled')
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      } else {
        audio.volume = vol
      }
    }, 60)
  }, [setMusicEnabled])

  // Handle initial play/pause state sync based on preferences
  useEffect(() => {
    // Only proceed after Loader completes
    if (isLoaderVisible) return

    const audio = audioRef.current
    if (!audio) return

    const savedState = localStorage.getItem('wedding_music')
    if (savedState === 'disabled') {
      // User explicitly muted previously, respect it
      setIsPlaying(false)
      setMusicEnabled(false)
      audio.volume = 0
      audio.pause()
    } else {
      // Try to autoplay. If blocked, browsers will reject the play promise, triggering the popup
      fadeInAudio(audio)
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [isLoaderVisible, setMusicEnabled, fadeInAudio])

  // Monitor store state changes (e.g. from float button toggle)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || isLoaderVisible) return

    if (musicEnabled === true && !isPlaying) {
      fadeInAudio(audio)
    } else if (musicEnabled === false && isPlaying) {
      fadeOutAudio(audio)
    }
  }, [musicEnabled, isPlaying, isLoaderVisible, fadeInAudio, fadeOutAudio])

  // Tap-anywhere listener to activate background music if prompt is visible
  useEffect(() => {
    if (!showPopup) return

    const handleTapAnywhere = () => {
      const audio = audioRef.current
      if (audio) {
        setShowPopup(false)
        fadeInAudio(audio)
      }
    }

    window.addEventListener('click', handleTapAnywhere)
    window.addEventListener('touchstart', handleTapAnywhere)

    return () => {
      window.removeEventListener('click', handleTapAnywhere)
      window.removeEventListener('touchstart', handleTapAnywhere)
    }
  }, [showPopup, fadeInAudio])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering window-level tap listeners
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      fadeOutAudio(audio)
    } else {
      fadeInAudio(audio)
    }
  }

  // Don't render player or popup until loader has finished
  if (isLoaderVisible) return null

  return (
    <>
      {/* Hidden audio element loading from weddingConfig */}
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Floating circular control button */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[200] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)]">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
          className="w-12 h-12 min-h-[48px] min-w-[48px] touch-manipulation rounded-full flex items-center justify-center bg-bg-light/80 backdrop-blur-md border border-primary/20 hover:border-primary shadow-soft text-text-primary transition-all duration-300 select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {isPlaying ? (
            /* Active Equalizer Lines in center of circle */
            <div className="flex items-end justify-center space-x-[2px] h-3.5 w-5">
              <motion.span
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1.5px] bg-primary block animate-pulse"
              />
              <motion.span
                animate={{ height: [6, 15, 6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                className="w-[1.5px] bg-primary block"
              />
              <motion.span
                animate={{ height: [4, 10, 4] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="w-[1.5px] bg-primary block"
              />
            </div>
          ) : (
            /* Muted VolumeX indicator */
            <VolumeX size={15} className="text-text-secondary" />
          )}
        </motion.button>
      </div>

      {/* Beautiful Glassmorphic Tap-to-Begin Consent Popup overlaying the Hero section */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1500] flex items-center justify-center bg-[#060F1E]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-bg-light/95 backdrop-blur-lg p-8 sm:p-10 rounded-sm border border-primary/30 shadow-luxury text-center max-w-[340px] mx-4 flex flex-col items-center space-y-6 relative"
              onClick={(e) => e.stopPropagation()} // Prevent bubble to window tap trigger unless clicking background
            >
              {/* Gold corner ornaments */}
              {['top-2 left-2', 'top-2 right-2 rotate-90', 'bottom-2 right-2 rotate-180', 'bottom-2 left-2 -rotate-90'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-4 h-4 text-primary/40`}>
                  <svg viewBox="0 0 20 20" className="w-full h-full">
                    <path d="M 0 0 L 8 0 L 8 1 L 1 1 L 1 8 L 0 8 Z" fill="currentColor" />
                  </svg>
                </div>
              ))}

              {/* Floating 3D Music Note */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 text-primary text-3xl shadow-soft"
              >
                🎵
              </motion.div>

              <div className="space-y-2">
                <h3 className="font-display text-xl text-primary font-medium tracking-wide">
                  {language === 'ta' ? 'அன்போடு அழைக்கிறோம்' : 'Welcome to our Celebration'}
                </h3>
                <p className="font-body text-xs text-text-secondary leading-relaxed max-w-[280px] mx-auto">
                  {language === 'ta'
                    ? 'வாழ்த்துகளைக் காண சவுண்ட்டை ஆன் செய்யவும். திரையில் எங்கு வேண்டுமானாலும் தட்டவும்.'
                    : 'Tap anywhere to begin your wedding experience with music.'}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const audio = audioRef.current
                  if (audio) {
                    setShowPopup(false)
                    fadeInAudio(audio)
                  }
                }}
                className="w-full py-3 bg-primary text-bg-light hover:bg-primary/95 font-display text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-soft cursor-pointer"
              >
                {language === 'ta' ? 'தொடங்கவும்' : 'Begin Experience'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
