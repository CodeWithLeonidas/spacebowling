'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '🎳',
    title: 'Bowling Lanes',
    short: '6 STATE OF THE ART LANES',
    desc: 'Six fully equipped space-themed bowling lanes with automated scoring, neon lighting, and professional equipment. Strike your way through the universe for players of all skill levels.',
    accent: 'var(--cyan)',
    price: '5.5€ / player / game',
  },
  {
    icon: '🎱',
    title: 'Billiard',
    short: '1 PREMIUM TABLE',
    desc: 'Challenge your friends to a game of billiard on our premium table. Competitive play, relaxed vibes, and electric atmosphere.',
    accent: 'var(--violet)',
    price: '10€ / hour',
  },
  {
    icon: '🍹',
    title: 'The Bar',
    short: 'SIGNATURE COCKTAILS',
    desc: 'From classic cocktails to unique signature creations, our bar offers a stellar selection of drinks to elevate your night under the stars.',
    accent: 'var(--magenta)',
    price: 'Full bar menu',
  },
  {
    icon: '🕹️',
    title: 'Arcade Zone',
    short: 'RETRO & MODERN GAMES',
    desc: 'Compete with friends in exciting arcade games. Fun, challenges, and high scores await in our dedicated gaming zone.',
    accent: 'var(--cyan)',
    price: 'Varies by game',
  },
  {
    icon: '📶',
    title: 'Free WiFi',
    short: 'STAY CONNECTED',
    desc: 'Stay connected throughout your visit. High-speed WiFi available across the entire venue share the experience instantly.',
    accent: 'var(--violet)',
    price: 'FREE',
  },
  {
    icon: '🅿️',
    title: 'Free Parking',
    short: 'AMPLE SPACE',
    desc: 'No parking stress here. We offer free, spacious parking for all our guests because the adventure starts the moment you arrive.',
    accent: 'var(--magenta)',
    price: 'FREE',
  },
]

/* ── Ticker ──────────────────────────────────────────────────── */
function Ticker() {
  const items = ['BOWLING', 'BILLIARDS', 'COCKTAILS', 'ARCADE', 'WIFI', 'PARKING', 'HALKIDIKI', 'NEON']
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-[var(--border-cyan)] py-4 my-16" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 mr-6">
            <span className="font-orbitron text-xs tracking-[0.4em] text-white/25 uppercase" style={{ fontFamily: 'var(--font-display)' }}>{item}</span>
            <span className="text-[var(--cyan)]/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Service Card ────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const delayClass = ['reveal-d1','reveal-d2','reveal-d3','reveal-d4','reveal-d5','reveal-d6'][index] || ''

  return (
    <div
      className={`reveal ${delayClass} service-card group`}
      style={{ '--card-accent': service.accent }}
      aria-label={service.title}
    >
      {/* Animated corner accents */}
      <div className="service-card-corner service-card-corner--tl" aria-hidden="true" />
      <div className="service-card-corner service-card-corner--br" aria-hidden="true" />

      {/* Glow orb behind icon */}
      <div className="service-card-glow" aria-hidden="true" />

      {/* Scan line effect on hover */}
      <div className="service-card-scanline" aria-hidden="true" />

      {/* Icon */}
      <div className="relative mb-5 z-[1]">
        <div className="service-card-icon">
          <span className="text-3xl sm:text-4xl">{service.icon}</span>
        </div>
        {/* Pulse ring */}
        <div className="service-card-pulse" aria-hidden="true" />
      </div>

      {/* Index number */}
      <span
        className="absolute top-4 right-5 font-mono-space text-[10px] tracking-[0.3em] opacity-20 group-hover:opacity-50 transition-opacity duration-300"
        style={{ fontFamily: 'var(--font-mono)', color: service.accent }}
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      {/* Label */}
      <div
        className="font-mono-space text-[11px] sm:text-xs font-semibold tracking-[0.25em] mb-2 relative z-[1]"
        style={{ color: service.accent, fontFamily: 'var(--font-mono)' }}
      >
        {service.short}
      </div>

      {/* Title */}
      <h3
        className="font-orbitron text-lg sm:text-xl font-bold text-white mb-3 relative z-[1]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-5 relative z-[1]" style={{ fontFamily: 'var(--font-body)' }}>
        {service.desc}
      </p>

      {/* Price tag */}
      <div className="service-card-price relative z-[1]">
        <span className="service-card-price-dot" aria-hidden="true" />
        {service.price}
      </div>

      {/* Bottom gradient bar */}
      <div className="service-card-bar" aria-hidden="true" />
    </div>
  )
}

/* ── Main Section ────────────────────────────────────────────── */
export default function OurServices() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'var(--bg-void)' }}
      aria-label="Space Bowling Greece Services"
    >
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--violet)]/[0.05] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--cyan)]/[0.04] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute grid-bg inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-4 text-center">
          <span className="reveal font-mono-space text-sm tracking-[0.4em] text-[var(--cyan)]/60 uppercase block mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            // 02 WHAT WE OFFER
          </span>
          <h2 className="reveal reveal-d1 font-orbitron text-4xl sm:text-5xl font-black gradient-text mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            OUR SERVICES
          </h2>
          <p className="reveal reveal-d2 text-white/50 text-xl max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Ready to strike? Discover this universe of neon bowling excellence and unbeatable entertainment services at Space Bowling Greece.
          </p>
        </div>

        <Ticker />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>

      <span className="sr-only">
        Space Bowling Greece services and amenities: 6 bowling lanes 5.5€ per player, billiard table 10€/hour, cocktail bar with signature drinks, free high-speed WiFi, free parking, retro and modern arcade games. Best nightlife, bar, and entertainment venue in Halkidiki. Top things to do for tourists visiting Kalithea.
      </span>
    </section>
  )
}