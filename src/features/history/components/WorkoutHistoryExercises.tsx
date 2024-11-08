import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { ExerciseLog, ExerciseSet } from '../types/HistoryTypes'
import { ExerciseSetEditor } from './ExerciseSetEditor'

interface WorkoutHistoryExercisesProps {
    exercises: ExerciseLog[]
    availableExercises: Exercise[]
    onAddExercise: (exercise: Exercise) => void
    onRemoveExercise: (exerciseId: string) => void
    onUpdateSets: (exerciseId: string, sets: ExerciseSet[]) => void
}

export const WorkoutHistoryExercises = ({
    exercises,
    availableExercises,
    onAddExercise,
    onRemoveExercise,
    onUpdateSets
}: WorkoutHistoryExercisesProps) => {
    return (
        <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
                Exercises
            </Typography>

            {exercises.map((exercise) => (
                <Box key={exercise.exerciseId} mb={2} p={2} border={1} borderColor="divider" borderRadius={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle2">{exercise.exerciseName}</Typography>
                        <IconButton size="small" onClick={() => onRemoveExercise(exercise.exerciseId)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <ExerciseSetEditor
                        sets={exercise.sets}
                        onChange={(sets) => onUpdateSets(exercise.exerciseId, sets)}
                    />
                </Box>
            ))}

            <FormControl fullWidth margin="normal">
                <InputLabel>Add Exercise</InputLabel>
                <Select
                    value=""
                    label="Add Exercise"
                    onChange={(e) => {
                        const exercise = availableExercises.find(ex => ex.id === e.target.value)

                        if (exercise) onAddExercise(exercise)
                    }}
                >
                    {availableExercises
                        .filter(ex => !exercises.some(e => e.exerciseId === ex.id))
                        .map(exercise => (
                            <MenuItem key={exercise.id} value={exercise.id}>
                                {exercise.title}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}