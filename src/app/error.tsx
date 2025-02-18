'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里添加错误日志上报
    console.error(error)
  }, [error])

  return (
    <Container className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          糟糕！出现了一些问题
        </h2>
        <p className="text-muted-foreground">
          {error.message || '发生了一个错误，请稍后重试'}
        </p>
        <div className="space-x-4">
          <Button onClick={() => reset()}>重试</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            刷新页面
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded-md bg-muted p-4">
            <p className="text-sm text-muted-foreground break-all">
              {error.digest}
            </p>
            <pre className="mt-2 text-sm text-muted-foreground break-all">
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </Container>
  )
}
