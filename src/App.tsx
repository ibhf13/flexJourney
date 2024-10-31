import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NotificationProvider } from '@/features/Feedback';
import theme from '@/styles/theme';
import Router from '@/components/common/Router/Router';
import GlobalStyles from '@/styles/globalStyles';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      {GlobalStyles}
      <NavigationProvider>
        <AuthProvider>
          <NotificationProvider>
            <Router />
          </NotificationProvider>
        </AuthProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;