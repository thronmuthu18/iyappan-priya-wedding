import React from 'react'
import { motion } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { GoldLine } from '@/components/shared'
import { Plane, Building, Info } from 'lucide-react'

export const Venue: React.FC = () => {
  const mapUrl = "https://maps.google.com/maps?q=Villa%20Corsini%20Castel%20di%20Poggio%20Fiesole%20Firenze&t=&z=14&ie=UTF8&iwloc=&output=embed"

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  return (
    <Section id="venue" className="bg-[#FAF7F2] py-20 md:py-36 border-t border-border/10">
      <Container size="standard">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            THE LOCATION
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            Venue & Travel
          </h2>
          <GoldLine className="mx-auto" />
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 max-w-[1024px] mx-auto items-stretch">
          
          {/* Column 1: Details and Travel Guide */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="flex flex-col justify-between space-y-8"
          >
            {/* Main Venue Card */}
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#A07850] uppercase font-semibold">
                THE VENUE
              </span>
              <h3 className="font-display text-3xl text-text-primary">
                Villa Corsini
              </h3>
              <p className="font-body text-xs text-text-secondary leading-relaxed">
                Perched on the rolling hills overlooking Florence, Villa Corsini Castel di Poggio stands as a majestic testament to Renaissance beauty. Surrounded by historical gardens and olive groves, it provides the perfect backdrop for our celebration.
              </p>
            </div>

            {/* Travel Segment */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Plane size={16} className="text-primary" />
                <h4 className="font-sans text-[10px] tracking-[0.2em] text-text-primary uppercase font-bold">
                  TRAVEL & AIRPORTS
                </h4>
              </div>
              <p className="font-body text-xs text-text-secondary leading-relaxed pl-6">
                Florence Airport (FLR) is located 25 minutes from the venue. Alternatively, Pisa International Airport (PSA) is 1 hour and 15 minutes away, with direct train connections to Florence Central Station.
              </p>
            </div>

            {/* Shuttle info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Info size={16} className="text-primary" />
                <h4 className="font-sans text-[10px] tracking-[0.2em] text-text-primary uppercase font-bold">
                  GUEST TRANSPORT
                </h4>
              </div>
              <p className="font-body text-xs text-text-secondary leading-relaxed pl-6">
                Shuttle transport will be provided for guests, departing from Cathedral Square (Piazza del Duomo) at 3:15 PM on October 24, returning from Villa Corsini starting at midnight.
              </p>
            </div>

            {/* Accommodations */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building size={16} className="text-primary" />
                <h4 className="font-sans text-[10px] tracking-[0.2em] text-text-primary uppercase font-bold">
                  RECOMMENDED HOTELS
                </h4>
              </div>
              <p className="font-body text-xs text-text-secondary leading-relaxed pl-6">
                We suggest lodging in central Florence. Recommended selections include the <b>Hotel Savoy</b> (near the Duomo) and <b>Villa San Michele</b> (in Fiesole, closer to the venue).
              </p>
            </div>

          </motion.div>

          {/* Column 2: Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full aspect-[4/3] lg:aspect-auto min-h-[360px] rounded-sm overflow-hidden border border-primary p-2 bg-white"
          >
            {/* Symmetrical Outer Border Offset */}
            <div className="absolute inset-4 border border-border pointer-events-none z-10" />
            
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Villa Corsini Location Map"
              className="w-full h-full filter grayscale-[40%] brightness-[96%] contrast-[102%]"
            />
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
