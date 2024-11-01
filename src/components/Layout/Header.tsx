import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderProps } from './types'
import UserMenu from './UserMenu'
import { PrimaryButton } from '../common/Buttons'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'

const Header = ({ onMobileMenuOpen }: HeaderProps) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isAuthenticated = true // For testing, replace with actual auth state

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleLogout = () => {
    // Implement your logout logic here
    setUserMenuAnchor(null)
    navigate('/login')
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
          <IconButton color="primary" onClick={onMobileMenuOpen} sx={{ mr: 2 }}>
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
          <>
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{
                p: 0.5,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                }}
              />
            </IconButton>
            <UserMenu anchorEl={userMenuAnchor} onClose={handleUserMenuClose} />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
