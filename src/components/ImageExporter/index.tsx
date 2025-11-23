'use client'

import { Button } from '@/components/ui/Button'
import html2canvas from 'html2canvas'
import { useParams } from 'next/navigation'
import { locales } from '@/config/i18n'

interface ImageExporterProps {
  previewRef: React.RefObject<HTMLDivElement>
}

export const ImageExporter = ({ previewRef }: ImageExporterProps) => {
  console.log(locales); // 在 ImageExporter 组件中添加此行以检查 locales 的内容

  const params = useParams<{ lang?: string }>();
  const lang = params ? params.lang : 'en'; // 如果 params 为 null，则使用默认值 'en'
  const t = locales[lang as keyof typeof locales] || locales['en']; // 确保 t 有一个默认值
  console.log(t.home.exportButton); // 调试信息

  const exportAsImage = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current.parentElement!);
        const url = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.download = 'markdown-preview.png';
        link.href = url;
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  }

  return (
    <Button onClick={exportAsImage}>
      {t.home.exportButton}
    </Button>
  )
} 