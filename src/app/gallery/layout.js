export const metadata = {
  title: 'Gallery | Space Bowling Greece - Nightlife & Entertainment Photos',
  description:
    'Explore Space Bowling Greece photo gallery! See our neon bowling lanes, cocktail bar, billiards, arcade games, and nightlife atmosphere in Kalithea, Halkidiki. Best entertainment venue photos for tourists looking for things to do.',
  keywords: 'Space Bowling photos, Halkidiki nightlife photos, bowling bar Kalithea, entertainment venue Halkidiki, tourist attractions photos, things to see in Halkidiki, bowling gallery Greece',
  alternates: {
    canonical: 'https://www.spacebowling.gr/gallery',
  },
  openGraph: {
    title: 'Gallery | Space Bowling Greece - Nightlife & Entertainment',
    description:
      'Photo gallery of Space Bowling Greece — neon bowling lanes, cocktail bar, billiards & arcade games. See why we\'re the top nightlife destination in Halkidiki!',
    url: 'https://www.spacebowling.gr/gallery',
    images: [
      {
        url: 'https://www.spacebowling.gr/images/gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Space Bowling Greece gallery - nightlife and entertainment venue in Halkidiki',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Space Bowling Greece - Nightlife Photos',
    description:
      'Photo gallery of Halkidiki\'s premier nightlife venue. Bowling, bar, arcade, billiards. See what makes us the best!',
    images: ['https://www.spacebowling.gr/images/gallery.jpg'],
  },
}

export default function GalleryLayout({ children }) {
  return children
}
