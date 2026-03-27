import HomeClient from "./HomeClient";

export const generateMetadata = () => ({
  title: "Space Bowling Greece | Nightlife, Bar & Entertainment in Halkidiki",
  description:
    "Top things to do in Halkidiki! Space Bowling offers the best nightlife, bowling bar, cocktails, billiards & arcade games in Kalithea. Premier tourist entertainment venue with free WiFi & parking. Unforgettable nights await!",
  alternates: {
    canonical: "https://www.spacebowling.gr/",
  },
  openGraph: {
    title: "Space Bowling Greece | Best Nightlife & Things to Do in Halkidiki",
    description:
      "Experience Halkidiki's premier entertainment venue! Bowling, cocktail bar, billiards, arcade games. Top tourist attraction for nightlife & fun activities in Kalithea.",
    url: "https://www.spacebowling.gr/",
    images: [
      {
        url: "https://www.spacebowling.gr/images/gallery.jpg",
        width: 1200,
        height: 630,
        alt: "Space Bowling Greece - nightlife, bowling bar and entertainment in Halkidiki tourist destination",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Bowling Greece | Best Nightlife & Entertainment in Halkidiki",
    description:
      "Top things to do in Halkidiki! Bowling bar, cocktails, arcade games, billiards. Best nightlife & tourist entertainment in Kalithea.",
    images: ["https://www.spacebowling.gr/images/gallery.jpg"],
  },
});

export default function HomePage() {
  return <HomeClient />;
}