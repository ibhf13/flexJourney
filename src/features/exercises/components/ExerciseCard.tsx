import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import EditIcon from '@mui/icons-material/Edit'
import { Chip, IconButton } from '@mui/material'
import { Exercise } from '../types/ExerciseTypes'

interface ExerciseCardProps {
    exercise: Exercise
    onEdit?: (exercise: Exercise) => void
    onView?: (exercise: Exercise) => void
    isAdmin?: boolean
}

export const ExerciseCard = ({
    exercise,
    onEdit,
    onView,
    isAdmin = false
}: ExerciseCardProps) => {
    const handleCardClick = () => {
        onView?.(exercise)
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEdit?.(exercise)
    }


    return (
        <BaseCard
            title={exercise.title}
            imageUrl={exercise.imageUrl}
            imageHeight={200}
            onClick={handleCardClick}
            actionButton={isAdmin && (
                <IconButton
                    onClick={handleEditClick}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        bgcolor: 'background.paper',
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                        zIndex: 1
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            )}
            sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
            }}
        >
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