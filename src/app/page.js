import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import OurServices from "./components/OurServices";
import WorkingHours from "./components/WorkingHours";
import GalleryPreview from "./components/GalleryPreview";
import ContactForm from "./components/ContactForm.js";

export const generateMetadata = () => ({
  title: "Space Bowling Greece | Cosmic Bowling in Halkidiki",
  description:
    "Welcome to Space Bowling! Enjoy cosmic bowling, drinks, and fun in Kalithea, Halkidiki. Explore our services, gallery, and contact us for unforgettable moments.",
  alternates: {
    canonical: "https://spacebowling.gr/",
  },
  openGraph: {
    title: "Space Bowling Greece | Cosmic Bowling in Halkidiki",
    description:
      "Welcome to Space Bowling Greece! Enjoy cosmic bowling, drinks, and fun in Kalithea, Halkidiki.",
    url: "https://spacebowling.gr/",
    images: [
      {
        url: "https://spacebowling.gr/images/gallery.jpg",
        width: 800,
        height: 600,
        alt: "Space Bowling Greece cosmic bowling",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Bowling Greece | Cosmic Bowling in Halkidiki",
    description:
      "Welcome to Space Bowling Greece! Enjoy cosmic bowling, drinks, and fun in Kalithea, Halkidiki.",
    images: ["https://spacebowling.gr/images/gallery.jpg"],
  },
});

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutUs />
      <OurServices />
      <WorkingHours />
      <GalleryPreview />
      <ContactForm />
    </main>
  );
}
