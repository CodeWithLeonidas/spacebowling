/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AboutUs() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imagePop = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 },
    },
  }

  const spanGrow = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: '24rem',
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut', delay: 0.4 },
    },
  }

  const textFade = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.5 },
    },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    pressed: { scale: 0.95 },
  }

  const [isPressed, setIsPressed] = useState(false)

  const handleButtonClick = () => {
    setIsPressed(true)
    setTimeout(() => {
      // Button action left blank for now
      setIsPressed(false)
    }, 400)
  }

  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
      aria-label="About Space Bowling Greece"
    >
      <div className="container mx-auto text-center mb-12 relative z-10">
        <motion.h2
          className="text-5xl font-bold mb-6 text-cyan-300 drop-shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          About Us
        </motion.h2>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6 relative z-10">
        <motion.div
          className="lg:w-1/2 flex-1 h-full p-6 flex items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imagePop}
        >
          <img
            src="/images/about.png"
            alt="Space Bowling cosmic bowling experience in Greece"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="hidden lg:block w-px bg-cyan-400/50 mx-6 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={spanGrow}
        />

        <motion.div
          className="lg:w-1/2 flex-1 h-full p-6 flex flex-col justify-center items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textFade}
        >
          <h3 className="text-3xl font-semibold text-cyan-300 mb-4">
            Experience Bowling Like Never Before
          </h3>
          <p className="text-lg text-gray-200 leading-relaxed max-w-lg text-justify">
            Welcome to Space Bowling, where the thrill of bowling meets the
            excitement of outer space! Nestled in the heart of Greece’s stunning
            tourist district, we invite you to step into a cosmic adventure like
            no other. Our unique atmosphere combines state-of-the-art bowling
            lanes with captivating space-inspired décor, creating an immersive
            experience for all ages. Whether you are here for a friendly game or
            to enjoy a drink under the stars, we promise an unforgettable
            journey through the galaxy. So grab your spacesuit and let the good
            times roll!
          </p>

          <span className="sr-only">
            Space Bowling Greece - tourist district in Kalithea Halkidiki for all
            ages, we provide drinks and fun
          </span>

          <motion.button
            className="relative inline-block px-8 py-3 bg-gradient-to-b from-gray-800 to-gray-900 text-cyan-300 rounded-md font-semibold text-lg shadow-lg border border-cyan-300/40 overflow-hidden mt-10 hover:brightness-110 transition duration-300 cursor-pointer"
            variants={buttonVariants}
            initial="idle"
            animate={isPressed ? 'pressed' : 'idle'}
            onClick={handleButtonClick}
            title="Chat with Space Bowling Team"
            aria-label="Chat with Space Bowling Team"
          >
            <span className="relative z-10">Chat with Us!</span>
            <span
              className={`absolute inset-0 bg-cyan-300/30 rounded-md transition-all duration-600 ${
                isPressed ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
              }`}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
