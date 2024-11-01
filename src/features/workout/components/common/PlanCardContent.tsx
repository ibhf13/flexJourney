import { CardContent, Typography, Box } from '@mui/material'
import { WorkoutPlan } from '../../types/WorkoutTypes'
import { DifficultyChip } from './DifficultyChip'

interface PlanCardContentProps {
    plan: WorkoutPlan
}

export const PlanCardContent = ({ plan }: PlanCardContentProps) => (
    <CardContent>
        <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
            }}
        >
            {plan.title}
        </Typography>
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                mb: 2,
                minHeight: '3em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
            }}
        >
            {plan.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <DifficultyChip
                level={plan.level}
                aria-label={`Difficulty level: ${plan.level}`}
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                {plan.days.length} days
            </Typography>
        </Box>
    </CardContent>
)