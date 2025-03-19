import { Container } from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"
import { locales } from "@/config/i18n"
import { Metadata } from 'next'

interface ProjectsProps {
  params: Promise<{ lang: string }>
}

export default async function Projects({ params }: ProjectsProps) {
  const { lang = 'en' } = await params
  const t = locales[lang as keyof typeof locales] || locales.en

  const projects = [
    {
      title: 'DeepSeek Chat Generator',
      description: t.projects.deepseekChat,
      url: 'https://fakedeepseek.vercel.app'
    },
    {
      title: 'Solid Color Generator',
      description: t.projects.solidColor,
      url: 'https://solidcolor.github.io/'
    },
    {
      title: 'Todo Lister',
      description: t.projects.todoLister,
      url: 'https://todolister.github.io/'
    }
  ]

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t.common.visitProject}
            </a>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export function generateStaticParams() {
  return Object.keys(locales).map((lang) => ({
    lang,
  }))
}

export const metadata: Metadata = {
  title: 'More Projects - DeepSeekRender',
  description: 'Explore more projects from our team.'
}