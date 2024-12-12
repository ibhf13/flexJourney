import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { DailySummary } from '@/features/history/components/DailySummary'
import { useHistory } from '@/features/history/hooks/useHistory'
import { groupHistoryByDate } from '@/features/history/utils/dateUtils'
import { Box, Container, Typography } from '@mui/material'

const HistoryPage = () => {
    const { history, isLoading, error } = useHistory()
    const groupedHistory = groupHistoryByDate(history)

    if (!history.length && !isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
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
            disableGutters
            sx={{
                height: '100%',
                backgroundColor: 'background.default',
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 2, md: 4 },
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    p: { xs: 1, sm: 2 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        textAlign: 'center',
                        color: 'primary.main',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    }}
                >
                    Workout History
                </Typography>

                <LoadingErrorWrapper isLoading={isLoading} error={error}>
                    <Box>
                        {groupedHistory.map(({ date, workouts }) => (
                            <DailySummary
                                key={date}
                                date={date}
                                entries={workouts.map(workout => workout.entry)}
                            />
                        ))}
                    </Box>
                </LoadingErrorWrapper>
            </Box>
        </Container>
    )
}

export default HistoryPage
