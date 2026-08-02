import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store'
import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/cn'

export const MusicPlayer: React.FC = () => {
  const { musicEnabled, setMusicEnabled } = useUIStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const audioUrl = "https://assets.codepen.io/4358584/An+Endless+Sigh.mp3"

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
    <div className="fixed bottom-6 left-6 z-[200]">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Floating control button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
        onClick={togglePlay}
        className={cn(
          "flex items-center space-x-3 bg-bg-light/80 backdrop-blur-md border border-primary/20 hover:border-primary shadow-soft py-2.5 px-4 rounded-full text-text-primary transition-all duration-300 select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
          isPlaying ? "pr-5" : ""
        )}
      >
        {/* Toggle Icon */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isPlaying ? (
            <Volume2 size={15} className="text-primary animate-pulse" />
          ) : (
            <VolumeX size={15} className="text-text-secondary" />
          )}
        </div>

        {/* Text / Status */}
        <span className="font-sans text-[9px] tracking-[0.15em] uppercase font-semibold text-text-primary">
          {isPlaying ? "Sound On" : "Sound Off"}
        </span>

        {/* Dynamic soundwave visualizer (shows only when playing) */}
        {isPlaying && (
          <div className="flex items-end space-x-[2px] h-2.5 w-3.5 pl-1">
            <motion.span
              animate={{ height: [3, 9, 3] }}
              transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1.5px] bg-primary block"
            />
            <motion.span
              animate={{ height: [5, 12, 5] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              className="w-[1.5px] bg-primary block"
            />
            <motion.span
              animate={{ height: [3, 8, 3] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="w-[1.5px] bg-primary block"
            />
          </div>
        )}
      </motion.button>
    </div>
  )
}
