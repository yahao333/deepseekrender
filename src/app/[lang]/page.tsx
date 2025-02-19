import { Container } from "@/components/ui/Container"
import { ClientContent } from "@/components/pages/ClientContent"
import { locales, BASE_URL } from "@/config/i18n"
import { Metadata } from 'next'

interface HomeProps {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: HomeProps) {
  const { lang = 'en' } = await params
  const t = locales[lang as keyof typeof locales] || locales.en
  
  return (
    <Container className="py-8">
      <ClientContent translations={t} />
    </Container>
  )
}

export function generateStaticParams() {
  return Object.keys(locales).map((lang) => ({
    lang,
  }))
}

export const metadata: Metadata = {
  title: 'DeepSeekRender - A Modern Markdown Rendering Engine',
  description: 'DeepSeekRender is a modern rendering engine that supports Markdown rendering and image export features.',
  keywords: ['Markdown', 'Rendering Engine', 'Image Export', 'Dark Mode', 'Responsive Design'],
  openGraph: {
    title: 'DeepSeekRender',
    description: 'A modern rendering engine that supports Markdown rendering and image export.',
    url: BASE_URL,
    siteName: 'DeepSeekRender',
    images: [
      {
        url: `${BASE_URL}/images/avatar.png`,
        width: 400,
        height: 400,
        alt: 'DeepSeekRender Logo',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@1zhaofengyue',
    title: 'DeepSeekRender',
    description: 'A modern rendering engine that supports Markdown rendering and image export.',
    images: [
      {
        url: `${BASE_URL}/images/avatar.png`,
      },
    ],
  },
} 