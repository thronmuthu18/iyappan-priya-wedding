import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { GoldLine } from '@/components/shared'
import { MapPin, Clock } from 'lucide-react'

interface EventData {
  id: string
  title: string
  subtitle: string
  time: string
  locationName: string
  locationAddress: string
  dressCode: string
  mapLink: string
  // ICS details
  fileName: string
  dtStamp: string
  dtStart: string
  dtEnd: string
  summary: string
  description: string
}

export const Events: React.FC = () => {
  const events: EventData[] = [
    {
      id: "ceremony",
      title: "The Ceremony",
      subtitle: "HOLY MATRIMONY",
      time: "Saturday, October 24, 2026 at 4:00 PM",
      locationName: "Cathedral of Santa Maria del Fiore",
      locationAddress: "Piazza del Duomo, 50122 Firenze FI, Italy",
      dressCode: "Black Tie Optional",
      mapLink: "https://maps.google.com/?q=Cathedral+of+Santa+Maria+del+Fiore,+Florence,+Italy",
      fileName: "wedding_ceremony",
      dtStamp: "20260802T100000Z",
      dtStart: "20261024T160000",
      dtEnd: "20261024T173000",
      summary: "Wedding Ceremony - Aria & Julian",
      description: "Join us for our wedding ceremony in Florence, Italy."
    },
    {
      id: "reception",
      title: "The Reception",
      subtitle: "DINNER & CELEBRATION",
      time: "Saturday, October 24, 2026 at 6:30 PM",
      locationName: "Villa Corsini",
      locationAddress: "Via Castel di Poggio, 21, 50014 Fiesole FI, Italy",
      dressCode: "Black Tie Optional",
      mapLink: "https://maps.google.com/?q=Villa+Corsini,+Florence,+Italy",
      fileName: "wedding_reception",
      dtStamp: "20260802T100000Z",
      dtStart: "20261024T183000",
      dtEnd: "20261025T010000",
      summary: "Wedding Reception - Aria & Julian",
      description: "Join us for dinner, dancing, and drinks at Villa Corsini."
    }
  ]

  const handleDownloadICS = (event: EventData) => {
    const icsString = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aria and Julian Wedding//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@ariaandjulian2026.com`,
      `DTSTAMP:${event.dtStamp}`,
      `DTSTART:${event.dtStart}`,
      `DTEND:${event.dtEnd}`,
      `SUMMARY:${event.summary}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.locationName}, ${event.locationAddress}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${event.fileName}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Section id="events" className="bg-[#FAF7F2] py-20 md:py-36">
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            THE DETAILS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            Wedding Events
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Double Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[960px] mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
              className="luxury-card p-8 md:p-12 flex flex-col justify-between items-center text-center rounded-sm relative overflow-hidden"
            >
              {/* Corner vector decorations */}
              <div className="absolute top-4 left-4 text-primary/10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-10 h-10">
                  <path d="M 0 0 Q 30 10 30 40 Q 10 30 0 0" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 text-primary/10 pointer-events-none rotate-[90deg]">
                <svg viewBox="0 0 100 100" className="w-10 h-10">
                  <path d="M 0 0 Q 30 10 30 40 Q 10 30 0 0" fill="currentColor" />
                </svg>
              </div>

              {/* Event titles */}
              <div className="mb-6 space-y-2">
                <span className="font-body text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold">
                  {event.subtitle}
                </span>
                <h3 className="font-display text-3xl text-text-primary">
                  {event.title}
                </h3>
              </div>

              {/* Metadata segments */}
              <div className="space-y-6 w-full max-w-[340px] my-6">
                {/* Time segment */}
                <div className="flex items-start space-x-3 text-left">
                  <Clock size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-text-secondary uppercase block">
                      Time
                    </span>
                    <span className="font-body text-xs text-text-primary">
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Location segment */}
                <div className="flex items-start space-x-3 text-left">
                  <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-text-secondary uppercase block">
                      Venue
                    </span>
                    <span className="font-body text-xs text-text-primary font-medium block">
                      {event.locationName}
                    </span>
                    <span className="font-body text-[11px] text-text-secondary">
                      {event.locationAddress}
                    </span>
                  </div>
                </div>

                {/* Dress code segment */}
                <div className="flex items-start space-x-3 text-left">
                  <span className="w-4 h-4 border border-primary rounded-full flex items-center justify-center text-[8px] font-bold text-primary flex-shrink-0 mt-1">
                    D
                  </span>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-text-secondary uppercase block">
                      Dress Code
                    </span>
                    <span className="font-body text-xs text-text-primary">
                      {event.dressCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons grid */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-6">
                <Button
                  variant="outline"
                  onClick={() => window.open(event.mapLink, '_blank')}
                  className="w-full sm:w-auto text-[10px] px-4 py-2 border-primary text-primary hover:bg-primary hover:text-text-inverse"
                >
                  View on Map
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDownloadICS(event)}
                  className="w-full sm:w-auto text-[10px] px-4 py-2"
                >
                  Add to Calendar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
