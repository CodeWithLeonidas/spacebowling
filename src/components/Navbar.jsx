import { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <nav className="bg-slate-800 shadow-xl p-4 relative sticky top-0 z-50">
      <div className="container mx-auto flex items-center relative">
        {/* Logo */}
        <div className="text-white text-4xl font-bold text-center md:text-left w-full md:w-auto">
          <a href="/" title="Space Bowling Home">
            Space Bowling
          </a>
        </div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden focus:outline-none transition-transform duration-500 z-50 absolute right-4"
        >
          <div className="relative w-6 h-6">
            <FaBars
              size={24}
              className={`text-white absolute top-0 left-0 transition-all duration-500 transform ${
                isMenuOpen
                  ? "translate-y-2 rotate-45 scale-75 opacity-0"
                  : "translate-y-0 rotate-0 scale-100 opacity-100"
              }`}
            />
            <FaTimes
              size={24}
              className={`text-white absolute top-0 left-0 transition-all duration-500 transform ${
                isMenuOpen
                  ? "translate-y-0 rotate-0 scale-100 opacity-100"
                  : "translate-y-2 -rotate-45 scale-75 opacity-0"
              }`}
            />
          </div>
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8">
            {[
              { label: "HOME", href: "/#home", title: "Space Bowling Home" },
              { label: "ABOUT US", href: "/#about", title: "About Space Bowling" },
              { label: "SERVICES", href: "/#services", title: "Space Bowling Services" },
              { label: "GALLERY", href: "/gallery", title: "Space Bowling Gallery" },
              { label: "CONTACT", href: "/#contact", title: "Contact Space Bowling" },
            ].map(({ label, href, title }) => (
              <li
                key={label}
                className="group relative transition-all duration-300 ease-in-out"
              >
                <div className="hover:-translate-y-1 transition-all duration-300">
                  <a
                    href={href}
                    title={title}
                    className="text-white text-lg px-3 py-1 group-hover:text-slate-100"
                  >
                    {label}
                  </a>
                </div>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-100 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-slate-800 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 z-40 mt-16 p-6 lg:hidden`}
      >
        <ul className="flex flex-col items-center mt-12 space-y-10 text-white text-3xl font-semibold">
          {[
            { label: "HOME", href: "/#home", icon: <FaHome />, title: "Space Bowling Home" },
            { label: "ABOUT US", href: "/#about", icon: <FaInfoCircle />, title: "About Space Bowling" },
            { label: "SERVICES", href: "/#services", icon: <FaServicestack />, title: "Space Bowling Services" },
            { label: "GALLERY", href: "/gallery", icon: <FaImages />, title: "Space Bowling Gallery" },
            { label: "CONTACT", href: "/#contact", icon: <FaPhoneAlt />, title: "Contact Space Bowling" },
          ].map(({ label, href, icon, title }) => (
            <li key={label} className="flex items-center space-x-4 w-full">
              <a
                href={href}
                title={title}
                className="flex items-center justify-center w-full hover:text-slate-100 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {icon}
                <span className="ml-4">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Social Media Icons */}
        <div className="mt-24 flex justify-center space-x-8">
          <a
            href="https://www.facebook.com/SpaceBowlingCentre"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition-all duration-300"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.instagram.com/spacebowling/"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-600 transition-all duration-300"
          >
            <FaInstagram size={30} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;