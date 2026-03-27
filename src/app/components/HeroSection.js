'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* ── Deterministic stars ─────────────────────────────────────── */
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id:       i,
  x:        (i * 137.508) % 100,
  y:        (i * 97.312)  % 100,
  size:     (i % 3) * 0.6 + 0.8,
  duration: (i % 5) * 0.8 + 2.2,
  delay:    (i % 7) * 0.5,
}))

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {STARS.map((s) => (
        <motion.span key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [1, 1.6, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function OrbitRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
      {[420, 620, 820, 1020].map((size, i) => (
        <motion.div key={size}
          className="absolute rounded-full border border-[var(--cyan)]/[0.06]"
          style={{ width: size, height: size }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 15, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_12px_var(--cyan)]"
            style={{ top: -4, left: '50%', transform: 'translateX(-50%)' }} />
        </motion.div>
      ))}
    </div>
  )
}

function MobileDelayButton({ onClick, className, children, ...props }) {
  const isMobileRef = useRef(false)
  useEffect(() => { isMobileRef.current = window.matchMedia('(hover: none)').matches }, [])
  const handleClick = (e) => {
    if (isMobileRef.current) { e.preventDefault(); setTimeout(() => onClick(e), 220) }
    else onClick(e)
  }
  return (
    <motion.button onClick={handleClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.92 }} className={className} {...props}>
      <span>{children}</span>
    </motion.button>
  )
}

function MobileDelayLink({ href, className, children, ...props }) {
  const isMobileRef = useRef(false)
  useEffect(() => { isMobileRef.current = window.matchMedia('(hover: none)').matches }, [])
  const handleClick = (e) => {
    if (isMobileRef.current) { e.preventDefault(); setTimeout(() => { window.location.href = href }, 220) }
  }
  return (
    <motion.a href={href} onClick={handleClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.92 }} className={className} {...props}>
      <span>{children}</span>
    </motion.a>
  )
}

export default function HeroSection() {
  const bgMobileRef = useRef(null)
  const rafRef      = useRef(null)

  /* Desktop: Framer Motion scroll-driven parallax */
  const { scrollY } = useScroll()
  const yBg         = useTransform(scrollY, [0, 800], [0, 200])
  const yText       = useTransform(scrollY, [0, 500], [0, 70])
  const opacityText = useTransform(scrollY, [0, 350], [1, 0])

  /*
   * Mobile parallax — matches desktop behaviour exactly
   * ────────────────────────────────────────────────────
   * Desktop: bg starts at y=0 and moves to y=+200px as you scroll
   * 800px. The image is scale(1.12) so it has room to move down.
   *
   * Mobile: we do the same thing.
   * - bg is scaled to 1.25 (gives ~25% extra height = ~200px on a
   *   typical mobile screen) so it can travel downward without
   *   revealing the bottom edge.
   * - On scroll we set translateY = +scrollY * 0.25 (positive = down)
   *   matching the desktop ratio (200/800 = 0.25).
   * - We use matrix3d via translate3d so the GPU compositor thread
   *   handles it without involving the main thread.
   */
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (!isMobile) return

    const el = bgMobileRef.current
    if (!el) return

    // Set initial state — scale(1.25) centred, y=0
    // Use translate3d(0,0,0) to force GPU layer promotion
    el.style.transform    = 'translate3d(0px, 0px, 0px) scale(1.25)'
    el.style.willChange   = 'transform'
    // Remove any CSS animation that might conflict
    el.style.animation    = 'none'

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafRef.current = requestAnimationFrame(() => {
        // Positive Y = bg moves DOWN = slower than page = classic parallax
        const offset = window.scrollY * 0.25
        // translate3d is GPU-composited; scale is applied after in same matrix
        el.style.transform = `translate3d(0px, ${offset}px, 0px) scale(1.25)`
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleScrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      aria-label="Space Bowling Greece — Hero Section"
    >
      {/*
        Both background layers always in the DOM.
        CSS media queries in globals.css show/hide the correct one.

        Mobile (.hero-bg-mobile):
          Initial transform set by CSS (scale 1.25, y 0).
          JS rAF listener updates translateY directly on scroll.

        Desktop (.hero-bg-desktop):
          Framer Motion useTransform drives y continuously.
      */}

      {/* Mobile background */}
      <div
        ref={bgMobileRef}
        className="hero-bg-mobile absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero2.jpg')" }}
        aria-hidden="true"
      />

      {/* Desktop background */}
      <motion.div
        className="hero-bg-desktop absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero2.jpg')", y: yBg, scale: 1.12 }}
        aria-hidden="true"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030510]/82 via-[#030510]/45 to-[#030510]/92" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,245,255,0.07),transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <StarField />
      <OrbitRings />

      {/*
        Content wrapper.
        Desktop: Framer drives y + opacity via inline styles.
        Mobile: .hero-content CSS rule resets Framer's inline
                styles so the content stays visible and static
                (no content parallax on mobile — just the bg).
      */}
      <motion.div
        className="hero-content relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--magenta)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--magenta)]" />
          </span>
          <span
            className="font-mono-space text-xs tracking-[0.3em] text-[var(--magenta)] uppercase border border-[var(--magenta)]/30 px-4 py-1.5 rounded-full backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            REOPENING SUMMER 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h1
            className="font-orbitron text-6xl sm:text-7xl lg:text-9xl font-black leading-none tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="gradient-text glitch-text" data-text="STRIKE">STRIKE</span>
          </h1>
          <h2
            className="font-orbitron text-3xl sm:text-4xl lg:text-6xl font-thin tracking-[0.4em] text-white/40 mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            THIS
          </h2>
          <h2
            className="font-orbitron text-4xl sm:text-5xl lg:text-7xl font-black tracking-widest neon-cyan"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            UNIVERSE
          </h2>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <MobileDelayButton onClick={handleScrollToServices} className="btn-neon" aria-label="Explore services">
            EXPLORE SERVICES
          </MobileDelayButton>
          <MobileDelayLink href="/gallery" className="btn-neon btn-neon-mag" aria-label="View gallery">
            VIEW GALLERY
          </MobileDelayLink>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        aria-hidden="true"
      >
        <span className="font-mono-space text-[10px] tracking-[0.3em] text-white/30 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[var(--cyan)] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <span className="sr-only">
        Space Bowling Greece — Top nightlife, entertainment, bowling bar, cocktails, arcade games and billiards in Kalithea, Halkidiki. Best things to do for tourists. Premium tourist attraction with free WiFi and parking. Reopening Summer 2026.
      </span>
    </header>
  )
}