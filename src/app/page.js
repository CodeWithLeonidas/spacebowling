import HomeClient from "./HomeClient";

export const generateMetadata = () => ({
  title: "Space Bowling Greece | Neon Bowling in Halkidiki",
  description:
    "Welcome to Space Bowling! Enjoy neon-lit bowling, drinks, and fun in Kalithea, Halkidiki. Explore our services, gallery, and contact us for unforgettable moments.",
  alternates: {
    canonical: "https://www.spacebowling.gr/",
  },
  openGraph: {
    title: "Space Bowling Greece | Neon Bowling in Halkidiki",
    description:
      "Welcome to Space Bowling Greece! Enjoy neon-lit bowling, drinks, and fun in Kalithea, Halkidiki.",
    url: "https://www.spacebowling.gr/",
    images: [
      {
        url: "https://www.spacebowling.gr/images/gallery.jpg",
        width: 800,
        height: 600,
        alt: "Space Bowling Greece neon bowling lanes in Halkidiki",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Bowling Greece | Neon Bowling in Halkidiki",
    description:
      "Welcome to Space Bowling Greece! Enjoy neon-lit bowling, drinks, and fun in Kalithea, Halkidiki.",
    images: ["https://www.spacebowling.gr/images/gallery.jpg"],
  },
});

export default function HomePage() {
  return <HomeClient />;
}