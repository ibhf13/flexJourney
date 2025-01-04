import { useProfile } from '@/features/profile/hooks/useProfile'
import { calculateWeightGoalInfo } from '@/features/profile/utils/profileUtils'
import { useStatistics } from '@/features/statistics/hooks/useStatistics'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ScaleIcon from '@mui/icons-material/Scale'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Box, Grid, Paper, Typography } from '@mui/material'

export const HomeStats = () => {
    const { stats } = useStatistics()
    const { profile } = useProfile()

    if (!stats) return null

    const weightGoalInfo = profile?.profileMetrics?.weight && profile?.profileMetrics?.targetWeight
        ? calculateWeightGoalInfo(profile.profileMetrics.weight, profile.profileMetrics.height, profile.profileMetrics.targetWeight)
        : null

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    sx={{
                        p: 3,
                        height: '100%',
                        background: (theme) => `linear-gradient(135deg, 
                            ${theme.palette.primary.main}15, 
                            ${theme.palette.primary.main}25
                        )`,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        display: { xs: 'flex', md: 'block' },
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CalendarMonthIcon color="primary" />
                        <Typography variant="h6" color="primary.main">
                            Training Days
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.totalTrainingDays}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {stats.averageWorkoutsPerMonth} workouts/month
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    sx={{
                        p: 3,
                        height: '100%',
                        background: (theme) => `linear-gradient(135deg, 
                            ${theme.palette.secondary.main}15, 
                            ${theme.palette.secondary.main}25
                        )`,
                        border: '1px solid',
                        borderColor: 'secondary.main',
                        borderRadius: 2,
                        display: { xs: 'flex', md: 'block' },
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <FitnessCenterIcon color="secondary" />
                        <Typography variant="h6" color="secondary.main">
                            Most Frequent
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {stats.mostFrequentExercise.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {stats.mostFrequentExercise.count} sets total
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    sx={{
                        p: 3,
                        height: '100%',
                        background: (theme) => `linear-gradient(135deg, 
                            ${theme.palette.success.main}15, 
                            ${theme.palette.success.main}25
                        )`,
                        border: '1px solid',
                        borderColor: 'success.main',
                        borderRadius: 2,
                        display: { xs: 'flex', md: 'block' },
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <TrendingUpIcon color="success" />
                        <Typography variant="h6" color="success.main">
                            Total Volume
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {Math.round(stats.totalVolume).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        kg lifted in total
                    </Typography>
                </Paper>
            </Grid>

            {weightGoalInfo && (
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            background: (theme) => `linear-gradient(135deg, 
                                ${theme.palette.info.main}15, 
                                ${theme.palette.info.main}25
                            )`,
                            border: '1px solid',
                            borderColor: 'info.main',
                            borderRadius: 2,
                            display: { xs: 'flex', md: 'block' },
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <ScaleIcon color="info" />
                            <Typography variant="h6" color="info.main">
                                Weight {weightGoalInfo.type === 'loss' ? 'Loss' : 'Gain'} Goal
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {weightGoalInfo.currentWeight} / {profile?.profileMetrics?.targetWeight} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {weightGoalInfo.remainingWeight.toFixed(1)} kg to {weightGoalInfo.type}
                        </Typography>
                    </Paper>
                </Grid>
            )}
        </Grid>
    )
} 