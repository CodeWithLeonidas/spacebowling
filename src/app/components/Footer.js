'use client'

import { useEffect, useRef } from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

const links = [
  { label: 'Home',     href: '/#home' },
  { label: 'About',    href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Contact',  href: '/#contact' },
]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
        })
      },
      { threshold: 0.1 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-[var(--border-cyan)]"
      style={{ background: 'var(--bg-void)' }}
      aria-label="Space Bowling Greece Footer"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[var(--violet)]/[0.04] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="w-full h-px section-divider" aria-hidden="true" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="reveal">
            <div className="mb-4">
              <span className="font-orbitron text-2xl font-black gradient-text" style={{ fontFamily: 'var(--font-display)' }}>SPACE</span>
              <span className="font-orbitron text-2xl font-thin tracking-[0.4em] text-white/40 ml-1" style={{ fontFamily: 'var(--font-display)' }}>BOWLING</span>
            </div>
            <p className="text-white/50 text-base leading-relaxed max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>
              The ultimate neon bowling experience in Halkidiki, Greece. Signature drinks, billiards, arcade games, and unforgettable nights.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/SpaceBowlingCentre" target="_blank" rel="noopener noreferrer" aria-label="Space Bowling on Facebook"
                className="w-9 h-9 flex items-center justify-center rounded border border-white/[0.08] text-white/40 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all duration-300">
                <FaFacebookF size={14} />
              </a>
              <a href="https://www.instagram.com/spacebowling/" target="_blank" rel="noopener noreferrer" aria-label="Space Bowling on Instagram"
                className="w-9 h-9 flex items-center justify-center rounded border border-white/[0.08] text-white/40 hover:text-[#E1306C] hover:border-[#E1306C]/30 transition-all duration-300">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="reveal reveal-d1">
            <div className="font-mono-space text-xs tracking-[0.4em] text-[var(--cyan)]/50 uppercase mb-6" style={{ fontFamily: 'var(--font-mono)' }}>NAVIGATION</div>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 text-base" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="w-4 h-px bg-white/20 group-hover:w-6 group-hover:bg-[var(--cyan)] transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="reveal reveal-d2">
            <div className="font-mono-space text-xs tracking-[0.4em] text-[var(--cyan)]/50 uppercase mb-6" style={{ fontFamily: 'var(--font-mono)' }}>CONTACT</div>
            <div className="space-y-4">
              {[
                { href: 'tel:+306972033463', icon: '📞', label: 'Call +30 697 203 3463', text: '+30 697 203 3463' },
                { href: 'tel:+306979658337', icon: '📞', label: 'Call +30 697 965 8337', text: '+30 697 965 8337' },
                { href: 'mailto:spacebowling@outlook.com', icon: '✉️', label: 'Email Space Bowling', text: 'spacebowling@outlook.com' },
              ].map(({ href, icon, label, text }) => (
                <a key={href} href={href} aria-label={label}
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 text-base group" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="text-[var(--cyan)]/50 group-hover:text-[var(--cyan)] transition-colors text-sm">{icon}</span>
                  {text}
                </a>
              ))}
              <div className="flex items-center gap-3 text-white/30 text-base" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="text-[var(--cyan)]/40 text-sm">📍</span>
                Kallithea, Halkidiki, Club Aerea
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="reveal pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-space text-xs tracking-[0.2em] text-white/20 uppercase" style={{ fontFamily: 'var(--font-mono)' }} suppressHydrationWarning>
            © {new Date().getFullYear()} Space Bowling Greece. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" aria-hidden="true" />
            <span className="font-mono-space text-xs tracking-[0.3em] text-[var(--cyan)]/40 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              KALITHEA · HALKIDIKI · GREECE
            </span>
          </div>
        </div>
      </div>

      <span className="sr-only">Space Bowling Greece — Neon bowling in Kalithea, Halkidiki. spacebowling@outlook.com, +30 697 203 3463.</span>
    </footer>
  )
}