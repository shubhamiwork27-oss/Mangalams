// app.jsx
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import './App.css'
import Home from './Components/home'
import Loading from './Components/loading'

const App = () => {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (showLoader) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [showLoader])

  useEffect(() => {
    document.body.style.overflow = showLoader ? 'hidden' : ''
  }, [showLoader])

  return (
    <div>
      <div className="home">
        <Home />
      </div>
      {showLoader && (
        <div className="loader">
          <Loading onLoaded={() => setShowLoader(false)} />
        </div>
      )}
    </div>
  )
}

export default App