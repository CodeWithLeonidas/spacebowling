'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaImages,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
      setIsMenuOpen(false)
    }
  }, []) // Only run on mount

  const navItems = [
    { label: 'HOME', href: '/#home', icon: <FaHome />, title: 'Space Bowling Home' },
    { label: 'ABOUT US', href: '/#about', icon: <FaInfoCircle />, title: 'About Space Bowling' },
    { label: 'SERVICES', href: '/#services', icon: <FaServicestack />, title: 'Space Bowling Services' },
    { label: 'GALLERY', href: '/gallery', icon: <FaImages />, title: 'Space Bowling Gallery' },
    { label: 'CONTACT', href: '/#contact', icon: <FaPhoneAlt />, title: 'Contact Space Bowling' },
  ]

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 shadow-2xl p-4 relative sticky top-0 z-50 border-b border-indigo-500/30"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex items-center relative">
        <div className="text-4xl font-extralight text-center md:text-left w-full md:w-auto">
          <Link
            href="/"
            title="Space Bowling Home"
            className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 transition-all duration-300 hover:from-cyan-300 hover:via-indigo-300 hover:to-purple-400 group font-orbitron tracking-wider"
            aria-label="Space Bowling Home"
          >
            Space Bowling
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_cyan] opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-x-110"></span>
            <span className="absolute inset-0 -z-10 bg-cyan-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></span>
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden focus:outline-none transition-transform duration-500 z-50 absolute right-4"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-6 h-6">
            <FaBars
              size={24}
              className={`absolute top-0 left-0 text-cyan-400 transition-all duration-500 transform ${isMenuOpen ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
              aria-hidden={isMenuOpen}
            />
            <FaTimes
              size={24}
              className={`absolute top-0 left-0 text-cyan-400 transition-all duration-500 transform ${isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'}`}
              aria-hidden={!isMenuOpen}
            />
            <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/20 animate-spin-slow shadow-[0_0_15px_cyan] opacity-50"></span>
          </div>
        </button>

        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8">
            {navItems.map(({ label, href, title }) => (
              <li key={label} className="group relative transition-all duration-300 ease-in-out">
                <a
                  href={href}
                  title={title}
                  aria-label={title}
                  tabIndex={0}
                  className="text-lg text-cyan-300 font-futura tracking-wide px-3 py-1 group-hover:text-cyan-200 relative z-10 transition-colors duration-300"
                >
                  {label}
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300 scale-110 rounded-lg"></span>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 shadow-[0_0_8px_cyan] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`fixed top-[64px] right-0 w-full h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-700 ease-in-out z-40 p-6 lg:hidden overflow-y-auto`}
        role="menu"
        aria-label="Mobile Navigation"
      >
        <ul className="flex flex-col items-center mt-12 space-y-10 text-3xl font-futura text-cyan-300">
          {navItems.map(({ label, href, title }, index) => (
            <li key={label} className="w-full flex justify-center relative animate-warp-in" style={{ animationDelay: `${index * 0.15}s` }}>
              <a
                href={href}
                title={title}
                aria-label={title}
                tabIndex={0}
                role="menuitem"
                onClick={toggleMenu}
                className="w-full text-center hover:text-cyan-100 transition-all duration-300 group relative tracking-wide"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-24 flex justify-center space-x-8">
          <a
            href="https://www.facebook.com/SpaceBowlingCentre"
            rel="noopener noreferrer"
            aria-label="Space Bowling Facebook"
            className="text-cyan-300 hover:text-blue-400 transition-all duration-300"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com/spacebowling/"
            rel="noopener noreferrer"
            aria-label="Space Bowling Instagram"
            className="text-cyan-300 hover:text-pink-400 transition-all duration-300"
          >
            <FaInstagram size={30} />
          </a>
        </div>
      </div>
    </nav>
  )
}
