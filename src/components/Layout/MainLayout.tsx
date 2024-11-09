import { useNavigationContext } from '@/contexts/NavigationContext'
import { useRouteChange } from '@/utils/navigation'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = () => {
  const { isSidebarOpen, toggleSidebar } = useNavigationContext()

  useRouteChange()

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />

      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          pt: '64px',
          overflow: 'auto',
          flexGrow: 1,
          minHeight: '100vh',
          transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1)',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
