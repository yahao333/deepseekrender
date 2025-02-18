'use client'

import { useState, useRef } from 'react'
import { Container } from "@/components/ui/Container"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { ImageExporter } from "@/components/ImageExporter"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable"
import { locales } from "@/config/i18n"

interface HomeProps {
  params: { lang: string }
}

export default function Home({ params: { lang } }: HomeProps) {
  const t = locales[lang as keyof typeof locales]
  const defaultMarkdown = `# ${t.app.title}

${t.app.description}

## ${t.home.features}

- ✨ ${t.home.markdownRender}
- 🖼️ ${t.home.imageExport}
- 🌓 ${t.home.darkMode}
- 📱 ${t.home.responsive}
`
  const [content, setContent] = useState(defaultMarkdown)
  const previewRef = useRef<HTMLDivElement>(null)

  return (
    <Container className="py-8">
      <div className="flex justify-end mb-4">
        <ImageExporter previewRef={previewRef} />
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="h-full p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full resize-none rounded-md border-0 bg-transparent p-2 font-mono text-sm focus:ring-0"
              placeholder={t.home.inputPlaceholder}
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={50}>
          <div ref={previewRef} className="h-full overflow-auto p-4">
            <MarkdownRenderer content={content} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Contact: <a href="mailto:fexeak@outlook.com" className="hover:underline">Jax (fexeak@outlook.com)</a>
        </p>
      </footer>
    </Container>
  )
} 