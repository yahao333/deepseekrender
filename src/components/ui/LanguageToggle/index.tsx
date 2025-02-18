'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { languages } from '@/config/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

export const LanguageToggle = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1] || 'zh'
  const [open, setOpen] = useState(false)

  const switchLanguage = (lang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, '').replace(/^\//, '')
    router.push(`/${lang}/${newPath}`)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {languages[currentLang as keyof typeof languages].name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([key, { name }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => switchLanguage(key)}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 