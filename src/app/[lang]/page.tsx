import { Container } from "@/components/ui/Container"
import { ClientContent } from "@/components/pages/ClientContent"
import { locales } from "@/config/i18n"

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