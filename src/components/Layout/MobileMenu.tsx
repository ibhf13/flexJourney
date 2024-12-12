import { useNavigationContext } from '@/components/Layout/contexts/NavigationContext'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import {
  History as HistoryIcon,
  Home as HomeIcon,
  Person as ProfileIcon,
  FitnessCenter as WorkoutIcon,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../common/Buttons'
import { SideDrawer } from '../common/Popups'
import { SidebarProps } from './types'

const navigationItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Plan', path: '/plan', icon: <WorkoutIcon /> },
  { label: 'Workouts', path: '/workouts', icon: <WorkoutIcon /> },
  { label: 'History', path: '/history', icon: <HistoryIcon /> },
  { label: 'Profile', path: '/profile', icon: <ProfileIcon /> },
]

const MobileMenu = ({ open, onClose }: SidebarProps) => {
  const { isAuthenticated } = useAuthContext()
  const { activeRoute } = useNavigationContext()

  return (
    <SideDrawer open={open} onClose={onClose} title="Menu" anchor="left" width={280}>
      <List component="nav">
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={onClose}
              selected={activeRoute === item.path}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: activeRoute === item.path ? 'inherit' : 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {!isAuthenticated && (
        <Box sx={{ p: 2 }}>
          <PrimaryButton
            component={Link}
            href="/login"
            variant="contained"
            fullWidth
            onClick={onClose}
          >
            Login
          </PrimaryButton>
        </Box>
      )}
    </SideDrawer>
  )
}

export default MobileMenu
