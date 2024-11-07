import { AuthProvider } from '@/contexts/AuthContext'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { ExerciseProvider } from '@/features/exercises/contexts/ExerciseContext'
import { NotificationProvider } from '@/features/Feedback/contexts/NotificationContext'
import { ProfileProvider } from '@/features/profile/contexts/ProfileContext'
import { WorkoutProvider } from '@/features/workout/contexts/WorkoutContext'
import GlobalStyles from '@/styles/globalStyles'
import theme from '@/styles/theme'
import { GlobalStyles as MuiGlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRouter from './config/router/AppRouter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiGlobalStyles styles={GlobalStyles} />
        <NavigationProvider>
          <AuthProvider>
            <ProfileProvider>
              <NotificationProvider>
                <WorkoutProvider>
                  <ExerciseProvider>
                    <AppRouter />
                  </ExerciseProvider>
                </WorkoutProvider>
              </NotificationProvider>
            </ProfileProvider>
          </AuthProvider>
        </NavigationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
