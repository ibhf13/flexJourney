import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  FitnessCenter as WorkoutIcon,
  History as HistoryIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { SideDrawer } from '../common/Popups';
import { SidebarProps } from './types';
import { PrimaryButton } from '../common/Buttons';
import { useNavigation } from '@/contexts/NavigationContext';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Plan', path: '/plan', icon: <WorkoutIcon /> },
  { label: 'Workouts', path: '/workouts', icon: <WorkoutIcon /> },
  { label: 'History', path: '/history', icon: <HistoryIcon /> },
  { label: 'Profile', path: '/profile', icon: <ProfileIcon /> },
];

const MobileMenu = ({ open, onClose }: SidebarProps) => {
  const isAuthenticated = useAuth()
  const location = useLocation();
  const { activeRoute } = useNavigation();

  return (
    <SideDrawer
      open={open}
      onClose={onClose}
      title="Menu"
      anchor="left"
      width={280}
    >
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
  );
};

export default MobileMenu;