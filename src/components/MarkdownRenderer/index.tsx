'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
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
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}