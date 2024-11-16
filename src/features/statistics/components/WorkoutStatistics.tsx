import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Grid } from '@mui/material'
import { useStatistics } from '../hooks/useStatistics'
import { StatisticsCard } from './StatisticsCard'

export const WorkoutStatistics = () => {
    const { stats, isLoading } = useStatistics()

    if (isLoading) {
        return null // Add a skeleton loader here
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <StatisticsCard
                    icon={<WhatshotIcon color="primary" />}
                    label="Current Streak"
                    value={stats?.currentStreak || 0}
                    description="Consecutive days"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatisticsCard
                    icon={<LocalFireDepartmentIcon color="primary" />}
                    label="Longest Streak"
                    value={stats?.longestStreak || 0}
                    description="Personal best"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatisticsCard
                    icon={<FitnessCenterIcon color="primary" />}
                    label="Total Workouts"
                    value={stats?.totalWorkouts || 0}
                    description="Completed sessions"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatisticsCard
                    icon={<TrendingUpIcon color="primary" />}
                    label="Monthly Average"
                    value={stats?.monthlyAverage || 0}
                    description="Workouts per month"
                />
            </Grid>
        </Grid>
    )
}