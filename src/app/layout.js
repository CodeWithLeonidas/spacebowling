import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react'
import '@fortawesome/fontawesome-free/css/all.min.css'

export const metadata = {
  title: 'Space Bowling | Halkidiki',
  description:
    'Experience the ultimate bowling adventure at Space Bowling in Kalithea, Halkidiki. Enjoy cosmic vibes, top-tier lanes, delicious drinks, and unforgettable moments!',
  keywords:
    'bowling bar Halkidiki, bowling in Kalithea, Space Bowling Greece, nightlife in Halkidiki, fun activities in Kalithea, bowling and drinks, tourist attractions in Halkidiki',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.spacebowling.gr/',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Space Bowling | Halkidiki</title>
        <meta name="keywords" content="bowling bar Halkidiki, bowling in Kalithea, Space Bowling Greece, nightlife in Halkidiki, fun activities in Kalithea, bowling and drinks, tourist attractions in Halkidiki" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Space Bowling | Halkidiki" />
        <meta property="og:description" content="Experience the ultimate bowling adventure at Space Bowling in Kalithea, Halkidiki. Enjoy cosmic vibes, top-tier lanes, delicious drinks, and unforgettable moments!" />
        <meta property="og:url" content="https://www.spacebowling.gr/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.spacebowling.gr/images/gallery.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Space Bowling | Halkidiki" />
        <meta name="twitter:description" content="Experience the ultimate bowling adventure at Space Bowling in Kalithea, Halkidiki." />
        <meta name="twitter:image" content="https://www.spacebowling.gr/images/gallery.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
