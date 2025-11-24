import { languages } from "@/config/i18n"

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 只保留语言相关的逻辑，不再渲染完整的HTML结构
  return children
}
