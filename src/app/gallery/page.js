/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  '/images/gallery.jpg',
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery7.jpg',
  '/images/gallery8.jpg',
  '/images/gallery9.jpg',
  '/images/gallery10.jpg',
  '/images/gallery11.jpg',
  '/images/gallery12.jpg',
  '/images/gallery13.jpg',
  '/images/gallery14.jpg',
  '/images/gallery15.jpg',
  '/images/gallery16.jpg',
  '/images/gallery17.jpg',
  '/images/gallery18.jpg',
  '/images/gallery19.jpg',
  '/images/gallery20.jpg',
  '/images/gallery21.jpg',
  '/images/gallery22.jpg',
  '/images/gallery23.jpg',
  '/images/gallery24.jpg',
  '/images/gallery25.jpg',
  '/images/gallery26.jpg',
]

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)
  const [selIdx, setSelIdx]     = useState(null)

  const open  = (src, i) => { setSelected(src); setSelIdx(i) }
  const close = () => { setSelected(null); setSelIdx(null) }
  const nav   = (dir) => {
    const next = (selIdx + dir + images.length) % images.length
    setSelected(images[next])
    setSelIdx(next)
  }

  return (
    /* No <main> here — layout.js already wraps children in <main> */
    <div
      className="relative min-h-screen"
      style={{ background: 'var(--bg-void)' }}
      aria-label="Space Bowling Greece Full Gallery"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[var(--cyan)]/[0.04] blur-[120px] pointer-events-none" aria-hidden="true" />

      {/* pt-28 clears the fixed navbar height */}
      <div className="pt-28 pb-16 px-6 relative z-10">

        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span
            className="font-mono-space text-sm tracking-[0.4em] text-[var(--cyan)]/60 uppercase block mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // VISUAL ARCHIVE
          </span>
          <h1
            className="font-orbitron text-5xl sm:text-6xl font-black gradient-text mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            OUR GALLERY
          </h1>
          <p
            className="text-white/50 text-lg italic max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Step inside our neon-lit bowling venue — captured in every frame.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="font-mono-space text-xs tracking-[0.3em] text-white/25" style={{ fontFamily: 'var(--font-mono)' }}>
              {images.length} IMAGES
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--cyan)]/40" />
            <span className="font-mono-space text-xs tracking-[0.3em] text-white/25" style={{ fontFamily: 'var(--font-mono)' }}>
              KALITHEA · HALKIDIKI
            </span>
          </div>
        </motion.header>

        {/* Image grid */}
        <section
          className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
          aria-label="Space Bowling Gallery Images"
        >
          {images.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.025, 0.5) }}
              className="relative group cursor-pointer rounded-xl overflow-hidden border border-white/[0.05] hover:border-[var(--cyan)]/40 transition-all duration-300 aspect-square"
              onClick={() => open(img, i)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && open(img, i)}
              aria-label={`View gallery image ${i + 1}`}
              role="button"
            >
              <img
                src={img}
                alt={`Space Bowling Greece — neon bowling gallery photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading={i < 8 ? 'eager' : 'lazy'}
              />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-[#030510]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                  <span className="font-mono-space text-[9px] tracking-widest text-[var(--cyan)] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>VIEW</span>
                </div>
                <span className="font-mono-space text-[9px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </section>

        {/* Back button */}
        <div className="text-center mt-16">
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-neon inline-block"
            aria-label="Return to Space Bowling homepage"
          >
            <span>BACK TO HOME</span>
          </motion.a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
            onClick={close}
            aria-modal="true" role="dialog" aria-label="Enlarged image"
          >
            <div className="absolute inset-0 bg-[#030510]/96 backdrop-blur-xl" aria-hidden="true" />

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-cyan)] shadow-[0_0_80px_rgba(0,245,255,0.1)]">
                <img
                  src={selected}
                  alt={`Space Bowling Greece — enlarged gallery image ${selIdx + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain bg-[#060d1f]"
                />
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--cyan)] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--magenta)] pointer-events-none" aria-hidden="true" />
              </div>

              <div className="absolute top-3 right-3 z-20">
                <button onClick={close}
                  className="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-cyan)] bg-[#030510]/90 text-white/50 hover:text-[var(--cyan)] transition-all duration-300 text-xl"
                  aria-label="Close">×</button>
              </div>
              <button onClick={() => nav(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded border border-[var(--border-cyan)] bg-[#030510]/90 text-white/50 hover:text-[var(--cyan)] transition-all duration-300 text-2xl z-20"
                aria-label="Previous">‹</button>
              <button onClick={() => nav(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded border border-[var(--border-cyan)] bg-[#030510]/90 text-white/50 hover:text-[var(--cyan)] transition-all duration-300 text-2xl z-20"
                aria-label="Next">›</button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-space text-[10px] tracking-[0.3em] text-white/30 z-20" style={{ fontFamily: 'var(--font-mono)' }}>
                {String(selIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only">
        Space Bowling Greece full gallery — neon bowling photos from Kalithea, Halkidiki.
      </span>
    </div>
  )
}