'use client'

import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  }

  return (
    <footer
      className="py-16 text-white relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)',
      }}
      aria-label="Space Bowling Greece Footer"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-25 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={footerVariants}
      >
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div custom={0} variants={itemVariants}>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Space Bowling
            </h2>
            <p className="text-gray-300 text-base md:text-lg mt-3 max-w-md">
              Contact us or follow our journey.
            </p>
            <span className="sr-only">
              Space Bowling Greece - Cosmic bowling contact, address, and social media links
            </span>
          </motion.div>

          <motion.div custom={1} variants={itemVariants} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-8 justify-center text-gray-200 text-base md:text-lg">
              <a
                href="tel:+306972033463"
                className="hover:text-blue-400 transition-colors duration-200"
                title="Call Space Bowling Greece at +30 697 203 3463"
                aria-label="Call Space Bowling Greece at +30 697 203 3463"
              >
                +30 697 203 3463
              </a>
              <a
                href="tel:+306979658337"
                className="hover:text-blue-400 transition-colors duration-200"
                title="Call Space Bowling Greece at +30 697 965 8337"
                aria-label="Call Space Bowling Greece at +30 697 965 8337"
              >
                +30 697 965 8337
              </a>
            </div>
            <a
              href="mailto:spacebowling@outlook.com"
              className="block text-gray-200 hover:text-blue-400 transition-colors duration-200 text-base md:text-lg"
              title="Email Space Bowling Greece at spacebowling@outlook.com"
              aria-label="Email Space Bowling Greece at spacebowling@outlook.com"
            >
              spacebowling@outlook.com
            </a>
          </motion.div>

          <motion.div custom={2} variants={itemVariants}>
            <div className="flex justify-center space-x-10">
              <a
                href="https://www.facebook.com/SpaceBowlingCentre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
                title="Follow Space Bowling Greece on Facebook"
                aria-label="Follow Space Bowling Greece on Facebook"
              >
                <FaFacebookF className="w-8 h-8 md:w-9 md:h-9" />
              </a>
              <a
                href="https://www.instagram.com/spacebowling/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
                title="Follow Space Bowling Greece on Instagram"
                aria-label="Follow Space Bowling Greece on Instagram"
              >
                <FaInstagram className="w-8 h-8 md:w-9 md:h-9" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/50 text-center space-y-2">
          <p className="text-gray-300 text-base" aria-label="Space Bowling Greece address">
            📍 Kallithea, Halkidiki, Club Aerea
          </p>
          <small className="text-gray-400 text-base">
            © {new Date().getFullYear()} Space Bowling. All rights reserved.
          </small>
        </div>
      </motion.div>
    </footer>
  )
}
