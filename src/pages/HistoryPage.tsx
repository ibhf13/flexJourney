import { HistoryList } from '@/features/history/components/HistoryList'
import { useHistory } from '@/features/history/hooks/useHistory'
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material'
import { useEffect } from 'react'

export const HistoryPage = () => {
    const { history, isLoading, error, fetchHistory } = useHistory()

    useEffect(() => {
        fetchHistory()
    }, [])

    return (
        <Container maxWidth="md">
            <Box py={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Training History
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {isLoading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <HistoryList history={history} />
                )}
            </Box>
        </Container>
    )
}