import { VirtualizedList } from '@/components/common/VirtualizedList/VirtualizedList'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { DailySummary } from '@/features/history/components/DailySummary'
import { useHistory } from '@/features/history/hooks/useHistory'
import { groupHistoryByDate } from '@/features/history/utils/dateUtils'
import { Box, Container, Typography } from '@mui/material'
import { motion } from 'framer-motion'

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
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            disableGutters
            sx={{
                height: '100%',
                backgroundColor: 'background.default',
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 2, md: 4 },
            }}
        >
            <Box sx={{ height: '100%', p: { xs: 1, sm: 2 } }} >
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
                    <VirtualizedList
                        height="100%"
                        itemSize={200}
                        items={groupedHistory}
                        renderItem={({ item: { date, workouts }, index }) => (
                            <motion.div
                                key={date}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <DailySummary date={date} entries={workouts.map(workout => workout.entry)} />
                            </motion.div>
                        )}
                    />
                </LoadingErrorWrapper>
            </Box>
        </Container >
    )
}

export default HistoryPage
