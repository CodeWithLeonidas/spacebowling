import { Helmet, HelmetProvider } from "react-helmet-async"; // Import Helmet
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import GalleryPreview from "./components/GalleryPreview";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import OurServices from "./components/OurServices";
import WorkingHours from "./components/WorkingHours";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import { Analytics } from "@vercel/analytics/react"; // Added Analytics import

function App() {
  return (
    <HelmetProvider>
      {" "}
      {/* Wrap app in HelmetProvider */}
      <Router>
        <div className="bg-gray-900 text-white">
          {/* Default metadata for all pages */}
          <Helmet>
            <title>Space Bowling | Halkidiki</title>
            <meta
              name="description"
              content="Experience the ultimate bowling adventure at Space Bowling in Kalithea, Halkidiki. Enjoy cosmic vibes, top-tier lanes, delicious drinks, and unforgettable moments!"
            />
            <meta
              name="keywords"
              content="bowling bar Halkidiki, bowling in Kalithea, Space Bowling Greece, nightlife in Halkidiki, fun activities in Kalithea, bowling and drinks, tourist attractions in Halkidiki"
            />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://spacebowling.vercel.app/" />
          </Helmet>

          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Route-specific metadata can be added in components */}
                  <HeroSection />
                  <AboutUs />
                  <OurServices />
                  <WorkingHours />
                  <GalleryPreview />
                  <ContactForm />
                  <Footer />
                </>
              }
            />
            <Route
              path="/gallery"
              element={
                <>
                  <Helmet>
                    <title>Space Bowling - Gallery</title>
                    <meta
                      name="description"
                      content="Explore our gallery at Your Website Name - see our work and projects."
                    />
                    <meta
                      name="keywords"
                      content="gallery, space bowling, bowling, Halkidiki, Kalithea, photos, images"
                    />
                    <link
                      rel="canonical"
                      href="https://spacebowling.vercel.app/gallery"
                    />
                  </Helmet>
                  <GalleryPage />
                </>
              }
            />
          </Routes>
          <Analytics /> {/* Added Analytics component */}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;