import { Container } from "@/components/ui/Container"

export default function DocsPage() {
  return (
    <Container className="py-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>文档</h1>
        <h2>功能特性</h2>
        <ul>
          <li>支持 Markdown 文档渲染</li>
          <li>支持图片导出功能</li>
          <li>支持深色/浅色主题切换</li>
          <li>响应式设计</li>
        </ul>
        
        <h2>使用指南</h2>
        <h3>Markdown 渲染</h3>
        <p>支持标准的 Markdown 语法，包括：</p>
        <ul>
          <li>标题（H1-H6）</li>
          <li>列表（有序/无序）</li>
          <li>代码块（支持语法高亮）</li>
          <li>表格</li>
          <li>图片</li>
        </ul>
      </div>
    </Container>
  )
} 