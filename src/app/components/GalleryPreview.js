'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GalleryPreview() {
  const images = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery.jpg',
    '/images/gallery10.jpg',
  ]

  const [selectedImage, setSelectedImage] = useState(null)
  const [isPressed, setIsPressed] = useState(false)

  const buttonVariants = {
    idle: { scale: 1 },
    pressed: { scale: 0.95 },
  }

  const handleButtonPress = () => {
    setIsPressed(true)
    setTimeout(() => {
      window.location.href = '/gallery'
      setIsPressed(false)
    }, 400)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  }

  return (
    <section id="gallery-preview" className="py-16 bg-gray-900 text-white" aria-label="Space Bowling Greece Gallery Preview">
      <div className="container mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold mb-6 text-cyan-300"
        >
          Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-8 italic"
        >
          A sneak peek into our space-themed bowling experience!
        </motion.p>
        <span className="sr-only">
          Space Bowling Greece - Fun bowling gallery photos, cosmic bowling, nightlife, tourist attraction in Halkidiki
        </span>
      </div>

      <motion.div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        aria-label="Gallery preview images"
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
            onClick={() => setSelectedImage(src)}
            tabIndex={0}
            aria-label={`View gallery image ${index + 1}`}
            role="button"
          >
            <img
              src={src}
              alt={`Space Bowling Greece cosmic bowling gallery photo ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-lg font-semibold text-white px-4 py-2 bg-blue-600/50 rounded-full">
                View Image
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <motion.button
          className="relative inline-block px-8 py-3 bg-gradient-to-b from-gray-800 to-gray-900 text-cyan-300 rounded-md font-semibold text-lg shadow-lg border border-cyan-300/40 overflow-hidden cursor-pointer hover:brightness-110 transition duration-300"
          variants={buttonVariants}
          initial="idle"
          animate={isPressed ? 'pressed' : 'idle'}
          onClick={handleButtonPress}
          title="View Space Bowling Greece full cosmic gallery"
          aria-label="View full gallery"
        >
          <span className="relative z-10">View Full Gallery</span>
          <span
            className={`absolute inset-0 bg-cyan-300/30 rounded-md transition-all duration-600 ${isPressed ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
              }`}
          />
        </motion.button>
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={() => setSelectedImage(null)}
          aria-label="Enlarged gallery image modal"
        >
          <div
            className="relative bg-gray-900 p-4 rounded-xl shadow-2xl max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300 transition-colors duration-200"
              onClick={() => setSelectedImage(null)}
              aria-label="Close enlarged image"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Space Bowling Greece cosmic bowling enlarged preview"
              className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
