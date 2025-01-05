import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { Chip, Tooltip } from '@mui/material'

interface ExerciseChipProps {
    exercise: Exercise
    isSelected: boolean
    onSelect: (exercise: Exercise) => void
}

export const ExerciseChip = ({ exercise, isSelected, onSelect }: ExerciseChipProps) => (
    <Tooltip
        title={isSelected ? "Already added" : "Click to add"}
        arrow
    >
        <Chip
            label={exercise.title}
            onClick={() => onSelect(exercise)}
            clickable
            color={isSelected ? 'primary' : 'default'}
            sx={{
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                }
            }}
        />
    </Tooltip>
)