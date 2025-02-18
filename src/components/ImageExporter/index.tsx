'use client'

import { Button } from '@/components/ui/Button'
import html2canvas from 'html2canvas'
import { useParams } from 'next/navigation'
import { locales } from '@/config/i18n'

interface ImageExporterProps {
  previewRef: React.RefObject<HTMLDivElement>
}

export const ImageExporter = ({ previewRef }: ImageExporterProps) => {
  const { lang } = useParams()
  const t = locales[lang as keyof typeof locales]

  const exportAsImage = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current)
        const url = canvas.toDataURL('image/png')
        
        const link = document.createElement('a')
        link.download = 'markdown-preview.png'
        link.href = url
        link.click()
      } catch (error) {
        console.error('Export failed:', error)
      }
    }
  }

  return (
    <Button onClick={exportAsImage}>
      {t.home.exportButton}
    </Button>
  )
} 