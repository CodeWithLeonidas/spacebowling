'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery.jpg',
  '/images/gallery10.jpg',
]

const layout = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
]

function MobileDelayLink({ href, className, children }) {
  const handleClick = (e) => {
    const isMobile = window.matchMedia('(hover: none)').matches
    if (isMobile) { e.preventDefault(); setTimeout(() => { window.location.href = href }, 220) }
  }
  return (
    <motion.a href={href} onClick={handleClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.92 }} className={className}>
      <span>{children}</span>
    </motion.a>
  )
}

export default function GalleryPreview() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const sectionRef = useRef(null)

  const openImage = (src, i) => { setSelectedImage(src); setSelectedIndex(i) }
  const closeImage = () => { setSelectedImage(null); setSelectedIndex(null) }
  const navigate = (dir) => {
    const next = (selectedIndex + dir + images.length) % images.length
    setSelectedImage(images[next]); setSelectedIndex(next)
  }

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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="gallery-preview"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'var(--bg-void)' }}
      aria-label="Space Bowling Greece Gallery Preview"
    >
      <div className="absolute top-0 left-0 w-full h-px section-divider pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[var(--magenta)]/[0.04] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute grid-bg inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="reveal font-mono-space text-sm tracking-[0.4em] text-[var(--cyan)]/60 uppercase block mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            // 04 — VISUAL LOG
          </span>
          <h2 className="reveal reveal-d1 font-orbitron text-4xl sm:text-5xl font-black gradient-text mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            GALLERY
          </h2>
          <p className="reveal reveal-d2 text-white/50 text-lg italic max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            A visual transmission from our neon-lit bowling universe.
          </p>
        </div>

        {/* Mobile grid — simple 2-col */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-3" aria-label="Gallery preview images">
            {images.map((src, i) => (
              <div
                key={i}
                className={`reveal reveal-d${Math.min(i + 1, 6)} relative group cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] hover:border-[var(--cyan)]/40 transition-all duration-500 aspect-square`}
                onClick={() => openImage(src, i)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openImage(src, i)}
                aria-label={`View gallery image ${i + 1}`}
                role="button"
              >
                <img src={src} alt={`Space Bowling Greece gallery photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030510]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="font-mono-space text-[10px] tracking-widest text-[var(--cyan)] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>VIEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop mosaic */}
        <div className="hidden md:grid grid-cols-4 gap-3" style={{ gridAutoRows: '200px' }} aria-label="Gallery preview images">
          {images.map((src, i) => (
            <div
              key={i}
              className={`reveal reveal-d${Math.min(i + 1, 6)} relative group cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] hover:border-[var(--cyan)]/40 transition-all duration-500 ${layout[i] || ''}`}
              onClick={() => openImage(src, i)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openImage(src, i)}
              aria-label={`View gallery image ${i + 1}`}
              role="button"
            >
              <img src={src} alt={`Space Bowling Greece — neon bowling gallery photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030510]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                  <span className="font-mono-space text-[11px] tracking-widest text-[var(--cyan)] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>VIEW</span>
                </div>
              </div>
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--cyan)]/0 group-hover:border-[var(--cyan)]/60 transition-all duration-400" aria-hidden="true" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--magenta)]/0 group-hover:border-[var(--magenta)]/60 transition-all duration-400" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-14">
          <MobileDelayLink href="/gallery" className="btn-neon inline-block" aria-label="View full gallery">
            VIEW FULL GALLERY
          </MobileDelayLink>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={closeImage}
            aria-modal="true" role="dialog" aria-label="Enlarged gallery image"
          >
            <div className="absolute inset-0 bg-[#030510]/95 backdrop-blur-xl" aria-hidden="true" />
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-cyan)] shadow-[0_0_80px_rgba(0,245,255,0.12)]">
                <img src={selectedImage} alt="Space Bowling Greece enlarged gallery photo" className="w-full h-auto max-h-[80vh] object-contain bg-[#060d1f]" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--cyan)] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--magenta)] pointer-events-none" aria-hidden="true" />
              </div>
              <div className="absolute top-4 right-4 z-20">
                <button onClick={closeImage} className="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-cyan)] bg-[#030510]/80 text-white/60 hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-all duration-300 text-xl" aria-label="Close">×</button>
              </div>
              <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded border border-[var(--border-cyan)] bg-[#030510]/80 text-white/60 hover:text-[var(--cyan)] transition-all duration-300 text-2xl z-20" aria-label="Previous">‹</button>
              <button onClick={() => navigate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded border border-[var(--border-cyan)] bg-[#030510]/80 text-white/60 hover:text-[var(--cyan)] transition-all duration-300 text-2xl z-20" aria-label="Next">›</button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-space text-[10px] tracking-[0.3em] text-white/30 z-20" style={{ fontFamily: 'var(--font-mono)' }}>{selectedIndex + 1} / {images.length}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only">Space Bowling Greece gallery — neon bowling photos, neon lanes, nightlife and fun in Halkidiki.</span>
    </section>
  )
}