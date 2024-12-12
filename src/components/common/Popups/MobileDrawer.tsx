import {
  Box,
  SwipeableDrawer,
  SwipeableDrawerProps,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import PopupHeader from './PopupHeader'
import { StyledDialogContent } from './styles'
import { BasePopupProps } from './types'

interface MobileDrawerProps extends BasePopupProps {
  anchor?: SwipeableDrawerProps['anchor']
  customDrawerProps?: Partial<SwipeableDrawerProps>
  drawerHeight?: string
  swipeAreaWidth?: number
  disableSwipeToOpen?: boolean
}

const DrawerContent = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}))

const MobileDrawer = ({
  open,
  onClose,
  children,
  headerStyle,
  icon,
  iconStyle,
  headerContent,
  contentStyle,
  drawerHeight = '100dvh',
  anchor = 'bottom',
  customDrawerProps,
  swipeAreaWidth = 20,
  disableSwipeToOpen = true,
  isCompleteCustomHeader = false,
}: MobileDrawerProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const handleOpen = () => {
    // Required by SwipeableDrawer, but we disable swipe to open by default
  }

  const paperProps: SwipeableDrawerProps['PaperProps'] = {
    sx: {
      height: drawerHeight,
      width: ['left', 'right'].includes(anchor) ? (isMobile ? '100%' : '400px') : '100%',
      borderTopLeftRadius: anchor === 'bottom' ? 16 : 0,
      borderTopRightRadius: anchor === 'bottom' ? 16 : 0,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      ...customDrawerProps?.PaperProps?.sx,
    },
    'aria-modal': 'true',
    role: 'dialog',
  }

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      onOpen={handleOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      disableSwipeToOpen={disableSwipeToOpen}
      swipeAreaWidth={swipeAreaWidth}
      PaperProps={paperProps}
      {...customDrawerProps}
      sx={{ zIndex: theme.zIndex.drawer + 2 }}
    >
      <DrawerContent>
        <PopupHeader
          onClose={onClose}
          headerStyle={headerStyle}
          icon={icon}
          iconStyle={iconStyle}
          isCompleteCustomHeader={isCompleteCustomHeader}
        >
          {headerContent}
        </PopupHeader>
        <StyledDialogContent sx={contentStyle}>
          {children}
        </StyledDialogContent>
      </DrawerContent>
    </SwipeableDrawer>
  )
}

export default MobileDrawer
