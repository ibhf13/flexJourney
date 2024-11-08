import { LoadingErrorWrapper } from '@/components/common/Error/LoadingErrorWrapper'
import { DailySummary } from '@/features/history/components/DailySummary'
import { useHistory } from '@/features/history/hooks/useHistory'
import { groupHistoryByDate } from '@/features/history/utils/dateUtils'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect } from 'react'



export const HistoryPage = () => {
    const { history, isLoading, error, isError, fetchHistory } = useHistory()

    useEffect(() => {
        const loadHistory = async () => {
            await fetchHistory()
        }

        loadHistory()
    }, [fetchHistory])

    const groupedHistory = groupHistoryByDate(history)

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        )
    }

    if (isError || error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                p={2}
                textAlign="center"
            >
                <Typography color="error">
                    Error loading workout history. Please try again.
                </Typography>
            </Box>
        )
    }

    if (!history.length) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                p={2}
                textAlign="center"
            >
                <Typography>
                    No workout history found. Start working out to see your progress!
                </Typography>
            </Box>
        )
    }


    return (
        <Container
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 2, md: 4 },
                overflowX: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    maxWidth: 'lg',
                    mx: 'auto',
                    width: '100%',
                    zIndex: 1,
                }}
            >
                <Typography
                    component={motion.h1}
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        mb: { xs: 3, md: 4 },
                        textAlign: 'center',
                        color: 'primary.main',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    }}
                >
                    Workout History
                </Typography>

                <LoadingErrorWrapper isLoading={isLoading} error={error}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: { xs: 2, md: 3 },
                            p: { xs: 1, md: 0 },
                            width: '100%',
                        }}
                    >
                        {groupedHistory.map(({ date, workouts }, index) => (
                            <motion.div
                                key={date}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <DailySummary
                                    date={date}
                                    workouts={workouts}
                                />
                            </motion.div>
                        ))}
                    </Box>
                </LoadingErrorWrapper>
            </Box>
        </Container>
    )
}