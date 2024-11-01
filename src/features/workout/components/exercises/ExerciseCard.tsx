import { Box, Typography, Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Exercise } from '../../types/WorkoutTypes'
import { BaseWorkoutCard } from '../common/BaseWorkoutCard'
import { BaseCardContent } from '../common/BaseCardContent'
import { alpha } from '@mui/material/styles'

interface ExerciseCardProps {
    exercise: Exercise
    onSelect: (exercise: Exercise) => void
    isCompleted?: boolean
}

export const ExerciseCard = ({ exercise, onSelect, isCompleted = false }: ExerciseCardProps) => {
    const handleClick = () => {
        if (!isCompleted) {
            onSelect(exercise)
        }
    }

    return (
        <BaseWorkoutCard
            title={exercise.title}
            imageUrl={exercise.imageUrl}
            imageHeight={200}
            onClick={handleClick}
            sx={{
                position: 'relative',
                opacity: isCompleted ? 0.7 : 1,
                filter: isCompleted ? 'grayscale(100%)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            {isCompleted && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.9),
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                    }}
                >
                    <CheckCircleIcon color="inherit" fontSize="small" />
                    <Typography variant="caption" color="white" fontWeight="bold">
                        Done
                    </Typography>
                </Box>
            )}
            <BaseCardContent
                title={exercise.title}
                description={exercise.description}
                level={exercise.level}
            >
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip
                        label={`Rest: ${exercise.defaultRestPeriod}s`}
                        size="small"
                        variant="outlined"
                        color="primary"
                    />
                    <Chip
                        label={exercise.type}
                        size="small"
                        variant="outlined"
                        color="secondary"
                    />
                </Box>
            </BaseCardContent>
        </BaseWorkoutCard >
    )
}