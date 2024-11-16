import { UserStats } from '@/features/statistics/components/UserStats'
import { WorkoutStatistics } from '@/features/statistics/components/WorkoutStatistics'
import { useStatistics } from '@/features/statistics/hooks/useStatistics'
import { Box, Typography } from '@mui/material'

export const StatisticsPage = () => {
    const { stats, isLoading } = useStatistics()

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!stats) {
        return <h1>No statistics found</h1>
    }

    return (
        <Box sx={{ width: '100%', p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Statistics
            </Typography>
            <UserStats stats={stats} />
            <WorkoutStatistics />
        </Box>
    )
}