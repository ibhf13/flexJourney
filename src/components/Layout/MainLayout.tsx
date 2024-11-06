import { useNavigationContext } from '@/contexts/NavigationContext'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = () => {
  const { isSidebarOpen, toggleSidebar } = useNavigationContext()

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        height: '100%',
        backgroundColor: '#121212',
      }}
    >
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          pt: '64px',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
