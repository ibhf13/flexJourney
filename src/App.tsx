import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { NotificationProvider } from '@/features/Feedback'
import { WorkoutProvider } from '@/features/workout/contexts/WorkoutContext'
import { ExerciseProvider } from '@/features/exercises/contexts/ExerciseContext'
import theme from '@/styles/theme'
import GlobalStyles from '@/styles/globalStyles'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalStyles as MuiGlobalStyles } from '@mui/material'
import AppRouter from './config/router/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
            <NotificationProvider>
              <WorkoutProvider>
                <ExerciseProvider>
                  <AppRouter />
                </ExerciseProvider>
              </WorkoutProvider>
            </NotificationProvider>
          </AuthProvider>
        </NavigationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
