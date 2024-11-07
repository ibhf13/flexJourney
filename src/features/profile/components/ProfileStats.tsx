import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TimelineIcon from '@mui/icons-material/Timeline'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import {
    Box,
    LinearProgress,
    Paper,
    Typography
} from '@mui/material'
import { ProfileStats as ProfileStatsType } from '../types/ProfileTypes'

interface ProfileStatsProps {
    stats: ProfileStatsType | null
}

const StatItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
        {icon}
        <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="h6">
                {value}
            </Typography>
        </Box>
    </Box>
)

const ProfileStats = ({ stats }: ProfileStatsProps) => {
    if (!stats) return null

    const weightProgress = stats.weightProgress || []
    const initialWeight = weightProgress[0]?.weight
    const currentWeight = weightProgress[weightProgress.length - 1]?.weight
    const weightChange = initialWeight && currentWeight 
        ? ((currentWeight - initialWeight) / initialWeight * 100).toFixed(1)
        : null

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Fitness Statistics
            </Typography>

            <StatItem 
                icon={<FitnessCenterIcon color="primary" />}
                label="Total Workouts"
                value={stats.totalWorkouts}
            />

            <StatItem 
                icon={<TimelineIcon color="primary" />}
                label="Total Exercises"
                value={stats.totalExercises}
            />

            <StatItem 
                icon={<WhatshotIcon color="primary" />}
                label="Current Streak"
                value={`${stats.streakDays} days`}
            />

            {weightChange && (
                <Box mt={3}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Weight Progress
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress 
                            variant="determinate" 
                            value={Math.min(Math.abs(Number(weightChange)), 100)}
                            color={Number(weightChange) > 0 ? "success" : "error"}
                            sx={{ flex: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {weightChange}%
                        </Typography>
                    </Box>
                </Box>
            )}
        </Paper>
    )
}

export default ProfileStats