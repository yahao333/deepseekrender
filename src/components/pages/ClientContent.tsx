'use client'

import { useState, useRef, useEffect } from 'react'
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { ImageExporter } from "@/components/ImageExporter"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable"
import { locales } from "@/config/i18n"

interface ClientContentProps {
  translations: typeof locales[keyof typeof locales]
}

export function ClientContent({ translations: t }: ClientContentProps) {
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
  const [isPreviewReady, setIsPreviewReady] = useState(false)

  useEffect(() => {
    if (previewRef.current) {
      setIsPreviewReady(true)
    }
  }, [previewRef.current])

  return (
    <>
      <div className="flex justify-end mb-4">
        {isPreviewReady ? (
          <ImageExporter previewRef={previewRef as React.RefObject<HTMLDivElement>} />
        ) : (
          <p>预览区域未准备好</p>
        )}
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
    </>
  )
} 