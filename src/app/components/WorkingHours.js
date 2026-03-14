'use client'

import { useEffect, useRef } from 'react'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function WorkingHours() {
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
      id="working-hours"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
      aria-label="Space Bowling Greece Working Hours and Location"
    >
      <div className="absolute top-0 left-0 w-full h-px section-divider pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-px section-divider pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--cyan)]/[0.03] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute grid-bg inset-0 opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="reveal font-mono-space text-sm tracking-[0.4em] text-[var(--cyan)]/60 uppercase block mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            // 03 — FIND US
          </span>
          <h2 className="reveal reveal-d1 font-orbitron text-4xl sm:text-5xl font-black gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
            HOURS & LOCATION
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Hours Card */}
          <div className="reveal-left neon-card p-8" aria-label="Working Hours">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-[var(--border-cyan)] text-2xl flex-shrink-0" aria-hidden="true">🕐</div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>WORKING HOURS</h3>
                <p className="font-mono-space text-xs tracking-widest text-[var(--magenta)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>CLOSED UNTIL SUMMER 2026</p>
              </div>
            </div>

            {/* Status banner */}
            <div className="relative mb-8 px-5 py-4 rounded-xl border border-[var(--magenta)]/20 bg-[var(--magenta)]/[0.04] overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--magenta)] rounded-l-xl" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--magenta)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--magenta)]" />
                </span>
                <p className="font-mono-space text-sm text-[var(--magenta)] tracking-wider font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                  VENUE CLOSED — REOPENING SUMMER 2026
                </p>
              </div>
            </div>

            <ul className="space-y-2" aria-label="Weekly working hours">
              {days.map((day, i) => (
                <li
                  key={day}
                  className={`reveal reveal-d${Math.min(i + 1, 6)} flex items-center justify-between px-4 py-3.5 rounded-lg border border-white/[0.04] hover:border-[var(--border-cyan)] hover:bg-white/[0.02] transition-all duration-300 group`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-5 rounded-full bg-white/10 group-hover:bg-[var(--cyan)] transition-colors duration-300 flex-shrink-0" aria-hidden="true" />
                    <span className="text-lg font-semibold text-white/75" style={{ fontFamily: 'var(--font-body)' }}>{day}</span>
                  </div>
                  <span className="font-mono-space text-sm tracking-[0.2em] text-white/35 font-medium" style={{ fontFamily: 'var(--font-mono)' }}>CLOSED</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="font-mono-space text-xs tracking-widest text-white/30 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                SEASON HOURS: 18:00 – 03:00 DAILY
              </p>
            </div>
            <span className="sr-only">Space Bowling Greece — Open daily 18:00 to 03:00 during season, currently closed until Summer 2026.</span>
          </div>

          {/* Map Card */}
          <div className="reveal-right neon-card p-8 flex flex-col" aria-label="Location Map">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-[var(--border-cyan)] text-2xl flex-shrink-0" aria-hidden="true">📍</div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>FIND US HERE</h3>
                <p className="font-mono-space text-xs tracking-widest text-[var(--cyan)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>KALITHEA · HALKIDIKI · GREECE</p>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-cyan)] relative min-h-[360px]">
              <iframe
                className="w-full h-full absolute inset-0"
                style={{ filter: 'invert(0.92) hue-rotate(180deg) saturate(0.8)' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.474560001897!2d23.4511781!3d40.0648254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a62a4ae12c08d3%3A0xeb9fcf264ca5f322!2sSpace%20Bowling!5e0!3m2!1sen!2sgr!4v1741849295332!5m2!1sen!2sgr"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Space Bowling location map — Kalithea Halkidiki Greece"
                aria-label="Google Map showing Space Bowling Greece location"
              />
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--cyan)] z-10 pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--magenta)] z-10 pointer-events-none" aria-hidden="true" />
            </div>

            <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <span className="font-mono-space text-sm tracking-[0.15em] text-white/45 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                Club Aerea · Kallithea · Halkidiki
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Space Bowling Greece location: Kalithea, Halkidiki, Club Aerea.</span>
    </section>
  )
}