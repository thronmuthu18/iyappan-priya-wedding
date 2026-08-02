import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export type AtmosphereType =
  | 'couple'
  | 'story'
  | 'timeline'
  | 'events'
  | 'countdown'
  | 'family'
  | 'venue'
  | 'rsvp'

interface AtmosphericBackgroundProps {
  type: AtmosphereType
  targetRef: React.RefObject<HTMLElement | null>
}

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({ type, targetRef }) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  // Slower/faster offsets to create cinematic 3D parallax depth
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15])
  const mistY = useTransform(scrollYProgress, [0, 1], [-35, 35])
  const activeLayerY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  // Jasmine petals generator for Couple and Events sections
  const renderJasminePetals = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const left = (i * 27 + 7) % 90 + 5 // randomish left starting position
      const delay = (i * 2.8) % 10
      const duration = (i * 4.3) % 8 + 12 // 12s to 20s
      const scale = (i * 0.15) % 0.4 + 0.6 // 0.6 to 1.0
      const opacity = (i * 0.12) % 0.3 + 0.5 // 0.5 to 0.8
      
      return (
        <div
          key={i}
          className="absolute pointer-events-none select-none z-10"
          style={{
            left: `${left}%`,
            top: `-20px`,
            opacity: opacity,
            transform: `scale(${scale})`,
            animation: `jasmine-fall ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          {/* Elegant simple white jasmine petal graphic */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#FFFFF0] drop-shadow-[0_1px_3px_rgba(201,169,110,0.3)]">
            <path
              d="M12 2C12 2 15 8 19 12C15 16 12 22 12 22C12 22 9 16 5 12C9 8 12 2 12 2Z"
              fill="#FFFFF0"
              stroke="rgba(201,169,110,0.15)"
              strokeWidth="0.5"
            />
            <circle cx="12" cy="12" r="2.5" fill="#FFD700" opacity="0.6" />
          </svg>
        </div>
      )
    })
  }

  // Golden / glowing particles generator for Story, Countdown and RSVP sections
  const renderParticles = (count: number, color: string) => {
    return Array.from({ length: count }).map((_, i) => {
      const left = (i * 19 + 13) % 90 + 5
      const top = (i * 23 + 17) % 80 + 10
      const delay = (i * 1.7) % 6
      const duration = (i * 3.4) % 6 + 10 // 10s to 16s
      const size = (i * 1) % 3 + 2 // 2px to 5px
      const opacity = (i * 0.08) % 0.25 + 0.35 // 0.35 to 0.60

      return (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none select-none z-10"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            opacity: opacity,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 6px ${color}`,
            animation: `particle-float-slow ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      )
    })
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 perspective-container">
      <div className="w-full h-full relative camera-breathing-layer">
        
        {/* 1. BACKGROUND GRADIENT LAYER (Layer 1: Far Sky, z = -150px) */}
        <motion.div
          style={{ y: bgY, z: -150, scale: 1.3 }}
          className="absolute -inset-10 z-0 transition-colors duration-500"
        >
          {type === 'couple' && (
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle at 30% 20%, #E6F4FF 0%, #FCFEFF 50%, #DCEEFF 100%)',
              }}
            />
          )}
          
          {type === 'story' && (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFEFF 60%, rgba(255,223,140,0.1) 100%)',
              }}
            />
          )}
          
          {type === 'timeline' && (
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle at 70% 30%, #FCFEFF 0%, #EEF8FF 50%, #DCEEFF 100%)',
              }}
            />
          )}
          
          {type === 'events' && (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #FCFEFF 0%, rgba(255,223,140,0.12) 50%, #DCEEFF 100%)',
              }}
            />
          )}
          
          {type === 'countdown' && (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #FCFEFF 0%, #E6F4FF 100%)',
              }}
            />
          )}
          
          {type === 'family' && (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFEFF 50%, #EEF8FF 100%)',
              }}
            />
          )}
          
          {type === 'venue' && (
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle at 50% 10%, rgba(255,223,140,0.12) 0%, #FCFEFF 60%, #DCEEFF 100%)',
              }}
            />
          )}
          
          {type === 'rsvp' && (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(160deg, #FCFEFF 0%, #EEF8FF 50%, rgba(255,223,140,0.10) 100%)',
              }}
            />
          )}
        </motion.div>

        {/* 2. VOLUMETRIC MIST & RAYS LAYER (Layers 2 & 3: Mist/Clouds, z = -70px) */}
        <motion.div
          style={{ y: mistY, z: -70, scale: 1.15 }}
          className="absolute inset-0 z-10"
        >
          
          {/* Universal mist blob 1 */}
          <div
            className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full filter blur-[80px] sm:blur-[120px]"
            style={{
              left: '10%',
              top: '20%',
              backgroundColor: '#EEF8FF',
              animation: 'mist-drift-1 25s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />

          {/* Universal mist blob 2 */}
          <div
            className="absolute w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full filter blur-[70px] sm:blur-[110px]"
            style={{
              right: '15%',
              bottom: '15%',
              backgroundColor: type === 'story' || type === 'events' || type === 'venue' ? 'rgba(255,223,140,0.12)' : '#DCEEFF',
              animation: 'mist-drift-2 30s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />

          {/* Section-specific atmospheric light rays (God rays) */}
          {type === 'timeline' && (
            <div
              className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background: 'repeating-linear-gradient(115deg, rgba(255,223,140,0.08) 0px, rgba(255,223,140,0.08) 40px, transparent 80px, transparent 160px)',
                animation: 'god-ray-shimmer 8s ease-in-out infinite',
                maskImage: 'linear-gradient(to bottom, black 20%, transparent 85%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 85%)',
              }}
            />
          )}

          {type === 'venue' && (
            <div
              className="absolute inset-x-0 top-0 h-[300px] opacity-30 mix-blend-overlay"
              style={{
                background: 'repeating-linear-gradient(95deg, rgba(255,223,140,0.1) 0px, rgba(255,223,140,0.1) 50px, transparent 100px, transparent 200px)',
                animation: 'god-ray-shimmer 12s ease-in-out infinite',
                maskImage: 'radial-gradient(circle at top, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at top, black 30%, transparent 80%)',
              }}
            />
          )}
        </motion.div>

        {/* 3. ACTIVE DECORATIVE LAYER (Layer 4: Petals/Particles/Clouds, z = 60px) */}
        <motion.div
          style={{ y: activeLayerY, z: 60, scale: 0.9 }}
          className="absolute inset-0 z-20 overflow-hidden"
        >
          
          {/* Gently floating jasmine petals */}
          {(type === 'couple' || type === 'events') && renderJasminePetals(8)}

          {/* Golden floating particles */}
          {type === 'story' && renderParticles(12, '#C9A96E')}

          {/* Soft moving clouds (large low-blur shapes) */}
          {type === 'countdown' && (
            <>
              <div
                className="absolute w-[600px] h-[150px] rounded-full filter blur-[90px] bg-white pointer-events-none"
                style={{
                  left: '-10%',
                  top: '30%',
                  animation: 'cloud-drift 40s ease-in-out infinite',
                  willChange: 'transform, opacity',
                }}
              />
              {renderParticles(8, '#C9A96E')}
            </>
          )}

          {/* RSVP tiny glowing particles */}
          {type === 'rsvp' && renderParticles(10, '#C9A96E')}
        </motion.div>

      </div>
    </div>
  )
}
