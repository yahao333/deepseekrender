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
  const [startColor, setStartColor] = useState('#74d6c7'); // 渐变起始颜色
  const [endColor, setEndColor] = useState('#5e9bf4'); // 渐变结束颜色
  const [shadowSize, setShadowSize] = useState(4); // 阴影大小
  const [borderRadius, setBorderRadius] = useState(8); // 圆角大小

  // 新增控制：渲染区域宽高
  const [renderWidth, setRenderWidth] = useState(800)  

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
          <p>{t.preview.notReady}</p> // 使用翻译
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
          {/* 让右侧可滚动，方便调试时不至于被截断 */}
          <div className="h-full overflow-auto flex justify-center items-center">
            {/* 固定尺寸容器，超出隐藏，留白效果 */}
            <div
              className="relative"
              style={{
                width: renderWidth,
                height: '100%',
                overflow: 'hidden', // 超出隐藏
              }}
            >
              {/* 背景层：线性渐变 */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, ${startColor}, ${endColor})`,
                }}
              />
              {/* 前景卡片层 */}
              <div
                ref={previewRef}
                className="relative z-10"
                style={{
                  backgroundColor: bgColor,
                  borderRadius: `${borderRadius}px`,
                  boxShadow: `0 0 ${shadowSize}px rgba(0, 0, 0, 0.5)`,
                  margin: 20,   // 让卡片四周留出间距
                  padding: 20,  // 卡片内边距
                  width: `calc(100% - 40px)`,  // 减去 margin
                  height: `calc(100% - 40px)`, // 减去 margin
                  overflow: 'auto',
                }}
              >
                <MarkdownRenderer content={content} />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

          {/* 控制参数区域 */}
          <div className="mt-4 p-4 border rounded-lg shadow-md space-x-4">
        <label>
          {t.controls.renderWidth}:
          <input
            type="number"
            value={renderWidth}
            onChange={(e) => setRenderWidth(Number(e.target.value))}
            min="100"
            className="ml-1 w-12"
          />
        </label>
        <label>
          {t.controls.gradientStartColor}:
          <input
            type="color"
            value={startColor}
            onChange={(e) => setStartColor(e.target.value)}
            className="ml-1"
          />
        </label>
        <label>
          {t.controls.gradientEndColor}:
          <input
            type="color"
            value={endColor}
            onChange={(e) => setEndColor(e.target.value)}
            className="ml-1"
          />
        </label>
        <label>
          {t.controls.foregroundColor}:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="ml-1"
          />
        </label>
        <label>
          {t.controls.shadowSize}:
          <input
            type="number"
            value={shadowSize}
            onChange={(e) => setShadowSize(Number(e.target.value))}
            min="0"
            className="ml-1 w-12"
          />
        </label>
        <label>
          {t.controls.borderRadius}:
          <input
            type="number"
            value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            min="0"
            className="ml-1 w-12"
          />
        </label>
      </div>
    </>
  )
} 