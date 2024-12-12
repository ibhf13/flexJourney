import { Box, Button, Container, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface ErrorFallbackProps {
    error: Error | null
    resetError?: () => void
    icon?: ReactNode
}

export const ErrorFallback = ({
    error,
    resetError,
    icon
}: ErrorFallbackProps) => {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                    textAlign: 'center',
                    gap: 3
                }}
            >
                {icon}
                <Typography variant="h5" gutterBottom>
                    Something went wrong
                </Typography>
                <Typography color="text.secondary" paragraph>
                    {error?.message || 'An unexpected error occurred'}
                </Typography>
                {resetError && (
                    <Button
                        variant="contained"
                        onClick={resetError}
                        sx={{ mt: 2 }}
                    >
                        Try again
                    </Button>
                )}
            </Box>
        </Container>
    )
}