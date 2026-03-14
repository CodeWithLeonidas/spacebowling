'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Seeded particles — deterministic ────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id:          i,
  x:           (i * 137.508) % 100,
  delay:       (i % 7) * 0.4,
  size:        (i % 3) * 0.7 + 1.2,
  duration:    (i % 4) * 0.8 + 2.5,
  repeatDelay: (i % 3) * 1.2,
}))

const bootLines = [
  'INITIALIZING SPACE BOWLING SYSTEMS...',
  'CALIBRATING NEON ARRAYS...',
  'LOADING LANE DIAGNOSTICS...',
  'SYNCING AUDIO MATRIX...',
  'ALL SYSTEMS GO',
]

function Particle({ x, delay, size, duration, repeatDelay }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: `${x}%`, bottom: '-4px', width: size, height: size }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: -220 }}
      transition={{ duration, delay, ease: 'easeOut', repeat: Infinity, repeatDelay }}
      aria-hidden="true"
    />
  )
}

function Ring({ size, duration, reverse, dotColor }) {
  return (
    <motion.div
      className="absolute rounded-full border border-white/[0.06]"
      style={{ width: size, height: size }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <span
        className="absolute w-2 h-2 rounded-full"
        style={{ top: -4, left: '50%', transform: 'translateX(-50%)', background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
      />
    </motion.div>
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lines, setLines]       = useState([])
  const [visible, setVisible]   = useState(true)

  /*
   * Progress bar — slower increments for a longer, more satisfying
   * loading sequence. Total duration ~3.5s before it triggers exit.
   * Exit fade: 0.65s. onComplete fires 700ms after fade starts.
   * Total visible time: ~5s.
   */
  useEffect(() => {
    let current = 0
    // Slower, more deliberate increments — sum ≈ 100, spread over ~32 steps
    const increments = [4, 3, 5, 4, 6, 3, 5, 4, 3, 6, 4, 5, 3, 4, 6, 3, 5, 4, 6, 3, 4, 5, 3, 6, 4, 5, 3]
    let step = 0
    const interval = setInterval(() => {
      const inc = increments[step % increments.length]
      step++
      current = Math.min(current + inc, 100)
      setProgress(Math.floor(current))
      if (current >= 100) {
        clearInterval(interval)
        // Wait 800ms at 100% so users can read "ALL SYSTEMS GO"
        setTimeout(() => {
          setVisible(false)
          setTimeout(() => onComplete?.(), 700)
        }, 800)
      }
    }, 130) // slightly slower tick
    return () => clearInterval(interval)
  }, [onComplete])

  // Boot lines — paced to match the longer progress bar
  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => setLines((prev) => [...prev, line]), i * 350 + 300)
    })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-void)' }}
          aria-label="Loading Space Bowling"
          role="status"
        >
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
          </div>

          <div className="absolute pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />

          {/* Orbit rings */}
          <div className="relative flex items-center justify-center mb-10 sm:mb-16" style={{ width: 180, height: 180 }}>
            <Ring size={140} duration={12} reverse={false} dotColor="var(--cyan)" />
            <Ring size={190} duration={20} reverse={true}  dotColor="var(--magenta)" />
            <Ring size={240} duration={30} reverse={false} dotColor="var(--violet)" />

            {[0, 0.6, 1.2].map((delay, i) => (
              <motion.div key={i} className="absolute rounded-full border border-[var(--cyan)]/20"
                style={{ width: 70, height: 70 }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeOut' }}
                aria-hidden="true"
              />
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10"
            >
              <div
                className="w-14 h-14 rounded-full border-2 border-[var(--cyan)] flex items-center justify-center"
                style={{ background: 'radial-gradient(circle at 35% 35%, rgba(0,245,255,0.2), transparent)', boxShadow: '0 0 30px rgba(0,245,255,0.3)' }}
                aria-hidden="true"
              >
                <span className="text-2xl">🎳</span>
              </div>
            </motion.div>
          </div>

          {/* Brand — responsive: stacks vertically on very small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 px-4 w-full"
          >
            {/*
              On mobile we break "SPACE" and "BOWLING" onto two lines
              so they never overflow. On sm+ screens they sit side by side.
            */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-2 mb-1">
              <span
                className="font-orbitron font-black gradient-text tracking-widest leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 8vw, 2.5rem)',
                }}
              >
                SPACE
              </span>
              <span
                className="font-orbitron font-thin text-white/50 leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 8vw, 2.5rem)',
                  letterSpacing: '0.3em',
                }}
              >
                BOWLING
              </span>
            </div>
            <p
              className="font-mono-space text-white/30 uppercase mt-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.55rem, 2.5vw, 0.75rem)',
                letterSpacing: '0.4em',
              }}
            >
              KALITHEA · HALKIDIKI · GREECE
            </p>
          </motion.div>

          {/* Boot log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 sm:mb-10 w-full max-w-xs px-6"
          >
            <div className="space-y-1" style={{ minHeight: '7rem' }}>
              {lines.map((line, i) => {
                const isLast = i === lines.length - 1 && lines.length === bootLines.length
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
                    <span className="text-xs flex-shrink-0" style={{ fontFamily: 'var(--font-mono)', color: isLast ? 'var(--cyan)' : 'rgba(255,255,255,0.3)' }}>
                      {isLast ? '✓' : '›'}
                    </span>
                    <span className="font-mono-space tracking-wider" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)', color: isLast ? 'var(--cyan)' : 'rgba(255,255,255,0.35)' }}>
                      {line}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-xs px-6"
          >
            <div className="relative h-px bg-white/10 rounded-full mb-3" style={{ overflow: 'visible' }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--magenta))',
                  boxShadow: '0 0 12px var(--cyan)',
                  transition: 'width 0.15s ease-out',
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                style={{ left: `calc(${progress}% - 4px)`, boxShadow: '0 0 10px white', transition: 'left 0.15s ease-out' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono-space text-xs tracking-[0.2em] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>LOADING</span>
              <span className="font-mono-space text-sm font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}