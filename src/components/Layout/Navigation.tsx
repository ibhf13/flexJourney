import { useNavigationContext } from '@/components/Layout/contexts/NavigationContext'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import {
  CalendarMonth as CalendarMonthIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Assignment as PlanIcon,
  Person as ProfileIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as StatisticsIcon,
  FitnessCenter as WorkoutIcon,
} from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { NavigationProps } from './types'

const navigationItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'My Plan', path: '/progress', icon: <PlanIcon /> },
  { label: 'Exercises', path: '/exercises', icon: <WorkoutIcon /> },
  { label: 'Plan', path: '/plan', icon: <PlanIcon /> },
  { label: 'History', path: '/history', icon: <HistoryIcon /> },
  { label: 'Profile', path: '/profile', icon: <ProfileIcon /> },
  { label: 'Statistics', path: '/statistics', icon: <StatisticsIcon /> },
  { label: 'Calendar', path: '/calendar', icon: <CalendarMonthIcon /> },
  { label: 'Community', path: '/community', icon: <PeopleIcon /> },
  { label: 'Shop', path: '/shop', icon: <ShoppingCartIcon /> },
]

const Navigation = ({ orientation = 'horizontal' }: NavigationProps) => {
  const { activeRoute, setActiveRoute, toggleSidebar } = useNavigationContext()
  const { handleLogout } = useLogout()
  const { isMobile } = useBreakpoints()

  const handleNavigation = (path: string) => {
    setActiveRoute(path)
    if (isMobile) {
      toggleSidebar()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          pb: isMobile ? '80px' : 0, // Add padding to prevent content from being hidden behind logout
        }}
      >
        <List component="nav">
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={activeRoute === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  borderRadius: 1,
                  mb: 0.5,
                  justifyContent: orientation === 'horizontal' ? 'center' : 'initial',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'inherit',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: orientation === 'horizontal' ? 0 : 2,
                    justifyContent: 'center',
                    color: activeRoute === item.path ? 'inherit' : 'primary.main',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {orientation === 'vertical' && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: activeRoute === item.path ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {orientation === 'vertical' && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            mt: 'auto',
            pb: isMobile ? '56px' : 0, // Add padding for mobile bottom bar
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'error.main',
                    color: 'error.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'inherit',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    justifyContent: 'center',
                    color: 'error.main',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  )
}

export default Navigation
