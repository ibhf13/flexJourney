import { useLogout } from '@/features/auth/hooks/useLogout'
import {
  ExitToApp as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material'
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, alpha } from '@mui/material'
import { Link } from 'react-router-dom'

interface UserMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
}

const UserMenu = ({ anchorEl, onClose }: UserMenuProps) => {
  const { handleLogout } = useLogout()

  const handleLogoutClick = async () => {
    onClose()
    await handleLogout()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      onClick={onClose}
      slotProps={{
        paper: {
          elevation: 4,
          sx: {
            width: 220,
            mt: 1.5,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'visible',
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
              },
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.main',
              minWidth: 36,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem component={Link} to="/profile">
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      <MenuItem onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
