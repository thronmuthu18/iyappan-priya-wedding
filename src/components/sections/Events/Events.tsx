import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { GoldLine } from '@/components/shared'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

const eventEmojis: Record<string, string> = {
  engagement: '💍',
  mehendi: '🌿',
  wedding: '🪔',
}

const handleDownloadICS = (event: any, lang: 'ta' | 'en') => {
  const summaryStr = lang === 'ta'
    ? `${event.name.ta} — இயப்பன் & பிரியா`
    : `${event.name.en} — Iyappan & Priya`

  const descStr = lang === 'ta'
    ? `${event.name.ta} விழாவிற்கு அன்புடன் அழைக்கிறோம்.`
    : `Join us for the ${event.name.en} ceremony of Iyappan and Priya.`

  const locationStr = lang === 'ta'
    ? `${event.venue.ta}, ${event.location.ta}`
    : `${event.venue.en}, ${event.location.en}`

  // Format date to ICS timestamp format
  const dateParts = event.date.split('-')
  const yyyymmdd = dateParts.join('')
  const dtStart = `${yyyymmdd}T100000`
  const dtEnd = `${yyyymmdd}T130000`

  const icsString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Iyappan and Priya Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@iyappan-priya-2026.in`,
    `DTSTAMP:20260802T100000Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summaryStr}`,
    `DESCRIPTION:${descStr}`,
    `LOCATION:${locationStr}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${event.id}_iyappan_priya.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const Events: React.FC = () => {
  const { language } = useUIStore()
  const events = weddingConfig.events

  // Localized general texts
  const labels = {
    sectionTitle: { en: 'Wedding Events', ta: 'திருமண விழாக்கள்' },
    sectionSubtitle: { en: 'THE CELEBRATIONS', ta: 'நிகழ்ச்சிகள்' },
    blessing: {
      en: "\"Come with love and leave with blessings — your presence is our greatest gift.\"",
      ta: "\"அன்போடு வந்து எங்களை ஆசீர்வதிக்குமாறு கேட்டுக்கொள்கிறோம்.\"",
    },
    navigate: { en: '📍 Navigate', ta: '📍 வரைபடம்' },
    addToCalendar: { en: '📅 Add to Calendar', ta: '📅 நாள்காட்டி' },
    welcomeNote: { en: 'Welcome all! Please bless us!', ta: 'அனைவரும் வருக! வாழ்த்துக!' },
    toBeConfirmed: { en: 'To be confirmed', ta: 'விரைவில் அறிவிக்கப்படும்' },
  }

  const formatDisplayDate = (dateStr: string, lang: 'ta' | 'en') => {
    if (lang === 'ta') {
      const parts = dateStr.split('-')
      const months = {
        '08': 'ஆகஸ்ட்',
        '10': 'அக்டோபர்',
      } as any
      return `${parts[2]} ${months[parts[1]] || parts[1]}, ${parts[0]}`
    } else {
      const parts = dateStr.split('-')
      const months = {
        '08': 'August',
        '10': 'October',
      } as any
      return `${months[parts[1]] || parts[1]} ${parts[2]}, ${parts[0]}`
    }
  }

  return (
    <Section id="events" className="py-20 md:py-36" style={{ background: '#FAF7F2' }}>
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="font-tamil text-primary/60 text-sm mb-2">{labels.sectionSubtitle[language]}</p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {language === 'ta' ? 'அழைப்பு விழாக்கள்' : 'THE CELEBRATIONS'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            {labels.sectionTitle[language]}
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Three Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
          {events.map((event, index) => {
            const emoji = eventEmojis[event.id] || '🎉'
            const hasTime = !!event.time

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative flex flex-col items-center text-center rounded-sm overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #FAF7F2 0%, #F5E6E0 100%)',
                  border: '1px solid rgba(201,169,110,0.4)',
                  boxShadow: '0 20px 60px -10px rgba(201,169,110,0.15)',
                }}
              >
                {/* Top colored accent based on event */}
                <div
                  className="w-full h-1"
                  style={{
                    background: index === 0
                      ? 'linear-gradient(90deg, #800020, #C9A96E)'
                      : index === 1
                      ? 'linear-gradient(90deg, #5C7A60, #C9A96E)'
                      : 'linear-gradient(90deg, #0A1D37, #C9A96E)',
                  }}
                />

                {/* Content */}
                <div className="p-8 flex flex-col items-center space-y-5 w-full">
                  {/* Emoji icon */}
                  <motion.span
                    className="text-4xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {emoji}
                  </motion.span>

                  {/* Tamil name */}
                  <p className="font-tamil text-primary/70 text-sm">{event.name[language]}</p>

                  {/* Subtitle */}
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#A07850' }}>
                    {event.subtitle[language]}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-text-primary">{event.name[language]}</h3>

                  {/* Divider */}
                  <div className="w-10 h-[1px] bg-primary/30" />

                  {/* Date */}
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-primary" />
                    <span className="font-body text-xs text-text-primary font-medium">
                      {formatDisplayDate(event.date, language)}
                    </span>
                  </div>

                  {/* Time */}
                  {hasTime && event.time && (
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-primary" />
                      <span className="font-body text-xs text-text-secondary">{event.time[language]}</span>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-primary" />
                    <span className="font-body text-xs text-text-secondary">
                      {event.venue[language]}, {event.location[language]}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs text-text-secondary leading-relaxed text-center">
                    {event.id === 'engagement' && (language === 'ta'
                      ? "இயப்பன் மற்றும் பிரியாவின் நிச்சயதார்த்த விழா இரு குடும்ப உறவுகளின் முன்னிலையில் நடைபெறுகிறது."
                      : "The betrothal ceremony formally announcing the sacred union between Iyappan and Priya.")}
                    {event.id === 'mehendi' && (language === 'ta'
                      ? "வண்ணமயமான மெஹந்தி மற்றும் இசை நிகழ்ச்சி நிறைந்த மாலைப் பொழுது கொண்டாட்டம்."
                      : "A blissful evening filled with intricate henna designs, celebration, and joy.")}
                    {event.id === 'wedding' && (language === 'ta'
                      ? "இருமனங்கள் இணையும் புனிதமான மங்களத் திருமணம்."
                      : "The sacred wedding vows (Thirumanam) binding the couple forever in traditional Hindu customs.")}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full pt-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(event.mapLink, '_blank')}
                      className="flex-1 text-[10px] px-3 py-2 border-primary text-primary hover:bg-primary hover:text-text-inverse"
                    >
                      {labels.navigate[language]}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleDownloadICS(event, language)}
                      className="flex-1 text-[10px] px-3 py-2"
                    >
                      {labels.addToCalendar[language]}
                    </Button>
                  </div>
                </div>

                {/* Corner ornaments */}
                <div className="absolute top-3 left-3 text-primary/20">
                  <svg viewBox="0 0 16 16" width="12" height="12"><path d="M 0 0 L 10 0 L 10 1.5 L 1.5 1.5 L 1.5 10 L 0 10 Z" fill="currentColor" /></svg>
                </div>
                <div className="absolute top-3 right-3 rotate-90 text-primary/20">
                  <svg viewBox="0 0 16 16" width="12" height="12"><path d="M 0 0 L 10 0 L 10 1.5 L 1.5 1.5 L 1.5 10 L 0 10 Z" fill="currentColor" /></svg>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom blessing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="font-tamil text-primary/50 text-sm mb-2">{labels.welcomeNote[language]}</p>
          <p className="font-display italic text-text-secondary text-base">
            {labels.blessing[language]}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
