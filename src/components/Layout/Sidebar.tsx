import Logo from '@mui/icons-material/FitnessCenter'
import { Box, Divider, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material'
import Navigation from './Navigation'
import { SidebarProps } from './types'

const SIDEBAR_WIDTH = 240

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const content = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Logo sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h6" color="primary">
          FlexJourney
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Navigation orientation="vertical" />
      </Box>
    </Box>
  )

  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
            boxShadow: theme.shadows[2],
          },
        }}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      {content}
    </Drawer>
  )
}

export default Sidebar
