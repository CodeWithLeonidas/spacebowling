'use client'

import { useEffect, useRef } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FINAL_NIGHTS, REOPENING, hoursLabel, isSeasonOver, nightStatus, useNow } from './season'

const NIGHT_TAG = { open: 'OPEN NOW', tonight: 'TONIGHT' }

function FollowLinks({ className = '' }) {
  return (
    // Wraps to stacked full-width buttons on the narrowest phones instead of overflowing
    <div className={`flex flex-row flex-wrap gap-3 ${className}`}>
      <a
        href="https://www.instagram.com/spacebowling/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Space Bowling on Instagram"
        className="group flex-1 flex items-center justify-center gap-2 px-3 min-h-11 rounded-lg border border-white/[0.1] bg-white/[0.02] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/[0.07] transition-all duration-300"
      >
        <FaInstagram size={17} className="text-[#E1306C]/80 group-hover:text-[#E1306C] transition-colors duration-300 flex-shrink-0" />
        <span className="font-mono-space text-xs tracking-[0.1em] text-white/60 group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-mono)' }}>
          INSTAGRAM
        </span>
      </a>
      <a
        href="https://www.facebook.com/SpaceBowlingCentre"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Space Bowling on Facebook"
        className="group flex-1 flex items-center justify-center gap-2 px-3 min-h-11 rounded-lg border border-white/[0.1] bg-white/[0.02] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/[0.07] transition-all duration-300"
      >
        <FaFacebook size={17} className="text-[#1877F2]/80 group-hover:text-[#1877F2] transition-colors duration-300 flex-shrink-0" />
        <span className="font-mono-space text-xs tracking-[0.1em] text-white/60 group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-mono)' }}>
          FACEBOOK
        </span>
      </a>
    </div>
  )
}

