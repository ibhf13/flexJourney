import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { ExerciseDialog } from '@/features/exercises/components/ExerciseDialog'
import { useExercisesList } from '@/features/exercises/hooks/useExercisesList'
import { Chip } from '@mui/material'
import { DifficultyLevel, Exercise } from '../types/WorkoutTypes'

interface ExerciseCardProps {
    exercise: Exercise
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    const { selectedExercise, handleExerciseSelect, handleCloseModal } = useExercisesList()

    return (
        <>

            <BaseCard
                title={exercise.title}
                imageUrl={exercise.imageUrl}
                imageHeight={200}
                // onClick={() => onClick(exercise)}
                onClick={() => handleExerciseSelect(exercise)}
                sx={{
                    position: 'relative',
                    transition: 'all 0.3s ease',
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
            {selectedExercise && (
                <ExerciseDialog
                    exercise={selectedExercise}
                    open={!!selectedExercise}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}