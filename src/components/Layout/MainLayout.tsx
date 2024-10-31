import { Box } from '@mui/material';
import { MainLayoutProps } from './types';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigation } from '@/contexts/NavigationContext';

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isSidebarOpen, toggleMobileMenu } = useNavigation();

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      height: '100%',
      backgroundColor: '#121212',
    }}>
      <Header onMobileMenuOpen={toggleMobileMenu} />
      <Sidebar
        open={isSidebarOpen}
        onClose={toggleMobileMenu}
      />

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
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;