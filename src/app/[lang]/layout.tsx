import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Header } from "@/components/layout/Header"
import { cn } from "@/lib/utils"
import { languages } from "@/config/i18n"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang = 'en' } = await params
  const htmlLang = languages[lang as keyof typeof languages]?.code || 'en-US'

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
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