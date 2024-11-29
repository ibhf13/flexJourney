import { useProfile } from '@/features/profile/hooks/useProfile'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../common/Buttons'
import AppLogo from './AppLogo'
import { HeaderProps } from './types'
import UserMenu from './UserMenu'

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isAuthenticated = useAuthContext()
  const { profile } = useProfile()

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }


  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        height: 64,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        width: '100%',
        zIndex: 2,
      }}
    >
      <Toolbar sx={{ height: '100%' }}>
        <IconButton
          color="primary"
          onClick={toggleSidebar}
          sx={{ mr: { xs: 1, md: 2 }, display: { xs: 'flex', md: isDesktop ? 'flex' : 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <AppLogo />

        <Box sx={{ flexGrow: 1 }} />

        {!isAuthenticated ? (
          <PrimaryButton
            component={Link}
            href="/login"
            variant="contained"
            size="large"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Login
          </PrimaryButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{
                p: 0.5,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              <Avatar
                src={profile?.photoURL || undefined}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                }}
              />
            </IconButton>
            <UserMenu anchorEl={userMenuAnchor} onClose={handleUserMenuClose} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
