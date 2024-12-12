import { DialogProps, SwipeableDrawerProps, SxProps, Theme } from '@mui/material'

export interface BasePopupProps {
  open: boolean
  onClose: () => void
  headerStyle?: SxProps<Theme>
  headerContent?: JSX.Element
  icon?: React.ReactNode
  iconStyle?: SxProps<Theme>
  contentStyle?: SxProps<Theme>
  title?: string
  subtitle?: string
  children: React.ReactNode
  preventBackdropClick?: boolean
  isCompleteCustomHeader?: boolean

}

export interface ResponsivePopupProps extends BasePopupProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullHeight?: boolean
  drawerAnchor?: SwipeableDrawerProps['anchor']
  drawerHeight?: string
  swipeAreaWidth?: number
  disableSwipeToOpen?: boolean
  customDialogProps?: Partial<DialogProps>
  customDrawerProps?: Partial<SwipeableDrawerProps>
}
