import { useAuthContext } from '@/contexts/AuthContext'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { StreakBadge } from '@/features/streak/components/StreakBadge'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../common/Buttons'
import { HeaderProps } from './types'
import UserMenu from './UserMenu'


const Header = ({ toggleSidebar }: HeaderProps) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
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
        backgroundColor: '#121212',
        borderBottom: '1px solid',
        borderColor: 'divider',
        width: { md: `calc(100% - 240px)` },
        ml: { md: '240px' },
      }}
    >
      <Toolbar sx={{ height: '100%' }}>
        {isMobile && (
          <IconButton color="primary" onClick={toggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {isMobile && (
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              FitLife
            </Typography>
          </Link>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {!isAuthenticated ? (
          <PrimaryButton
            component={Link}
            href="/login"
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Login
          </PrimaryButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StreakBadge />
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
