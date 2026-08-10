import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'
import './Carousel.css'
import Image1 from '../../assets/images/image1.png';

const DEFAULT_ITEMS = [
  {
    id: 1,
    src: Image1,
    alt: 'Hero slide 1'
  },
  {
    id: 2,
    src: Image1,
    alt: 'Hero slide 2'
  },
  {
    id: 3,
    src: Image1,
    alt: 'Hero slide 3'
  },
  {
    id: 4,
    src: Image1,
    alt: 'Hero slide 4'
  },
  {
    id: 5,
    src: Image1,
    alt: 'Hero slide 5'
  }
]

const DRAG_BUFFER = 64
const VELOCITY_THRESHOLD = 380
const GAP = 0
const SLIDE_TRANSITION = { type: 'spring', stiffness: 180, damping: 28, mass: 0.9 }
const DRAG_TRANSITION = { bounceStiffness: 260, bounceDamping: 26 }

function CarouselItem({ item, itemWidth, round, transition }) {
  return (
    <motion.div
      className={`carousel-item ${round ? 'round' : ''}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <img
        src={item.src}
        alt={item.alt ?? ''}
        className={`carousel-slide-image ${round ? 'round' : ''}`}
        draggable='false'
      />
    </motion.div>
  )
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 0,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 0
  const [containerWidth, setContainerWidth] = useState(baseWidth || 0)
  const itemWidth = Math.max((containerWidth || baseWidth || 0) - containerPadding * 2, 0)
  const trackItemOffset = itemWidth + GAP
  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const containerRef = useRef(null)
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current
      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (!containerRef.current) return undefined
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.clientWidth ?? baseWidth)
    }
    updateWidth()
    const resizeObserver = new ResizeObserver(() => updateWidth())
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [baseWidth])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined
    if (pauseOnHover && isHovered) return undefined

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  useEffect(() => {
    const startingPosition = loop ? 1 : 0
    setPosition(startingPosition)
    x.set(-startingPosition * trackItemOffset)
  }, [items.length, loop, trackItemOffset, x])

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1))
    }
  }, [itemsForRender.length, loop, position])

  const effectiveTransition = isJumping ? { duration: 0 } : SLIDE_TRANSITION

  const handleAnimationStart = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }
    const lastCloneIndex = itemsForRender.length - 1

    if (position === lastCloneIndex) {
      setIsJumping(true)
      const target = 1
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    if (position === 0) {
      setIsJumping(true)
      const target = items.length
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    setIsAnimating(false)
  }

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 2
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
        ? -1
        : 0

    if (direction === 0) return

    setPosition(prev => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      }

  const activeIndex = loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      className={`carousel-root ${round ? 'round' : ''}`}
    >
      <motion.div
        className='carousel-track'
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        dragElastic={0.12}
        dragMomentum={false}
        dragTransition={DRAG_TRANSITION}
        whileTap={{ cursor: 'grabbing' }}
        style={{
          gap: `${GAP}px`,
          x,
          height: '100%'
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            itemWidth={itemWidth}
            round={round}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className='carousel-dots-wrapper'>
        <div className='carousel-dots'>
          {items.map((_, index) => (
            <button
              key={index}
              type='button'
              className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setPosition(loop ? index + 1 : index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
