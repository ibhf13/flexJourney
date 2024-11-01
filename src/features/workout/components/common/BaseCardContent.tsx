import { CardContent, Typography, Box, Chip } from '@mui/material'
import { DifficultyLevel } from '../../types/WorkoutTypes'
import { DifficultyChip } from './DifficultyChip'
import { ellipsisTextStyles } from '../../utils/cardStyles'

interface BaseCardContentProps {
    title: string
    description: string
    level: DifficultyLevel
    exercisesCount?: number
}

export const BaseCardContent = ({
    title,
    description,
    level,
    exercisesCount,
}: BaseCardContentProps) => (
    <CardContent>
        <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={ellipsisTextStyles}
        >
            {title}
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
            {description}
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
                label={`${exercisesCount} exercises`}
                color="primary"
                size="small"
                variant="outlined"
                aria-label={`Contains ${exercisesCount} exercises`}
            />
            <DifficultyChip
                level={level}
                aria-label={`Difficulty level: ${level}`}
            />
        </Box>
    </CardContent >
)