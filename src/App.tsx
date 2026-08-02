import { Loader, Hero } from '@/components/sections'
import { Navbar } from '@/components/navigation'

function App() {
  return (
    <>
      <Loader />
      <Navbar />
      
      {/* Cinematic Hero entry section */}
      <Hero />
      
      {/* Scrollspy test sections */}
      <div id="story" className="h-screen bg-white flex items-center justify-center border-b border-border text-text-primary font-display text-3xl">Our Story Section</div>
      <div id="timeline" className="h-screen bg-bg-light flex items-center justify-center border-b border-border text-text-primary font-display text-3xl">Timeline Section</div>
      <div id="events" className="h-screen bg-white flex items-center justify-center border-b border-border text-text-primary font-display text-3xl">Events Section</div>
      <div id="gallery" className="h-screen bg-bg-light flex items-center justify-center border-b border-border text-text-primary font-display text-3xl">Gallery Section</div>
      <div id="venue" className="h-screen bg-white flex items-center justify-center border-b border-border text-text-primary font-display text-3xl">Venue Section</div>
      <div id="rsvp" className="h-screen bg-bg-light flex items-center justify-center text-text-primary font-display text-3xl">RSVP Section</div>
    </>
  )
}

export default App
