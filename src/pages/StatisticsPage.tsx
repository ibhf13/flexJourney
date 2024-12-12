import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { ExerciseProgressCharts } from '@/features/statistics/components/ExerciseProgressCharts'
import { StatisticsOverview } from '@/features/statistics/components/StatisticsOverview'
import { StatisticsSkeleton } from '@/features/statistics/components/StatisticsSkeleton'
import { useStatistics } from '@/features/statistics/hooks/useStatistics'
import { containerStyles } from '@/features/statistics/styles/statisticsStyles'
import { Box, Container, Paper } from '@mui/material'

const StatisticsPage = () => {
    const { isLoading, error } = useStatistics()

    return (
        <Box sx={containerStyles.wrapper}>
            <Container maxWidth="lg">
                <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
                    <LoadingErrorWrapper
                        isLoading={isLoading}
                        error={error}
                        loadingComponent={<StatisticsSkeleton />}
                    >
                        <StatisticsOverview />
                        <ExerciseProgressCharts />
                    </LoadingErrorWrapper>
                </Paper>
            </Container>
        </Box>
    )
}

export default StatisticsPage 