import { Loader } from '@/components/sections'

function App() {
  return (
    <>
      <Loader />
      <div className="min-h-screen bg-bg-light text-text-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-5xl mb-4 text-primary">Aria & Julian</h1>
          <p className="font-body text-xs tracking-widest text-text-secondary uppercase">The Celebration is Initializing</p>
        </div>
      </div>
    </>
  )
}

export default App
