import { Suspense, lazy } from 'react'
import { Loader } from '@/components/sections/Loader'
import { Hero } from '@/components/sections/Hero'
import { Couple } from '@/components/sections/Couple'
import { Navbar } from '@/components/navigation'
import { MusicPlayer } from '@/components/shared'
import { useSmoothScroll } from '@/hooks'

// Lazy load below-the-fold components directly from their modules to enable full code-splitting
const Story = lazy(() => import('@/components/sections/Story').then(m => ({ default: m.Story })))
const Timeline = lazy(() => import('@/components/sections/Timeline').then(m => ({ default: m.Timeline })))
const Gallery = lazy(() => import('@/components/sections/Gallery').then(m => ({ default: m.Gallery })))
const Events = lazy(() => import('@/components/sections/Events').then(m => ({ default: m.Events })))
const Countdown = lazy(() => import('@/components/sections/Countdown').then(m => ({ default: m.Countdown })))
const Family = lazy(() => import('@/components/sections/Family').then(m => ({ default: m.Family })))
const Venue = lazy(() => import('@/components/sections/Venue').then(m => ({ default: m.Venue })))
const RSVP = lazy(() => import('@/components/sections/RSVP').then(m => ({ default: m.RSVP })))
const Footer = lazy(() => import('@/components/sections/Footer').then(m => ({ default: m.Footer })))

const SectionPlaceholder = () => (
  <div className="h-[400px] w-full bg-[#FAF7F2] opacity-35" />
)

function App() {
  useSmoothScroll()

  return (
    <>
      {/* Intro Preloader screen */}
      <Loader />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Navigation header */}
      <Navbar />
      
      {/* Cinematic Hero entry section */}
      <Hero />

      {/* Symmetrical Couple profiles section */}
      <Couple />

      {/* Alternating Narrative Story chapters */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Story />
      </Suspense>

      {/* Scroll-filling Milestones Timeline */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Timeline />
      </Suspense>

      {/* Modern Asymmetrical Photo Gallery */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Gallery />
      </Suspense>

      {/* Double Column Event Details */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Events />
      </Suspense>

      {/* Dynamic Event Timer Countdown */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Countdown />
      </Suspense>

      {/* Loved family and wedding party list */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Family />
      </Suspense>

      {/* Venue logistics and map section */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Venue />
      </Suspense>

      {/* Multi-step validation RSVP entry forms */}
      <Suspense fallback={<SectionPlaceholder />}>
        <RSVP />
      </Suspense>

      {/* Closing brand signature footer */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