export default function WorkingHours() {
  const sectionRef = useRef(null)
  const now = useNow()
  const over = isSeasonOver(now)

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
          <div className="reveal-left neon-card p-5 sm:p-8" aria-label="Working Hours">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border border-[var(--border-cyan)] text-xl sm:text-2xl flex-shrink-0" aria-hidden="true">🕐</div>
              <div>
                <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>WORKING HOURS</h3>
                <p className="font-mono-space text-[10px] sm:text-xs tracking-widest text-[var(--cyan)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  {over ? `OFF-SEASON · BACK ${REOPENING}` : 'SEASON 2026 · FINAL WEEKEND'}
                </p>
              </div>
            </div>

            {/* Status banner */}
            {over ? (
              <div className="relative mb-6 sm:mb-8 px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-[var(--violet)]/40 bg-[var(--violet)]/[0.1] overflow-hidden shadow-[0_0_30px_rgba(123,47,255,0.15)]">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--violet)] to-[var(--violet)]/60 rounded-l-xl shadow-[0_0_8px_rgba(123,47,255,0.6)]" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 flex-shrink-0 bg-[var(--violet)] shadow-[0_0_10px_rgba(123,47,255,0.8)]" />
                  <p className="font-mono-space text-xs sm:text-sm text-white/85 tracking-wider font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                    CLOSED UNTIL {REOPENING}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative mb-6 sm:mb-8 px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/[0.07] overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--gold)] to-[var(--gold)]/60 rounded-l-xl shadow-[0_0_8px_rgba(255,215,0,0.6)]" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--gold)] shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
                  </span>
                  <p className="font-mono-space text-xs sm:text-sm text-[var(--gold)] tracking-wider font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                    FINAL WEEKEND · 9–11 OCT
                  </p>
                </div>
                <p className="mt-1.5 pl-[22px] text-sm sm:text-base text-white/60 leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                  The last three nights of our 2026 season.
                </p>
              </div>
            )}

            {over ? (
              /* Off-season */
              <div className="text-center py-2 sm:py-4">
                <p className="font-orbitron text-xl sm:text-2xl font-black gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
                  SEE YOU IN {REOPENING}
                </p>
                <p className="mt-3 text-base text-white/60 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                  Thank you for an unforgettable 2026 season! Our lanes are resting for the winter. Follow us to be the first to hear when we reopen.
                </p>
                <FollowLinks className="mt-6" />
              </div>
            ) : (
              <>
                <ul className="space-y-2" aria-label="Final weekend opening hours">
                  {FINAL_NIGHTS.map((night, i) => {
                    const status = nightStatus(night, now)
                    const tag = NIGHT_TAG[status] ?? (i === FINAL_NIGHTS.length - 1 && status !== 'past' ? 'FINAL NIGHT' : null)
                    const live = status === 'open' || status === 'tonight'
                    return (
                      // Reveal classes stay on this static wrapper — the observer adds
                      // .is-visible imperatively, and a changing className would wipe it.
                      <li key={night.day} className={`reveal reveal-d${i + 1}`}>
                        <div
                          className={`flex items-center justify-between gap-3 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 ${
                            live
                              ? 'border-[var(--gold)]/60 bg-[var(--gold)]/[0.06] shadow-[0_0_24px_rgba(255,215,0,0.1)]'
                              : 'border-[var(--border-cyan)]/20 bg-white/[0.01] hover:border-[var(--border-cyan)] hover:bg-[var(--cyan)]/[0.03]'
                          } ${status === 'past' ? 'opacity-40' : ''}`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 sm:w-11 sm:h-11 flex flex-col items-center justify-center rounded-lg border flex-shrink-0 ${live ? 'border-[var(--gold)]/50 bg-[var(--gold)]/[0.08]' : 'border-[var(--border-cyan)] bg-[var(--cyan)]/[0.03]'}`}
                              aria-hidden="true"
                            >
                              <span className="font-orbitron text-sm sm:text-base font-black leading-none text-white" style={{ fontFamily: 'var(--font-display)' }}>{night.date}</span>
                              <span className={`text-[8px] sm:text-[9px] tracking-[0.15em] leading-none mt-1 ${live ? 'text-[var(--gold)]/80' : 'text-[var(--cyan)]/70'}`} style={{ fontFamily: 'var(--font-mono)' }}>OCT</span>
                            </div>
                            <div className="min-w-0">
                              <span className="block text-base sm:text-lg font-semibold text-white/90 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                                {night.day}<span className="sr-only"> {night.date} October</span>
                              </span>
                              {tag && (
                                <span
                                  className={`flex items-center gap-1.5 mt-0.5 text-[9px] sm:text-[10px] tracking-[0.18em] leading-none ${status === 'open' ? 'text-emerald-400' : 'text-[var(--gold)]'}`}
                                  style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                  {status === 'open' && (
                                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                    </span>
                                  )}
                                  {tag}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className={`font-mono-space text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] font-medium whitespace-nowrap flex-shrink-0 tabular-nums ${live ? 'text-[var(--gold)]' : 'text-[var(--cyan)]/80'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                            {hoursLabel(night)}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                {/* After the finale */}
                <div className="mt-6 rounded-xl border border-[var(--violet)]/30 bg-[var(--violet)]/[0.06] p-4 sm:p-5">
                  <p className="font-orbitron text-sm font-bold tracking-[0.08em] sm:tracking-[0.15em] text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    CLOSING FOR WINTER
                  </p>
                  <p className="mt-1 text-sm sm:text-base text-white/60 leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                    From Monday 12 October we&apos;re closed until <span className="text-white/90 font-semibold">Summer 2027</span>
                  </p>
                  <FollowLinks className="mt-4" />
                </div>
              </>
            )}
            <span className="sr-only">Space Bowling Greece nightlife and entertainment venue — Final weekend of the 2026 season: Friday 9 to Sunday 11 October, 18:00 to 01:00. Closed for the winter from Monday 12 October, reopening Summer 2027.</span>
          </div>

          {/* Map Card */}
          <div className="reveal-right neon-card p-5 sm:p-8 flex flex-col" aria-label="Location Map">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border border-[var(--border-cyan)] text-xl sm:text-2xl flex-shrink-0" aria-hidden="true">📍</div>
              <div>
                <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>FIND US HERE</h3>
                <p className="font-mono-space text-[10px] sm:text-xs tracking-widest text-[var(--cyan)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>KALLITHEA · HALKIDIKI · GREECE</p>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-cyan)] relative min-h-[300px] sm:min-h-[360px]">
              <iframe
                className="w-full h-full absolute inset-0"
                style={{ filter: 'invert(0.92) hue-rotate(180deg) saturate(0.8)' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.474560001897!2d23.4511781!3d40.0648254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a62a4ae12c08d3%3A0xeb9fcf264ca5f322!2sSpace%20Bowling!5e0!3m2!1sen!2sgr!4v1741849295332!5m2!1sen!2sgr"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Space Bowling location map — Kallithea Halkidiki Greece"
                aria-label="Google Map showing Space Bowling Greece location"
              />
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--cyan)] z-10 pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--magenta)] z-10 pointer-events-none" aria-hidden="true" />
            </div>

            <div className="mt-4 sm:mt-5 flex items-center gap-3 pt-3 sm:pt-4 border-t border-white/[0.06]">
              <span className="font-mono-space text-xs sm:text-sm tracking-[0.15em] text-white/45 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                Club Aerea · Kallithea · Halkidiki
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Space Bowling Greece location: Club Aerea, Kallithea, Halkidiki tourist district. Premier nightlife, bowling, bar and entertainment destination for tourists and visitors.</span>
    </section>
  )
}