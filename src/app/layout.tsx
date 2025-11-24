import { Inter } from "next/font/google"
import "@/app/globals.css"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import Script from 'next/script'
import { defaultLocale, languages } from '@/config/i18n'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "DeepSeekRender",
  ],
  authors: [
    {
      name: "Jax",
      url: "mailto:fexeak@outlook.com",
    },
  ],
  creator: "Jax",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const htmlLang = languages[defaultLocale as keyof typeof languages]?.code || defaultLocale
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="google-analytics-init">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
