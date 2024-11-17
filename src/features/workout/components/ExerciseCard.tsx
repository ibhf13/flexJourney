import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { Chip } from '@mui/material'
import { DifficultyLevel, Exercise } from '../types/WorkoutTypes'

interface ExerciseCardProps {
    exercise: Exercise
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {

    return (
        <BaseCard
            title={exercise.title}
            imageUrl={exercise.imageUrl}
            imageHeight={200}
            onClick={() => console.log('clicked')}
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
    )
}