'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface MarkdownRendererProps {
  content: string
  showLineNumbers?: boolean // 新增属性
}

export const MarkdownRenderer = ({ content, showLineNumbers = true }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none markdown-custom-styles">
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
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '1em',
                  backgroundColor: '#1e1e1e',
                }}
                showLineNumbers={showLineNumbers}  // 使用传入的属性
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
          }
        }}       
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}