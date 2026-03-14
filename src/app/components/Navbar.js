'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaFacebook, FaInstagram } from 'react-icons/fa'

const navItems = [
  { label: 'HOME',     href: '/#home' },
  { label: 'ABOUT',    href: '/#about' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'GALLERY',  href: '/gallery' },
  { label: 'CONTACT',  href: '/#contact' },
]

const SECTIONS = ['home', 'about', 'services', 'working-hours', 'gallery-preview', 'contact']
const SECTION_TO_NAV = {
  'home':            'HOME',
  'about':           'ABOUT',
  'services':        'SERVICES',
  'working-hours':   'SERVICES',
  'gallery-preview': 'GALLERY',
  'contact':         'CONTACT',
}

export default function Navbar() {
  const pathname      = usePathname()
  const isGallery     = pathname === '/gallery'

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(isGallery) // always solid on gallery
  const [activeNav, setActiveNav]   = useState('HOME')    // set properly in useEffect

  // Set correct active label after mount (avoids SSR/client mismatch)
  useEffect(() => {
    setActiveNav(isGallery ? 'GALLERY' : 'HOME')
    // On gallery page navbar is always solid — no need for scroll check
    if (isGallery) { setScrolled(true); return }

    const onScroll = () => setScrolled(window.scrollY > 40)
    // Check immediately on mount in case page is already scrolled
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isGallery])

  // Section watcher — homepage only
  useEffect(() => {
    if (isGallery) return

    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio))
        let bestId = null, bestRatio = 0
        SECTIONS.forEach((id) => {
          const r = ratios.get(id) ?? 0
          if (r > bestRatio) { bestRatio = r; bestId = id }
        })
        if (bestId && SECTION_TO_NAV[bestId]) setActiveNav(SECTION_TO_NAV[bestId])
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isGallery])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const menuVariants = {
    closed: { x: '100%', transition: { type: 'tween', duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
    open:   { x: 0,      transition: { type: 'tween', duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
  }
  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({ x: 0, opacity: 1, transition: { delay: 0.06 + i * 0.07, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } }),
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#030510]/95 backdrop-blur-xl border-b border-[rgba(0,245,255,0.15)] shadow-[0_4px_60px_rgba(0,245,255,0.07)]'
            : 'py-6 bg-transparent'
        }`}
        aria-label="Main Navigation"
        role="navigation"
      >
        <div className="container mx-auto px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" aria-label="Space Bowling Home" className="group relative flex items-baseline gap-1 flex-shrink-0">
            <span className="font-orbitron text-2xl lg:text-3xl font-black tracking-widest gradient-text leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              SPACE
            </span>
            <span className="font-orbitron text-2xl lg:text-3xl font-thin tracking-[0.35em] text-white/65 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              BOWLING
            </span>
            <span className="absolute -bottom-1.5 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-[var(--cyan)] to-[var(--magenta)] transition-all duration-500" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-10" role="menubar">
            {navItems.map(({ label, href }) => {
              const isActive = activeNav === label
              return (
                <li key={label} role="none">
                  <a href={href} role="menuitem" aria-label={label}
                    className={`relative font-mono-space text-sm tracking-[0.18em] uppercase py-1 transition-colors duration-300 group ${isActive ? 'text-[var(--cyan)]' : 'text-white/60 hover:text-white'}`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-[var(--cyan)] transition-all duration-300"
                      style={{ width: isActive ? '100%' : '0%', boxShadow: isActive ? '0 0 8px var(--cyan)' : 'none' }}
                    />
                    {!isActive && <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/30 group-hover:w-full transition-all duration-300" />}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right: socials + hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-5">
              <a href="https://www.facebook.com/SpaceBowlingCentre" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="text-white/50 hover:text-[#1877F2] transition-all duration-300"><FaFacebook size={20} /></a>
              <a href="https://www.instagram.com/spacebowling/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-white/50 hover:text-[#E1306C] transition-all duration-300"><FaInstagram size={20} /></a>
            </div>

            {/* Hamburger — always rendered, hidden via lg:hidden */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              style={{ display: 'flex' }}
              className="lg:!hidden w-11 h-11 items-center justify-center rounded border border-[var(--border-cyan)] text-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FaTimes size={18} /></motion.span>
                  : <motion.span key="b" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FaBars size={18} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#030510]/75 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div key="menu" variants={menuVariants} initial="closed" animate="open" exit="closed"
              className="fixed top-0 right-0 h-full w-[88vw] max-w-sm z-50 bg-[#060d1f] border-l border-[var(--border-cyan)] flex flex-col"
              role="menu" aria-label="Mobile Navigation"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border-cyan)]">
                <span className="font-orbitron text-base tracking-[0.3em] gradient-text" style={{ fontFamily: 'var(--font-display)' }}>NAVIGATION</span>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center rounded border border-[var(--border-cyan)] text-white/50 hover:text-[var(--cyan)] transition-all duration-300">
                  <FaTimes size={16} />
                </button>
              </div>

              <ul className="flex flex-col px-8 pt-10 gap-6 flex-1" role="none">
                {navItems.map(({ label, href }, i) => {
                  const isActive = activeNav === label
                  return (
                    <motion.li key={label} custom={i} variants={itemVariants} initial="closed" animate="open" exit="closed" role="none">
                      <a href={href} role="menuitem" onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center gap-5 transition-colors duration-300 py-2 ${isActive ? 'text-[var(--cyan)]' : 'text-white/60 hover:text-white'}`}
                      >
                        <span className={`h-px flex-shrink-0 transition-all duration-300 ${isActive ? 'w-10 bg-[var(--cyan)]' : 'w-6 bg-[var(--cyan)]/30 group-hover:w-10 group-hover:bg-[var(--cyan)]'}`} />
                        <span className="font-orbitron text-xl tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{label}</span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="px-8 py-8 border-t border-[var(--border-cyan)]">
                <div className="flex gap-6 mb-5">
                  <a href="https://www.facebook.com/SpaceBowlingCentre" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="text-white/40 hover:text-[#1877F2] transition-all duration-300"><FaFacebook size={24} /></a>
                  <a href="https://www.instagram.com/spacebowling/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="text-white/40 hover:text-[#E1306C] transition-all duration-300"><FaInstagram size={24} /></a>
                </div>
                <p className="font-mono-space text-xs text-white/25 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Kalithea · Halkidiki · GR</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}