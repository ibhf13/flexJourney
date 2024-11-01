import { DialogProps, DrawerProps } from '@mui/material'

export interface BasePopupProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  showCloseButton?: boolean
  fullHeight?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  actions?: React.ReactNode
  children: React.ReactNode
}

export interface DialogPopupProps extends BasePopupProps {
  fullScreen?: boolean
  preventBackdropClick?: boolean
  customDialogProps?: Partial<DialogProps>
}

export interface SideDrawerProps extends BasePopupProps {
  anchor?: 'left' | 'right'
  width?: number | string
  customDrawerProps?: Partial<DrawerProps>
}

export interface MobileDrawerProps extends BasePopupProps {
  anchor?: 'bottom' | 'left' | 'right' | 'top'
  height?: number | string
  customDrawerProps?: Partial<DrawerProps>
}
