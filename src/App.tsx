import { Loader, Hero, Couple, Story, Timeline, Gallery, Events, Countdown, Family, Venue, RSVP, Footer } from '@/components/sections'
import { Navbar } from '@/components/navigation'

function App() {
  return (
    <>
      <Loader />
      <Navbar />
      
      {/* Cinematic Hero entry section */}
      <Hero />

      {/* Symmetrical Couple profiles section */}
      <Couple />

      {/* Alternating Narrative Story chapters */}
      <Story />

      {/* Scroll-filling Milestones Timeline */}
      <Timeline />

      {/* Modern Asymmetrical Photo Gallery */}
      <Gallery />

      {/* Double Column Event Details */}
      <Events />

      {/* Dynamic Event Timer Countdown */}
      <Countdown />

      {/* Loved family and wedding party list */}
      <Family />

      {/* Venue logistics and map section */}
      <Venue />

      {/* Multi-step validation RSVP entry forms */}
      <RSVP />

      {/* Closing brand signature footer */}
      <Footer />
    </>
  )
}

export default App
