import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../styles/loader.css'

const Loading = () => {
  const [percent, setPercent] = useState(0)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 400)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => navigate('/')}>
      {!done && (
        <motion.div
          className='parentloader'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='head'>Mangalms</h1>

          <div className="line">
            <motion.div
              className="fill"
              style={{ width: `${percent}%` }}
            ></motion.div>
            <h1 className='loadnum'>{percent}%</h1>
          </div>

          <motion.div
            className="wipe"
            animate={done ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loading