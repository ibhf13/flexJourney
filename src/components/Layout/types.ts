import { ReactNode } from 'react'

export interface HeaderProps {
  toggleSidebar: () => void
}

export interface FooterProps {
  socialLinks?: {
    icon: ReactNode
    url: string
    label: string
  }[]
}

export interface MainLayoutProps {
  children: ReactNode
}

export interface UserMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
}

export interface SidebarProps {
  open: boolean
  onClose: () => void
}

export interface NavigationProps {
  orientation?: 'horizontal' | 'vertical'
}

export interface NavigationItem {
  label: string
  path: string
  icon?: ReactNode
}
