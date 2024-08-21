import './globals.css'
import { Metadata } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { ResponsiveIndicator } from '@/components/responsive-indicator'

import { ENV } from '@/lib/constants'
import { weeklyCodingActivity, umamiStats } from '@/lib/actions'

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: 'Wiscaksono',
    template: '%s | Wiscaksono'
  },
  description:
    "Get to know me, Wisnu Wicaksono, through this website! I'm a passionate frontend developer and electrical engineering student, and I've poured my skills and creativity into building this site with Next.js and Tailwind CSS. Explore my interactive projects, clean portfolio, and a glimpse into my technical expertise. If you're seeking a talented developer for your next project or simply looking for inspiration, feel free to get in touch!",
  openGraph: {
    title: 'Wiscaksono',
    description:
      "Get to know me, Wisnu Wicaksono, through this website! I'm a passionate frontend developer and electrical engineering student, and I've poured my skills and creativity into building this site with Next.js and Tailwind CSS. Explore my interactive projects, clean portfolio, and a glimpse into my technical expertise. If you're seeking a talented developer for your next project or simply looking for inspiration, feel free to get in touch!",
    url: ENV.NEXT_PUBLIC_WEBSITE_URL,
    siteName: 'Wiscaksono',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Wiscaksono',
    card: 'summary_large_image'
  },
  verification: {
    google: ENV.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
}

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Readonly<Props>) {
  const [weeklyData, umamiData] = await Promise.all([weeklyCodingActivity(), umamiStats()])
  const data = weeklyData.data
  const todayData = data[data.length - 1]

  const { pageviews } = umamiData

  return (
    <html lang='en'>
      <body className={`${GeistSans.variable} ${GeistMono.variable} grid h-dvh place-items-center bg-[#3D3D3D] font-mono`}>
        <div className='absolute left-1/2 top-1/2 z-20 h-[calc(95dvh+3px)] w-[calc(90dvw+3px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-tr from-transparent to-[#898989]/50 blur-[2px] transition-all lg:h-[calc(80dvh+3px)] lg:w-[calc(80dvw+3px)]' />
        <main className='z-30 flex h-[95dvh] w-[90dvw] flex-col overflow-hidden rounded-2xl bg-gradient-to-tr from-[#080808] to-[#242424] text-[#898989]/90 transition-all lg:h-[80dvh] lg:w-[80dvw]'>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <section className='relative flex-1 overflow-y-auto px-2 md:px-3 lg:px-4'>{children}</section>
          <Navbar todayData={todayData} pageViews={pageviews} />
          <ResponsiveIndicator />
        </main>
        <div
          className='absolute left-0 top-0 z-20 h-full w-full rounded-2xl bg-gradient-to-tr from-[#010101] to-[#242424] opacity-[4%]'
          style={{
            backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
            backgroundRepeat: 'repeat'
          }}
        />
        <div className='grid-pattern absolute left-0 top-0 h-full w-full' />
        {process.env.NODE_ENV === 'production' && <Script defer src='https://umami.wiscaksono.com/script.js' data-website-id='1f3b0505-7366-47bd-8757-95ad25395088' />}
      </body>
    </html>
  )
}
