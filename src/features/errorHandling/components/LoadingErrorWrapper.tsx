import { Alert, Box, CircularProgress } from '@mui/material'
import { ReactNode } from 'react'

interface LoadingErrorWrapperProps {
  isLoading: boolean
  error: Error | null
  children: ReactNode
  loadingComponent?: ReactNode
}

export const LoadingErrorWrapper = ({
  isLoading,
  error,
  children,
  loadingComponent
}: LoadingErrorWrapperProps) => {
  if (isLoading) {
    return loadingComponent || (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          borderRadius: 2,
          '& .MuiAlert-message': { width: '100%' }
        }}
      >
        {error.message}
      </Alert>
    )
  }

  return <>{children}</>
}