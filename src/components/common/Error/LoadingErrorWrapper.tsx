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
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error.message || 'An error occurred'}
            </Alert>
        )
    }

    return <>{children}</>
}