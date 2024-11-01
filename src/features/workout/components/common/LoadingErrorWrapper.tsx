import { Box, CircularProgress, Alert } from '@mui/material'

interface LoadingErrorWrapperProps {
    isLoading: boolean
    error?: Error | null
    children: React.ReactNode
}

export const LoadingErrorWrapper = ({
    isLoading,
    error,
    children
}: LoadingErrorWrapperProps) => {
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return <Alert severity="error">{error.message}</Alert>
    }

    return <>{children}</>
}