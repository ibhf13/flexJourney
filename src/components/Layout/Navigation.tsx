import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import {
  Home as HomeIcon,
  FitnessCenter as WorkoutIcon,
  History as HistoryIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { NavigationProps } from './types';
import { useNavigation } from '@/contexts/NavigationContext';

const navigationItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Plan', path: '/plan', icon: <WorkoutIcon /> },
  { label: 'Workouts', path: '/workouts', icon: <WorkoutIcon /> },
  { label: 'History', path: '/history', icon: <HistoryIcon /> },
  { label: 'Profile', path: '/profile', icon: <ProfileIcon /> },
];

const Navigation = ({ orientation = 'horizontal' }: NavigationProps) => {
  const { activeRoute } = useNavigation();

  return (
    <List component="nav" sx={{ width: '100%' }}>
      {navigationItems.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={activeRoute === item.path}
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
  );
};

export default Navigation;