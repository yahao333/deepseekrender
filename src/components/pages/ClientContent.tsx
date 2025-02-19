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
  
  // 控制参数
  const [bgColor, setBgColor] = useState('#ffffff'); // 前景颜色
  const [startColor, setStartColor] = useState('#3b82f6'); // 渐变起始颜色
  const [endColor, setEndColor] = useState('#9333ea'); // 渐变结束颜色
  const [shadowSize, setShadowSize] = useState(4); // 阴影大小
  const [borderRadius, setBorderRadius] = useState(8); // 圆角大小

  useEffect(() => {
    if (previewRef.current) {
      setIsPreviewReady(true)
    }
  }, [])

  return (
    <>
      <div className="flex justify-end mb-4">
        {isPreviewReady ? (
          <ImageExporter previewRef={previewRef as React.RefObject<HTMLDivElement>} />
        ) : (
          <p>预览区域未准备好</p>
        )}
      </div>
      
      {/* 使用 ResizablePanelGroup 保持左侧编辑区和右侧预览区可调整 */}
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
          {/* 让预览区背景稍微有点区别，可选。也可以去掉 bg-gray-50 */}
          <div className="relative h-full overflow-hidden flex items-center"> {/* 使用 flex 布局 */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, ${startColor}, ${endColor})` }} // 动态渐变背景
            />
            <div
              ref={previewRef}
              className="relative z-10 bg-white rounded-lg p-6 mx-4" // 前景，设置 padding 和 margin
              style={{ backgroundColor: bgColor, borderRadius: `${borderRadius}px`, boxShadow: `0 0 ${shadowSize}px rgba(0, 0, 0, 0.5)` }} // 应用控制参数
            >
              <MarkdownRenderer content={content} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* 控制参数区域 */}
      <div className="mt-4 p-4 border rounded-lg shadow-md">
        <label>
          渐变起始颜色:
          <input type="color" value={startColor} onChange={(e) => setStartColor(e.target.value)} />
        </label>
        <label className="ml-4">
          渐变结束颜色:
          <input type="color" value={endColor} onChange={(e) => setEndColor(e.target.value)} />
        </label>
        <label className="ml-4">
          前景颜色:
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </label>
        <label className="ml-4">
          阴影大小:
          <input type="number" value={shadowSize} onChange={(e) => setShadowSize(Number(e.target.value))} min="0" />
        </label>
        <label className="ml-4">
          圆角大小:
          <input type="number" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} min="0" />
        </label>
      </div>
    </>
  )
} 