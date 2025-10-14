'use client'

import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function OurServices() {
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3 },
    },
  }

  const [flipped, setFlipped] = useState(false)
  const [activePriceIdx, setActivePriceIdx] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const priceItems = [
    {
      icon: '🎳',
      title: 'Bowling Game',
      price: '5,5€',
      desc: 'for each player per one game',
    },
    {
      icon: '🧦',
      title: 'Buy Socks',
      price: '1€',
      desc: '(Optional)',
    },
    {
      icon: '🎱',
      title: 'Billiard',
      price: '10€',
      desc: '/ hour',
    },
  ]

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white relative overflow-hidden"
      aria-label="Space Bowling Greece Services"
    >
      {/* Starry background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzdGFycyIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMS41IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RhcnMpIi8+PC9zdmc+')] opacity-20"></div>

      {/* Header */}
      <div className="container mx-auto text-center mb-12 relative z-10">
        <motion.h2
          className="text-5xl font-bold mb-6 text-cyan-300 drop-shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-lg text-gray-200 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Ready to strike this universe? Discover the best cosmic bowling experience and unbeatable services at Space Bowling Greece!
        </motion.p>
        <span className="sr-only">
          Space Bowling Greece offers bowling, billiard, drinks, cocktails, arcade games, free WiFi, and free parking in Halkidiki.
        </span>
      </div>

      {/* Cards grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 relative z-10">
        {/* Fair Prices (Flip Card) */}
        <motion.div
          className="service-item relative [perspective:1000px] flex justify-center items-center min-h-[300px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
          aria-label="Fair Prices"
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className={`absolute inset-0 bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 transition-colors duration-300 [backface-visibility:hidden] flex flex-col items-center justify-center text-center w-full h-full ${!flipped ? 'hover:border-cyan-500' : ''}`}
            style={{ transition: 'border-color 0.3s', borderRadius: '1rem' }}>
              <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
                <i className="fas fa-tag" aria-label="Fair pricing icon"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Fair Prices</h3>
              <p className="text-gray-300">
                We offer competitive prices so you can enjoy bowling without breaking the bank.
              </p>
              <p
                className="mt-4 text-sm text-cyan-300 cursor-pointer"
                onClick={() => setFlipped(true)}
                tabIndex={0}
                aria-label="Show price list"
                role="button"
              >
                Click to see prices
              </p>
            </div>

            {/* Back */}
            <div className={`absolute inset-0 bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 transition-colors duration-300 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center w-full h-full ${flipped ? 'hover:border-cyan-500' : ''}`}
            style={{ transition: 'border-color 0.3s', borderRadius: '1rem' }}>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-300">Price List</h3>
              {/* Mobile: show one item with anchors */}
              <div className="block sm:hidden w-full max-w-xs mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <button
                    aria-label="Previous price"
                    className={`p-2 text-cyan-300 ${activePriceIdx === 0 ? 'opacity-40 cursor-default' : ''}`}
                    disabled={activePriceIdx === 0}
                    onClick={() => {
                      setSwipeDirection(-1);
                      setActivePriceIdx(idx => Math.max(0, idx - 1));
                    }}
                  >
                    &#8592;
                  </button>
                  <div className="flex-1 flex flex-col items-center p-2 overflow-hidden" style={{ minHeight: 120 }}>
                    <AnimatePresence initial={false} mode="wait">
                      <motion.div
                        key={activePriceIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="w-full flex flex-col items-center"
                        aria-live="polite"
                      >
                        <span className="text-3xl" aria-label={priceItems[activePriceIdx].title}>{priceItems[activePriceIdx].icon}</span>
                        <span className="font-semibold mt-2 text-center">{priceItems[activePriceIdx].title}</span>
                        <span className="mt-1 text-cyan-300">{priceItems[activePriceIdx].price}</span>
                        <span className="text-sm text-gray-400 text-center">{priceItems[activePriceIdx].desc}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <button
                    aria-label="Next price"
                    className={`p-2 text-cyan-300 ${activePriceIdx === priceItems.length - 1 ? 'opacity-40 cursor-default' : ''}`}
                    disabled={activePriceIdx === priceItems.length - 1}
                    onClick={() => {
                      setSwipeDirection(1);
                      setActivePriceIdx(idx => Math.min(priceItems.length - 1, idx + 1));
                    }}
                  >
                    &#8594;
                  </button>
                </div>
                <div className="flex justify-center gap-2 mt-2" aria-label="Price list navigation dots">
                  {priceItems.map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i === activePriceIdx ? 'bg-cyan-300' : 'bg-gray-700'}`}></span>
                  ))}
                </div>
              </div>
              {/* Desktop: show grid */}
              <div className="hidden sm:grid grid-cols-3 gap-4 w-full max-w-full text-gray-300 overflow-hidden">
                {priceItems.map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-2">
                    <span className="text-3xl" aria-label={item.title}>{item.icon}</span>
                    <span className="font-semibold mt-2 text-center">{item.title}</span>
                    <span className="mt-1 text-cyan-300">{item.price}</span>
                    <span className="text-xs text-gray-400 text-center">{item.desc}</span>
                  </div>
                ))}
              </div>
              <p
                className="mt-6 text-sm text-cyan-300 cursor-pointer"
                onClick={() => {
                  setFlipped(false);
                  setSwipeDirection(null);
                }}
                tabIndex={0}
                aria-label="Go back to Fair Prices card"
                role="button"
              >
                Click to flip back
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Drinks & Cocktails */}
        <motion.div
          className="service-item min-h-[300px] flex flex-col justify-center items-center text-center bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
          aria-label="Signature Drinks & Cocktails"
        >
          <div className="text-5xl mb-4 text-cyan-400">
            <i className="fas fa-cocktail" aria-label="Cocktail glass icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Signature Drinks & Cocktails</h3>
          <p className="text-gray-300">
            From classic cocktails to unique cosmic creations, our bar offers a stellar selection of drinks to elevate your night.
          </p>
        </motion.div>

        {/* Free WiFi */}
        <motion.div
          className="service-item min-h-[300px] flex flex-col justify-center items-center text-center bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
          aria-label="Free WiFi"
        >
          <div className="text-5xl mb-4 text-cyan-400">
            <i className="fas fa-wifi" aria-label="Free WiFi icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Free WiFi</h3>
          <p className="text-gray-300">
            Stay connected while you play! Free WiFi available throughout the venue.
          </p>
        </motion.div>

        {/* 6 Bowling Lanes */}
        <motion.div
          className="service-item min-h-[300px] flex flex-col justify-center items-center text-center bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
          aria-label="Bowling Lanes"
        >
          <div className="text-5xl mb-4 text-cyan-400">
            <i className="fas fa-bowling-ball" aria-label="Bowling lanes icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">6 Bowling Lanes</h3>
          <p className="text-gray-300">
            Enjoy a variety of bowling lanes for fun and competitive play with your friends and family.
          </p>
        </motion.div>

        {/* Free Parking */}
        <motion.div
          className="service-item min-h-[300px] flex flex-col justify-center items-center text-center bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
          aria-label="Free Parking"
        >
          <div className="text-5xl mb-4 text-cyan-400">
            <i className="fas fa-parking" aria-label="Free parking icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Free Parking</h3>
          <p className="text-gray-300">
            No need to worry about parking! We offer free parking spaces for all our guests.
          </p>
        </motion.div>

        {/* Arcade Games & Billiard */}
        <motion.div
          className="service-item min-h-[300px] flex flex-col justify-center items-center text-center bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
          aria-label="Arcade Games & Billiard"
        >
          <div className="text-5xl mb-4 text-cyan-400">
            <i className="fas fa-gamepad" aria-label="Arcade games and billiards icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Arcade Games & Billiard</h3>
          <p className="text-gray-300">
            Compete with friends in exciting arcade games and classic billiards. Fun, challenges, and high scores await!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
