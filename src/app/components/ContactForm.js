'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

const fields = [
  { id: 'name', name: 'user_name', label: 'YOUR NAME', type: 'text', placeholder: 'John Doe', autoComplete: 'name' },
  { id: 'email', name: 'email_from', label: 'YOUR EMAIL', type: 'email', placeholder: 'youremail@example.com', autoComplete: 'email' },
  { id: 'message', name: 'message', label: 'YOUR MESSAGE', type: 'textarea', placeholder: 'Write your message here...', autoComplete: 'off' },
]

const contactInfo = [
  { icon: '📞', label: 'PHONE', value: '+30 697 203 3463', href: 'tel:+306972033463' },
  { icon: '📞', label: 'PHONE', value: '+30 697 965 8337', href: 'tel:+306979658337' },
  { icon: '✉️', label: 'EMAIL', value: 'spacebowling@outlook.com', href: 'mailto:spacebowling@outlook.com' },
  { icon: '📍', label: 'ADDRESS', value: 'Kalithea, Halkidiki, GR', href: null },
]

/* ── Submit button — spinner perfectly inline with text ──────── */
function SubmitButton({ isLoading }) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.93 } : {}}
      className="btn-neon w-full disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Send message"
      style={{ display: 'block' }}
    >
      {/* Single span keeps btn-neon's z-index layer intact while
          centering the flex content properly */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          lineHeight: 1,
        }}
      >
        {isLoading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              display: 'inline-block',
              width: '1.1em',
              height: '1.1em',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
        )}
        <span>{isLoading ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
      </span>
    </motion.button>
  )
}

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    setIsLoading(true)
    setFormStatus(null)
    emailjs.sendForm('spacebowling2025', 'template_n8t7g95', form, 'cBkZDu2g-J9pScX_S')
      .then(() => { setFormStatus('success'); form.reset() })
      .catch(() => setFormStatus('error'))
      .finally(() => setIsLoading(false))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
      aria-label="Contact Space Bowling Greece"
    >
      {/* BG layers — all pointer-events-none */}
      <div className="absolute top-0 left-0 w-full h-px section-divider pointer-events-none" aria-hidden="true" />
      <div className="absolute left-0 bottom-1/3 w-[400px] h-[400px] rounded-full bg-[var(--cyan)]/[0.04] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] rounded-full bg-[var(--magenta)]/[0.03] blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="reveal font-mono-space text-sm tracking-[0.4em] text-[var(--cyan)]/60 uppercase block mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            // 05 — REACH OUT
          </span>
          <h2 className="reveal reveal-d1 font-orbitron text-4xl sm:text-5xl font-black gradient-text mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            CONTACT US
          </h2>
          <p className="reveal reveal-d2 text-white/55 text-xl italic max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Have questions or want to plan your visit? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* Sidebar */}
          <div className="reveal-left lg:col-span-2 flex flex-col gap-4">

            {contactInfo.map(({ icon, label, value, href }, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} neon-card p-5 flex items-start gap-4`}>
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div className="flex-1">
                  <div className="font-mono-space text-xs tracking-[0.3em] text-[var(--cyan)] mb-1.5">{label}</div>
                  {href ? (
                    <span className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                      {value}
                    </span>
                  ) : (
                    <span className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                      {value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Follow Us — side by side, fully clickable */}
            <div className="reveal reveal-d5 neon-card p-5" style={{ position: 'relative', zIndex: 20 }}>
              <div className="font-mono-space text-xs tracking-[0.3em] text-[var(--cyan)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                FOLLOW US
              </div>
              <div className="flex flex-row gap-3" style={{ position: 'relative', zIndex: 20 }}>
                <a
                  href="https://www.facebook.com/SpaceBowlingCentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Space Bowling on Facebook"
                  className="group flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg border border-white/[0.08] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/[0.07] transition-all duration-300"
                  style={{ zIndex: 20, position: 'relative', textDecoration: 'none' }}
                >
                  <FaFacebook size={17} className="text-white/45 group-hover:text-[#1877F2] transition-colors duration-300 flex-shrink-0" />
                  <span className="font-mono-space text-xs tracking-[0.1em] text-white/45 group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-mono)' }}>
                    FACEBOOK
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/spacebowling/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Space Bowling on Instagram"
                  className="group flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg border border-white/[0.08] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/[0.07] transition-all duration-300"
                  style={{ zIndex: 20, position: 'relative', textDecoration: 'none' }}
                >
                  <FaInstagram size={17} className="text-white/45 group-hover:text-[#E1306C] transition-colors duration-300 flex-shrink-0" />
                  <span className="font-mono-space text-xs tracking-[0.1em] text-white/45 group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'var(--font-mono)' }}>
                    INSTAGRAM
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right lg:col-span-3 neon-card p-8" style={{ position: 'relative', zIndex: 10 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[var(--magenta)]/60" />
                <span className="w-3 h-3 rounded-full bg-[var(--cyan)]/60" />
                <span className="w-3 h-3 rounded-full bg-[var(--violet)]/60" />
              </div>
              <span className="font-mono-space text-xs tracking-[0.3em] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
                SEND_MESSAGE.EXE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form" noValidate>
              {fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2" style={{ position: 'relative', zIndex: 10 }}>
                  <label htmlFor={field.id} className="font-mono-space text-xs tracking-[0.3em] text-[var(--cyan)]/80 cursor-pointer" style={{ fontFamily: 'var(--font-mono)' }}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id} name={field.name} placeholder={field.placeholder}
                      required autoComplete={field.autoComplete} aria-label={field.label} rows={5}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#030510] border border-white/[0.08] text-white text-base placeholder-white/25 resize-y focus:border-[var(--cyan)] focus:outline-none"
                      style={{ fontFamily: 'var(--font-body)', position: 'relative', zIndex: 10 }}
                    />
                  ) : (
                    <input
                      type={field.type} id={field.id} name={field.name} placeholder={field.placeholder}
                      required autoComplete={field.autoComplete} aria-label={field.label}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#030510] border border-white/[0.08] text-white text-base placeholder-white/25 focus:border-[var(--cyan)] focus:outline-none"
                      style={{ fontFamily: 'var(--font-body)', position: 'relative', zIndex: 10 }}
                    />
                  )}
                </div>
              ))}

              <AnimatePresence>
                {formStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`px-5 py-4 rounded-lg border text-base font-semibold ${formStatus === 'success'
                        ? 'border-[var(--cyan)]/30 bg-[var(--cyan)]/[0.07] text-[var(--cyan)]'
                        : 'border-[var(--magenta)]/30 bg-[var(--magenta)]/[0.07] text-[var(--magenta)]'
                      }`}
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', position: 'relative', zIndex: 10 }}
                    role="status" aria-live="polite"
                  >
                    {formStatus === 'success' ? "✓  MESSAGE SENT — WE'LL BE IN TOUCH SOON" : '✕  SOMETHING WENT WRONG — PLEASE TRY AGAIN'}
                  </motion.div>
                )}
              </AnimatePresence>

              <SubmitButton isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Space Bowling Greece contact — Phone: +30 697 203 3463. Email: spacebowling@outlook.com.
      </span>
    </section>
  )
}