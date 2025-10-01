import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 700], [0, 200]);
  const [isPressed, setIsPressed] = useState(false);

  const buttonVariants = {
    idle: { scale: 1 },
    pressed: { scale: 0.95 },
  };

  const handleButtonPress = () => {
    setIsPressed(true);
    setTimeout(() => {
      window.location.href = "#services";
      setIsPressed(false);
    }, 400);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Preload the background image */}
      <link rel="preload" href="/images/hero2.jpg" as="image" />

      {/* Background Image with Adjusted Height */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero2.jpg')",
          y: yBackground,
          minHeight: "110vh",
        }}
      />
      <img
        src="/images/hero2.jpg"
        alt="Cosmic bowling lanes at Space Bowling"
        className="sr-only"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

      {/* Static Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Reveal animation for text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="montserrat text-2xl sm:text-4xl lg:text-2xl drop-shadow-md mb-12 max-w-2xl mx-auto cosmic-etch"
        >
          Open until Sunday, October 5th
        </motion.p>
        <span className="sr-only">
          Space Bowling - Cosmic Bowling Experience
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-4xl lg:text-7xl font-bold drop-shadow-lg mb-12"
        >
          <h1>STRIKE THE UNIVERSE</h1>
        </motion.h1>

        {/* Original Button Code */}
        <motion.button
          onClick={handleButtonPress}
          variants={buttonVariants}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative inline-block px-8 py-3 bg-gradient-to-b from-gray-800 to-gray-900 text-cyan-300 rounded-md font-semibold text-lg shadow-lg border border-cyan-300/40 overflow-hidden"
        >
          <span className="relative z-10">Explore Services</span>
          <span
            className={`absolute inset-0 bg-cyan-300/30 rounded-md transition-all duration-600 ${
              isPressed ? "opacity-100 scale-150" : "opacity-0 scale-0"
            }`}
          />
        </motion.button>
      </div>
    </section>
  );
}
