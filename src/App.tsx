import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { NotificationProvider } from '@/features/Feedback'
import { WorkoutProvider } from '@/features/workout/contexts/WorkoutContext'
import { ExerciseProvider } from '@/features/workout/contexts/ExerciseContext'
import theme from '@/styles/theme'
import GlobalStyles from '@/styles/globalStyles'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalStyles as MuiGlobalStyles } from '@mui/material'
import AppRouter from './config/router/AppRouter'

function App() {
  return (
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
  )
}

export default App
