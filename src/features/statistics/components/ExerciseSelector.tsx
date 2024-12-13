import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ExerciseProgress } from '../types/statisticsTypes'

interface ExerciseSelectorProps {
    exercises: ExerciseProgress[]
    selectedExercise: string
    onExerciseChange: (exerciseId: string) => void
}

export const ExerciseSelector = ({
    exercises,
    selectedExercise,
    onExerciseChange
}: ExerciseSelectorProps) => (
    <FormControl
        sx={{
            minWidth: 200,
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            '& .MuiOutlinedInput-root': {
                borderRadius: 2
            }
        }}
    >
        <Select
            value={selectedExercise}
            onChange={(e: SelectChangeEvent) => onExerciseChange(e.target.value)}
            size="small"
        >
            {exercises.map(exercise => (
                <MenuItem key={exercise.exerciseId} value={exercise.exerciseId}>
                    {exercise.exerciseName}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
) 