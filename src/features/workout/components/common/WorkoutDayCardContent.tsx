import { CardContent, Typography, Box, Chip } from '@mui/material'
import { WorkoutDay } from '../../types/WorkoutTypes'
import { DifficultyChip } from '../../../../components/common/Forms/DifficultyChip'
import { ellipsisTextStyles } from '../../../../components/common/Cards/cardStyles'

interface WorkoutDayCardContentProps {
    day: WorkoutDay
}

export const WorkoutDayCardContent = ({ day }: WorkoutDayCardContentProps) => (
    <CardContent>
        <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={ellipsisTextStyles}
        >
            {day.title}
        </Typography>
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                ...ellipsisTextStyles,
                mb: 2,
                minHeight: '3em',
            }}
        >
            {day.description}
        </Typography>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Chip
                label={`${day.exercises.length} exercises`}
                color="primary"
                size="small"
                variant="outlined"
                aria-label={`Contains ${day.exercises.length} exercises`}
            />
            <DifficultyChip
                level={day.level}
                aria-label={`Difficulty level: ${day.level}`}
            />
        </Box>
    </CardContent>
)