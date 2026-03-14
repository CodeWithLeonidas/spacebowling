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
    'Space Bowling Greece — the ultimate bowling experience in Kalithea, Halkidiki. Neon-lit lanes, signature cocktails, billiards, arcade games & free parking. Reopening Summer 2026.',
  keywords: [
    'Space Bowling Greece',
    'bowling Halkidiki',
    'bowling Kalithea',
    'neon bowling Greece',
    'bowling bar Halkidiki',
    'nightlife Halkidiki',
    'fun activities Halkidiki',
    'tourist attractions Halkidiki',
    'bowling and drinks',
    'billiards Halkidiki',
    'arcade Halkidiki',
    'Kalithea bowling',
    'Club Aerea Halkidiki',
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
    title: 'Space Bowling Greece | Cosmic Bowling in Halkidiki',
    description:
      'The ultimate bowling experience in Kalithea, Halkidiki. Neon lanes, cocktails, billiards, arcade games & free parking.',
    images: [
      {
        url: 'https://www.spacebowling.gr/images/gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Space Bowling Greece — neon bowling lanes in Halkidiki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@spacebowlinggr',
    creator: '@spacebowlinggr',
    title: 'Space Bowling Greece | Cosmic Bowling in Halkidiki',
    description:
      'The ultimate bowling experience in Kalithea, Halkidiki.',
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
              '@type': 'SportsActivityLocation',
              name: 'Space Bowling Greece',
              description:
                'Cosmic bowling, billiards, cocktails, and arcade games in Kalithea, Halkidiki, Greece.',
              url: 'https://www.spacebowling.gr',
              image: 'https://www.spacebowling.gr/images/gallery.jpg',
              telephone: ['+30-697-203-3463', '+30-697-965-8337'],
              email: 'spacebowling@outlook.com',
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
                },
              ],
              priceRange: '€€',
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