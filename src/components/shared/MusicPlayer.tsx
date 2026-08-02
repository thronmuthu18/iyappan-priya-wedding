import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store'
import { VolumeX } from 'lucide-react'
import { weddingConfig } from '@/config/wedding.config'

export const MusicPlayer: React.FC = () => {
  const { musicEnabled, setMusicEnabled } = useUIStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const audioUrl = weddingConfig.music.backgroundTrack

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Sync play state with global musicEnabled store
    if (musicEnabled === true) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay blocked by browser policy. Waiting for user interaction.", err)
          setIsPlaying(false)
          setMusicEnabled(false)
        })
    } else if (musicEnabled === false) {
      audio.pause()
      setIsPlaying(false)
    }
  }, [musicEnabled, setMusicEnabled])

  const togglePlay = () => {
    const nextState = !isPlaying
    setIsPlaying(nextState)
    setMusicEnabled(nextState)
  }

  // Hide the player until the loader is completed (musicEnabled is set to either true or false)
  if (musicEnabled === null) return null

  return (
    <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[200] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)]">
      {/* Hidden audio element loading from weddingConfig */}
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Floating circular control button */}
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
              className="w-[1.5px] bg-primary block"
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
  )
}
