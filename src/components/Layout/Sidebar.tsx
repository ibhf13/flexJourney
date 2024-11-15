import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import Navigation from './Navigation'
import { SidebarProps } from './types'

const SIDEBAR_WIDTH = 240

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Drawer
      variant={isDesktop ? 'persistent' : 'temporary'}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: open ? SIDEBAR_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
          pt: '64px',
          height: '100vh',
          mt: 0,
          zIndex: theme.zIndex.drawer,
        },
      }}
    >
      <Box sx={{ p: 2, height: '100%' }}>
        <Navigation orientation="vertical" />
      </Box>
    </Drawer>
  )
}

export default Sidebar
