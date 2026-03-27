import HomeClient from "./HomeClient";

export const generateMetadata = () => ({
  title: "Space Bowling Greece | Nightlife & Entertainment Halkidiki",
  description:
    "Best nightlife & things to do in Halkidiki! Bowling bar, cocktails, billiards, arcade games in Kalithea. Free WiFi & parking. Open 18:00-03:00.",
  alternates: {
    canonical: "https://www.spacebowling.gr/",
  },
  openGraph: {
    title: "Space Bowling Greece | Nightlife & Entertainment Halkidiki",
    description:
      "Top nightlife in Halkidiki! Bowling, cocktail bar, billiards, arcade games in Kalithea. Free WiFi & parking. Best things to do.",
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
    title: "Space Bowling Greece | Nightlife Halkidiki",
    description:
      "Best nightlife in Halkidiki! Bowling bar, cocktails, arcade, billiards. Free WiFi & parking. Open 18:00-03:00 daily.",
    images: ["https://www.spacebowling.gr/images/gallery.jpg"],
  },
});

export default function HomePage() {
  return <HomeClient />;
}