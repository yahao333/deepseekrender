import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, defaultLocale } from '@/config/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = Object.keys(languages).every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 