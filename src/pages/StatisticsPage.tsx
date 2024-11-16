import { Alert, Box, Container, Grid, Skeleton, Typography } from '@mui/material'

import { UserStats } from '@/features/statistics/components/UserStats'
import { WorkoutStatistics } from '@/features/statistics/components/WorkoutStatistics'
import { useStatistics } from '@/features/statistics/hooks/useStatistics'

const STATS_PAGE_TEXTS = {
    TITLE: 'Statistics Dashboard',
    ERROR: 'Unable to load statistics. Please try again later.',
    NO_DATA: 'No statistics available. Start working out to see your progress!'
} as const

export const StatisticsPage = () => {
    const { stats, isLoading, error } = useStatistics()

    if (error) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{ mt: 4 }}>
                    {STATS_PAGE_TEXTS.ERROR}
                </Alert>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', py: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        mb: 4,
                        fontWeight: 'bold',
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    {STATS_PAGE_TEXTS.TITLE}
                </Typography>

                {isLoading ? (
                    <StatsLoadingSkeleton />
                ) : !stats ? (
                    <Alert severity="info">
                        {STATS_PAGE_TEXTS.NO_DATA}
                    </Alert>
                ) : (
                    <Grid container direction="column" spacing={4}>
                        <Grid item xs={12} md={6}>
                            <UserStats stats={stats} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <WorkoutStatistics />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    )
}

const StatsLoadingSkeleton = () => (
    <Grid container direction="column" spacing={3}>
        <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={200} />
        </Grid>
    </Grid>
)