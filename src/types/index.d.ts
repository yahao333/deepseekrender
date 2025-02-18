export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SiteConfig = {
  name: string
  description: string
  mainNav: MainNavItem[]
  links: {
    github: string
    docs: string
  }
} 