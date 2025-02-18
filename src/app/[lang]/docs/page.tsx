import { Container } from "@/components/ui/Container"
import { locales } from "@/config/i18n"

interface DocsPageProps {
  params: { lang: string }
}

export default function DocsPage({ params: { lang } }: DocsPageProps) {
  const t = locales[lang as keyof typeof locales]
  
  return (
    <Container className="py-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>{t.nav.docs}</h1>
        <h2>{t.home.features}</h2>
        <ul>
          <li>{t.home.markdownRender}</li>
          <li>{t.home.imageExport}</li>
          <li>{t.home.darkMode}</li>
          <li>{t.home.responsive}</li>
        </ul>
      </div>
    </Container>
  )
} 