'use client'

import { useState, useRef } from 'react'
import { Container } from "@/components/ui/Container"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { ImageExporter } from "@/components/ImageExporter"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable"

const defaultMarkdown = `# DeepSeekRender

一个现代化的渲染引擎，支持 Markdown 渲染和图片导出。

## 特性

- ✨ Markdown 实时渲染
- 🖼️ 图片导出功能
- 🌓 深色模式支持
- 📱 响应式设计
`

export default function Home() {
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
              placeholder="在此输入 Markdown 内容..."
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
    </Container>
  )
}
