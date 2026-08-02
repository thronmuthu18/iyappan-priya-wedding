import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'
import { Navigation, MapPin } from 'lucide-react'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

interface VenueCardProps {
  title: { en: string; ta: string }
  venue: any
  language: 'ta' | 'en'
}

const VenueCard: React.FC<VenueCardProps> = ({ title, venue, language }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
      className="flex flex-col rounded-sm overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0A1D37 0%, #1A3A6A 100%)',
        border: '1px solid rgba(201,169,110,0.3)',
        boxShadow: '0 10px 40px rgba(201,169,110,0.1)',
      }}
    >
      {/* Map Embed Iframe */}
      <div className="w-full h-[260px] relative overflow-hidden" style={{ borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
        <iframe
          src={venue.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(30%) contrast(110%)' }}
          allowFullScreen={false}
          loading="lazy"
          title={`${title[language]} Map`}
        />
        {/* Corner gold ornaments */}
        {['top-2 left-2', 'top-2 right-2 rotate-90', 'bottom-2 right-2 rotate-180', 'bottom-2 left-2 -rotate-90'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} z-10 text-primary/50`}>
            <svg viewBox="0 0 20 20" width="12" height="12"><path d="M 0 0 L 12 0 L 12 1.5 L 1.5 1.5 L 1.5 12 L 0 12 Z" fill="currentColor" /></svg>
          </div>
        ))}
      </div>

      {/* Info details */}
      <div className="p-8 flex flex-col justify-between flex-1 space-y-6">
        <div>
          <span className="font-body text-[9px] tracking-[0.2em] uppercase font-semibold mb-1 block" style={{ color: '#C9A96E' }}>
            {title[language]}
          </span>
          <h3 className="font-display text-2xl mb-3" style={{ color: '#F1E7D0' }}>
            {venue.name[language]}
          </h3>
          <div className="flex items-start space-x-2 text-text-inverse/80 mb-4">
            <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
            <span className="font-body text-xs leading-relaxed">{venue.address[language]}</span>
          </div>
          <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(201,169,110,0.7)' }}>
            {venue.description[language]}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => window.open(venue.mapLink, '_blank')}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-sm font-body text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #C9A96E, #A07850)',
              color: '#FAF7F2',
              boxShadow: '0 4px 15px rgba(201,169,110,0.25)',
            }}
          >
            <Navigation size={12} />
            <span>{language === 'ta' ? 'வழித்தடம்' : 'Navigate'}</span>
          </button>
          <button
            onClick={() => window.open(venue.mapLink, '_blank')}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-sm font-body text-[10px] font-semibold tracking-widest uppercase transition-all duration-300"
            style={{
              background: 'transparent',
              color: '#C9A96E',
              border: '1px solid rgba(201,169,110,0.3)',
            }}
          >
            <MapPin size={12} />
            <span>{language === 'ta' ? 'வரைபடம் திறக்கவும்' : 'Open Google Maps'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export const Venue: React.FC = () => {
  const { language } = useUIStore()

  const labels = {
    sectionTitle: { en: 'Venues & Navigation', ta: 'திருமண இடங்கள்' },
    sectionSubtitle: { en: 'THE LOCATIONS', ta: 'இருப்பிடம்' },
    engagementTitle: { en: 'Engagement Venue', ta: 'நிச்சயதார்த்த விழா இடம்' },
    weddingTitle: { en: 'Wedding Venue', ta: 'திருமண விழா இடம்' },
    welcomeText: { en: 'We look forward to welcoming you', ta: 'தங்கள் வரவை அன்போடு எதிர்பார்க்கிறோம்' },
  }

  return (
    <Section id="venue" className="py-20 md:py-36" style={{ background: '#FAF7F2', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="font-tamil text-primary/60 text-sm mb-2">{labels.sectionSubtitle[language]}</p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {language === 'ta' ? 'திருமண மண்டபம் மற்றும் திருக்கோவில்' : 'THE LOCATIONS'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {labels.sectionTitle[language]}
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Dual Venue Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1100px] mx-auto items-stretch">
          {/* Section One: Engagement */}
          <VenueCard
            title={labels.engagementTitle}
            venue={weddingConfig.venueEngagement}
            language={language}
          />

          {/* Section Two: Wedding */}
          <VenueCard
            title={labels.weddingTitle}
            venue={weddingConfig.venueWedding}
            language={language}
          />
        </div>

        {/* Footer blessing note inside Venue */}
        <div className="text-center pt-16 max-w-[400px] mx-auto">
          <p className="font-tamil text-primary/50 text-xs">
            {language === 'ta' ? 'மங்களகரமான இந்த திருநாளில் தங்களை வரவேற்கிறோம்' : 'Join us in blessing the couple'}
          </p>
          <p className="font-display italic text-text-secondary text-sm mt-1">
            "{labels.welcomeText[language]}"
          </p>
        </div>
      </Container>
    </Section>
  )
}
