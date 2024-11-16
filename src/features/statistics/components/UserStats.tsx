import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { WorkoutStat } from '../types/StatisticsTypes'

interface StatBlockProps {
    label: string
    value: string | number
    icon: React.ReactNode
    description?: string
}

const StatBlock = ({ label, value, icon, description }: StatBlockProps) => (
    <Paper
        sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon}
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold">
            {value}
        </Typography>
        {description && (
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        )}
    </Paper>
)

export const UserStats = ({ stats }: { stats: WorkoutStat | undefined }) => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <StatBlock
                            label="Current Streak"
                            value={12}
                            icon={<WhatshotIcon color="primary" />}
                            description="Consecutive days of training"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StatBlock
                            label="Best Streak"
                            value={12}
                            icon={<EmojiEventsIcon color="primary" />}
                            description="Your longest training streak"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StatBlock
                            label="Total Workouts"
                            value={stats?.totalWorkouts || 0}
                            icon={<FitnessCenterIcon color="primary" />}
                            description="Completed workout sessions"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StatBlock
                            label="Monthly Average"
                            value={stats?.monthlyAverage || 0}
                            icon={<TrendingUpIcon color="primary" />}
                            description="Workouts per month"
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Achievements
                        </Typography>
                        <Typography variant="h4" component="div" fontWeight="bold">
                            {12}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Badges unlocked through dedication
                        </Typography>
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
    )
}