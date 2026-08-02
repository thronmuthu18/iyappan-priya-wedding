import { Suspense, lazy, useEffect } from 'react'
import { Loader } from '@/components/sections/Loader'
import { Hero } from '@/components/sections/Hero'
import { Couple } from '@/components/sections/Couple'
import { Navbar } from '@/components/navigation'
import { MusicPlayer } from '@/components/shared'
import { useSmoothScroll } from '@/hooks'
import { useUIStore } from '@/store'

// Lazy load components
const Story = lazy(() => import('@/components/sections/Story').then(m => ({ default: m.Story })))
const Timeline = lazy(() => import('@/components/sections/Timeline').then(m => ({ default: m.Timeline })))
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
  const { language } = useUIStore()

  useEffect(() => {
    if (language === 'ta') {
      let link = document.getElementById('tamil-font-link') as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.id = 'tamil-font-link'
        link.rel = 'stylesheet'
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@300;400;500;600;700&display=swap'
        document.head.appendChild(link)
      }
    }
  }, [language])

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

      {/* Scroll-filling Milestones Timeline representing 11 Years Journey */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Timeline />
      </Suspense>

      {/* Double Column Event Details (Engagement, Mehendi, Wedding) */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Events />
      </Suspense>

      {/* Dynamic Event Timer Countdown */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Countdown />
      </Suspense>


      {/* Parents Section */}
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

      {/* Closing brand signature footer (Blessings / Thank you) */}
      <Suspense fallback={<SectionPlaceholder />}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
