'use client'

import { useEffect, useRef } from 'react'
import SaturnBall from './SaturnBall'

const stats = [
  { value: '6', label: 'BOWLING LANES' },
  { value: '10+', label: 'YEARS OF FUN' },
  { value: '1', label: 'BILLIARD TABLE' },
  { value: '∞', label: 'GOOD TIMES' },
]

export default function AboutUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
      aria-label="About Space Bowling Greece"
    >
      <div className="absolute top-0 left-0 w-full h-px section-divider pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-px section-divider pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--violet)]/[0.04] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute grid-bg inset-0 opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-20 text-center">
          <span className="reveal font-mono-space text-sm tracking-[0.4em] text-[var(--cyan)]/60 uppercase block mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            // 01 — WHO WE ARE
          </span>
          <h2 className="reveal reveal-d1 font-orbitron text-4xl sm:text-5xl font-black gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
            ABOUT US
          </h2>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Image */}
          <div className="reveal-left relative flex items-center justify-center">
            <SaturnBall />
          </div>

          {/* Text */}
          <div className="reveal-right flex flex-col gap-8">
            <h3
              className="font-orbitron text-3xl sm:text-4xl font-bold leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              EXPERIENCE BOWLING{' '}
              <span className="gradient-text">LIKE NEVER BEFORE</span>
            </h3>
            <p className="text-white/65 text-xl leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Welcome to Space Bowling where the thrill of the lanes meets the
              excitement of outer space. Nestled in Greece's stunning tourist district
              of Kalithea, Halkidiki, we invite you to step into an adventure like no other.
            </p>
            <p className="text-white/50 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Our unique atmosphere blends state of the art bowling lanes with
              captivating space inspired decor creating an immersive experience for
              all ages. Whether you're here for a friendly game, sipping signature
              cocktails, or looking for the best nightlife in Halkidiki, we promise an
              unforgettable night.
            </p>
            <a
              href="/#contact"
              className="btn-neon self-start mt-2"
              aria-label="Get in touch with Space Bowling"
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>
        </div>

        {/* Stats no hover effects, purely decorative display cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal reveal-d${i + 1} bg-[var(--bg-card)] border border-[var(--border-cyan)] rounded-2xl p-6 text-center`}
            >
              <div
                className="font-orbitron text-4xl font-black gradient-text mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.value}
              </div>
              <div
                className="font-mono-space text-xs tracking-[0.25em] text-white/40 uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">
        Space Bowling Greece — premier tourist attraction and entertainment venue in Kalithea Halkidiki. Things to do in Halkidiki: bowling, nightlife, bar, billiards, arcade games. Fun activities for tourists, families, groups, and couples. Best evening entertainment destination.
      </span>
    </section>
  )
}