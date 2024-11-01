import { TabsProps as MuiTabsProps } from '@mui/material'

export interface BreadcrumbItem {
  label: string
  path?: string
  icon?: React.ReactElement
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  maxItems?: number
  separator?: React.ReactNode
  className?: string
}

export interface TabItem {
  label: string
  value: string | number
  icon?: React.ReactElement
  disabled?: boolean
  path?: string
}

export interface CustomTabsProps extends Omit<MuiTabsProps, 'onChange'> {
  items: TabItem[]
  value: string | number
  onChange: (value: string | number) => void
  variant?: 'standard' | 'fullWidth' | 'scrollable'
  orientation?: 'horizontal' | 'vertical'
  showIcons?: boolean
  centered?: boolean
}

export interface TabPanelProps {
  children?: React.ReactNode
  value: string | number
  index: string | number
}
