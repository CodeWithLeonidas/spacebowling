import { motion } from "framer-motion";

export default function OurServices() {
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 255, 255, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Subtle starry background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzdGFycyIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMS41IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RhcnMpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="container mx-auto text-center mb-12 relative z-10">
        <motion.h1
          className="text-5xl font-bold mb-6 text-cyan-300 drop-shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2>Our Services</h2>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          Providing the best cosmic bowling experience with unbeatable services!
        </motion.p>
        <span className="sr-only">
          Space Bowling Greece - Touris hotspot, arcade games, free parking
        </span>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 relative z-10">
        {/* Service 1 - Fair Prices */}
        <motion.div
          className="service-item text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            <i className="fas fa-tag" aria-label="Fair pricing icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Fair Prices
          </h3>
          <p className="text-gray-300">
            We offer competitive prices so you can enjoy bowling without
            breaking the bank.
          </p>
        </motion.div>
        {/* Service 6 - Drinks & Cocktails */}
        <motion.div
          className="service-item text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            <i className="fas fa-cocktail" aria-label="Cocktail glass icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Signature Drinks & Cocktails
          </h3>
          <p className="text-gray-300">
            From classic cocktails to unique cosmic creations, our bar offers a
            stellar selection of drinks to elevate your night.
          </p>
        </motion.div>
        {/* Service 2 - Free WiFi */}
        <motion.div
          className="service-item text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            <i className="fas fa-wifi" aria-label="Free WiFi icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Free WiFi</h3>
          <p className="text-gray-300">
            Stay connected while you play! Free WiFi available throughout the
            venue.
          </p>
        </motion.div>
        {/* Service 3 - 6 Bowling Lanes */}
        <motion.div
          className="service-item text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            <i
              className="fas fa-bowling-ball"
              aria-label="Bowling lanes icon"
            ></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            6 Bowling Lanes
          </h3>
          <p className="text-gray-300">
            Enjoy a variety of bowling lanes for fun and competitive play with
            your friends and family.
          </p>
        </motion.div>
        {/* Service 4 - Free Parking */}
        <motion.div
          className="service-item text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            <i className="fas fa-parking" aria-label="Free parking icon"></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Free Parking
          </h3>
          <p className="text-gray-300">
            No need to worry about parking! We offer free parking spaces for all
            our guests.
          </p>
        </motion.div>
        {/* Service 5 - Arcade Games */}
        <motion.div
          className="service-item text-center bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            <i
              className="fas fa-gamepad"
              aria-label="Arcade games and billiards icon"
            ></i>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Arcade Games & Billiard
          </h3>
          <p className="text-gray-300">
            Compete with friends in exciting arcade games and classic billiards.
            Fun, challenges, and high scores await!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
