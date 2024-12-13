import { NavigationProvider } from '@/components/Layout/contexts/NavigationContext'
import { ErrorBoundary } from '@/features/errorHandling/components/ErrorBoundary'
import GlobalStyles from '@/styles/globalStyles'
import theme from '@/styles/theme'
import { GlobalStyles as MuiGlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AppRouter from './config/router/AppRouter'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import { WorkoutBuilderProvider } from './features/workoutBuilder/contexts/WorkoutBuilderContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiGlobalStyles styles={GlobalStyles} />
          <NavigationProvider>
            <AuthProvider>
              <WorkoutBuilderProvider>
                <AppRouter />
                <Toaster
                  position="bottom-center"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#333',
                      color: '#fff',
                    },
                  }}
                />
              </WorkoutBuilderProvider>
            </AuthProvider>
          </NavigationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App