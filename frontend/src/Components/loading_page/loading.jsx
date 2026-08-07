// loading.jsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ShinyText from './ShinyText'
import '../../styles/loader.css'

const Loading = ({ onLoaded }) => {
  const [percent, setPercent] = useState(0)
  const loaderRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const counter = { val: 0 }
    const countTween = gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        const nextPercent = Math.round(counter.val)
        setPercent(nextPercent)

        if (fillRef.current) {
          fillRef.current.style.width = `${nextPercent}%`
        }
      },
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => onLoaded?.(),
        })
      },
    })

    return () => countTween.kill()
  }, [onLoaded])

  const clampedPercent = Math.min(100, Math.max(0, percent))

  return (
    <div className='parentloader' ref={loaderRef}>
      <ShinyText
        text='Mangalams'
        className='loading-text'
        speed={3}
        delay={0}
        color='#b70101'
        shineColor='#ffffff'
        spread={120}
        direction='left'
        yoyo={false}
        pauseOnHover={false}
      />

      <div className='line'>
        <div className='fill' ref={fillRef} style={{ width: `${clampedPercent}%` }} />
        <h1 className='loadnum' style={{ left: `${clampedPercent}%` }}>{clampedPercent}%</h1>
      </div>
    </div>
  )
}

export default Loading