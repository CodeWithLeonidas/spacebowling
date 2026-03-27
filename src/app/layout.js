import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  metadataBase: new URL('https://www.spacebowling.gr'),
  title: {
    default: 'Space Bowling Greece | Cosmic Bowling in Halkidiki',
    template: '%s | Space Bowling Greece',
  },
  description:
    'Space Bowling Greece — the ultimate bowling, bar & entertainment venue in Kalithea, Halkidiki. Neon-lit lanes, signature cocktails, billiards, arcade games, nightlife & free parking. Best things to do in Halkidiki for tourists & families. Reopening Summer 2026.',
  keywords: [
    'Space Bowling Greece',
    'things to do in Halkidiki',
    'nightlife Halkidiki',
    'bars in Halkidiki',
    'entertainment Halkidiki',
    'bowling Halkidiki',
    'bowling bar Halkidiki',
    'arcade games Halkidiki',
    'billiards Halkidiki',
    'fun activities Halkidiki',
    'Halkidiki attractions',
    'Kalithea nightlife',
    'Kalithea bars',
    'Kalithea bowling',
    'what to do in Halkidiki',
    'Halkidiki evening activities',
    'tourist activities Halkidiki',
    'family activities Halkidiki',
    'neon bowling Greece',
    'cocktail bar Halkidiki',
    'games and bowling Halkidiki',
    'Club Aerea Halkidiki',
    'Kassandra nightlife',
    'Kassandra entertainment',
  ].join(', '),
  authors: [{ name: 'Space Bowling Greece', url: 'https://www.spacebowling.gr' }],
  creator: 'Space Bowling Greece',
  publisher: 'Space Bowling Greece',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://www.spacebowling.gr/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.spacebowling.gr/',
    siteName: 'Space Bowling Greece',
    title: 'Space Bowling Greece | Nightlife, Bar & Entertainment in Halkidiki',
    description:
      'Top nightlife & entertainment venue in Halkidiki! Bowling, cocktail bar, billiards, arcade games. Best things to do in Kalithea for tourists & families. Free WiFi & parking.',
    images: [
      {
        url: 'https://www.spacebowling.gr/images/gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Space Bowling Greece — nightlife, bowling bar and arcade games in Halkidiki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@spacebowlinggr',
    creator: '@spacebowlinggr',
    title: 'Space Bowling Greece | Nightlife, Bar & Entertainment in Halkidiki',
    description:
      'Top nightlife & entertainment in Kalithea, Halkidiki. Bowling, cocktail bar, billiards, arcade. Best things to do for tourists.',
    images: ['https://www.spacebowling.gr/images/gallery.jpg'],
  },
  verification: {
    google: '', // Add your Google Search Console verification here
  },
  other: {
    'geo.region': 'GR-K',
    'geo.placename': 'Kalithea, Halkidiki',
    'geo.position': '40.0648254;23.4511781',
    ICBM: '40.0648254, 23.4511781',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme */}
        <meta name="theme-color" content="#030510" />
        <meta name="msapplication-TileColor" content="#030510" />

        {/* Local Business JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['SportsActivityLocation', 'BarOrPub', 'EntertainmentBusiness', 'NightClub', 'TouristAttraction'],
              name: 'Space Bowling Greece',
              alternateName: 'Space Bowling Halkidiki',
              description:
                'Premier nightlife, entertainment and bowling venue in Halkidiki. Features bowling lanes, cocktail bar, billiards, and arcade games. Top tourist attraction for evening activities in Kalithea.',
              url: 'https://www.spacebowling.gr',
              image: 'https://www.spacebowling.gr/images/gallery.jpg',
              telephone: ['+30-697-203-3463', '+30-697-965-8337'],
              email: 'spacebowling@outlook.com',
              hasMap: 'https://www.google.com/maps?cid=16987832169643311906',
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Bar', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Arcade Games', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Billiards', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Bowling Lanes', value: true },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Club Aerea',
                addressLocality: 'Kalithea',
                addressRegion: 'Halkidiki',
                addressCountry: 'GR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.0648254,
                longitude: 23.4511781,
              },
              sameAs: [
                'https://www.facebook.com/SpaceBowlingCentre',
                'https://www.instagram.com/spacebowling/',
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                  opens: '18:00',
                  closes: '03:00',
                  validFrom: '2026-05-01',
                  validThrough: '2026-10-31',
                },
              ],
              priceRange: '€€',
              servesCuisine: 'Cocktails and Beverages',
              keywords: 'nightlife Halkidiki, bowling Halkidiki, bars in Halkidiki, arcade games, billiards, things to do in Halkidiki, entertainment, tourist activities',
              touristType: ['Families', 'Young Adults', 'Groups', 'Couples'],
            }),
          }}
        />

        {/* FAQ Schema for tourist queries */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What are the best things to do in Halkidiki at night?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Space Bowling Greece offers the best nightlife in Halkidiki with neon bowling lanes, a cocktail bar, billiards, and arcade games. Located in Kalithea, we provide entertainment for tourists, families, and groups from 18:00 to 03:00 during season.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where can I go bowling in Halkidiki?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Space Bowling Greece in Kalithea, Halkidiki features 6 state-of-the-art neon-lit bowling lanes at €5.50 per player per game. We offer bowling for all skill levels with automated scoring and professional equipment.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are there bars with entertainment in Kalithea Halkidiki?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! Space Bowling Greece is a premier entertainment bar in Kalithea featuring signature cocktails, bowling lanes, billiards, arcade games, free WiFi, and free parking. Perfect for tourists looking for nightlife and fun activities.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What tourist activities are available in Halkidiki for families?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Space Bowling Greece offers family-friendly activities including bowling, arcade games, billiards, and a full bar menu. Located in Kalithea tourist district with ample free parking and WiFi. Open 18:00-03:00 daily during season.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is there arcade and billiards entertainment in Halkidiki?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Space Bowling Greece features a full arcade zone with retro and modern games, plus a premium billiard table (€10/hour). Located in Kalithea, Halkidiki, we are the top entertainment venue for tourists and visitors.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow" id="main-content">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}