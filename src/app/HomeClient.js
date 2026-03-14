'use client'

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import OurServices from "./components/OurServices";
import WorkingHours from "./components/WorkingHours";
import GalleryPreview from "./components/GalleryPreview";
import ContactForm from "./components/ContactForm";
import LoadingScreen from "./components/Loadingscreen";

export default function HomeClient() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
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