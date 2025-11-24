import Link from 'next/link'
import { defaultLocale } from '@/config/i18n'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold">404 - 页面未找到</h1>
      <p className="text-muted-foreground">你访问的页面不存在或已被移动</p>
      <Link href={`/${defaultLocale}`} className="text-primary underline underline-offset-4">
        返回首页
      </Link>
    </div>
  )
}
