import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Chip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Exercise } from '../types/ExerciseTypes'

interface ExerciseCardProps {
    exercise: Exercise
    onClick?: (exercise: Exercise) => void
}

export const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick(exercise)
        }
    }

    return (
        <BaseCard
            title={exercise.title}
            imageUrl={exercise.imageUrl}
            imageHeight={200}
            onClick={handleClick}
            sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
            }}
        >
            {false && (
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
                level={exercise.level as DifficultyLevel}
                category={exercise.category}
            >
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
            </BaseCardContent>
        </BaseCard>
    )
}