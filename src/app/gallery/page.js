/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

const images = [
  "/images/gallery.jpg",
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery7.jpg",
  "/images/gallery8.jpg",
  "/images/gallery9.jpg",
  "/images/gallery10.jpg",
  "/images/gallery11.jpg",
  "/images/gallery12.jpg",
  "/images/gallery13.jpg",
  "/images/gallery14.jpg",
  "/images/gallery15.jpg",
  "/images/gallery16.jpg",
  "/images/gallery17.jpg",
  "/images/gallery18.jpg",
  "/images/gallery19.jpg",
  "/images/gallery20.jpg",
  "/images/gallery21.jpg",
  "/images/gallery22.jpg",
  "/images/gallery23.jpg",
  "/images/gallery24.jpg",
  "/images/gallery25.jpg",
  "/images/gallery26.jpg",
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const buttonVariants = {
    idle: { scale: 1, rotate: 0 },
    pressed: {
      scale: 0.95,
      rotate: 2,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const handleButtonPress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      window.location.href = "/";
    }, 600);
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col relative overflow-hidden" aria-label="Space Bowling Greece Full Gallery">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <motion.div
        className="flex-1 py-12 px-6"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Header */}
        <motion.header className="text-center mb-12" variants={headerVariants}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Our Gallery
          </h1>
          <p className="text-gray-300 mt-3 text-lg md:text-xl italic">
            Explore our space-themed bowling experience!
          </p>
          <span className="sr-only">
            Space Bowling Greece - Full cosmic bowling gallery images, nightlife, tourist attraction in Halkidiki
          </span>
        </motion.header>

        {/* Image Grid */}
        <motion.section
          className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
          variants={gridVariants}
          aria-label="Bowling Gallery Images"
        >
          {images.map((img, index) => (
            <motion.figure
              key={index}
              variants={imageVariants}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImage(img)}
              tabIndex={0}
              aria-label={`View gallery image ${index + 1}`}
              role="button"
            >
              <img
                src={img}
                alt={`Space Bowling Greece cosmic bowling gallery photo ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                <span className="text-white text-lg font-semibold px-4 py-2 bg-blue-600/50 rounded-full">
                  View Image
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.section>

        {/* Back Button */}
        <div className="text-center mt-12">
          <motion.button
            className="relative inline-block px-8 py-3 bg-gradient-to-b from-gray-800 to-gray-900 text-cyan-300 rounded-md font-semibold text-lg shadow-lg border border-cyan-300/40 overflow-hidden"
            variants={buttonVariants}
            initial="idle"
            animate={isPressed ? "pressed" : "idle"}
            onClick={handleButtonPress}
            title="Return to Space Bowling Greece homepage"
            aria-label="Return to homepage"
          >
            <span className="relative z-10">Back to Home</span>
            <span
              className={`absolute inset-0 bg-cyan-300/30 rounded-md transition-all duration-600 ${
                isPressed ? "opacity-100 scale-150" : "opacity-0 scale-0"
              }`}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-6 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={() => setSelectedImage(null)}
          aria-label="Enlarged gallery image modal"
        >
          <div
            className="relative bg-gray-800 p-4 rounded-xl shadow-2xl max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors duration-200"
              onClick={() => setSelectedImage(null)}
              aria-label="Close enlarged image"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Space Bowling Greece cosmic bowling enlarged gallery photo"
              className="w-full h-auto rounded-lg max-h-[85vh] object-contain"
            />
          </div>
        </motion.div>
      )}
    </main>
  );
}
