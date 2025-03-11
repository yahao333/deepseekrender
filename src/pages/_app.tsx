'use client'

import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        id="google-analytics"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GKT18HKXT9"
      />
      <Script id="google-analytics-init">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GKT18HKXT9');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp 