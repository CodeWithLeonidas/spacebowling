'use client'

import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import OurServices from "./components/OurServices";
import WorkingHours from "./components/WorkingHours";
import GalleryPreview from "./components/GalleryPreview";
import ContactForm from "./components/ContactForm";
import LoadingScreen from "./components/Loadingscreen";

// Key used to remember (within the browser session) that the
// intro loading screen has already played, so it doesn't replay
// when the user navigates back to the home page from another route.
const LOADER_SHOWN_KEY = 'sb_loader_shown';

export default function HomeClient() {
  // `showLoader` controls whether the loading screen mounts at all.
  // `loaded` controls the fade-in of the main content.
  // We start with `null` to avoid a hydration mismatch / flash; the
  // real value is set in the effect below after we can read sessionStorage.
  const [showLoader, setShowLoader] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(LOADER_SHOWN_KEY) === '1';
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — fall back to showing it.
    }

    if (alreadyShown) {
      setShowLoader(false);
      setLoaded(true);
    } else {
      setShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem(LOADER_SHOWN_KEY, '1');
    } catch {
      // ignore storage failures
    }
    setLoaded(true);
  };

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <HeroSection />
        <AboutUs />
        <OurServices />
        <WorkingHours />
        <GalleryPreview />
        <ContactForm />
      </main>
    </>
  );
}