'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface MarkdownRendererProps {
  content: string
  showLineNumbers?: boolean
}

export const MarkdownRenderer = ({ content, showLineNumbers = true }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-gray max-w-none markdown-custom-styles">
      <style jsx global>{`
        /* 修复有序列表数字和文本的对齐问题 */
        .markdown-custom-styles ol {
          list-style-position: inside;
          padding-left: 0;
        }
        .markdown-custom-styles ol li {
          display: flex;
          align-items: flex-start;
        }
        .markdown-custom-styles ol li::before {
          content: counter(list-item) ".";
          counter-increment: list-item;
          font-weight: bold;
          margin-right: 0.5em;
          flex-shrink: 0;
        }
        
        /* 修复无序列表项目符号和文本的对齐问题 */
        .markdown-custom-styles ul {
          list-style-type: none;
          padding-left: 0;
        }
        .markdown-custom-styles ul li {
          display: flex;
          align-items: flex-start;
        }
        .markdown-custom-styles ul li::before {
          content: "•";
          font-weight: bold;
          margin-right: 0.5em;
          flex-shrink: 0;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ className, children, ...props }) => {
            // 提取语言类型并添加错误处理
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            // 记录代码块渲染信息
            console.log(`Rendering code block with language: ${language || 'plain text'}`)
            
            try {
              return match ? (
                <SyntaxHighlighter
                  // @ts-expect-error - vscDarkPlus 类型问题已知
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: '1em',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '4px', // 添加圆角
                  }}
                  showLineNumbers={showLineNumbers}
                  wrapLines={true}
                  wrapLongLines={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            } catch (error) {
              console.error('Error rendering code block:', error)
              // 降级渲染
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }
        }}       
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
