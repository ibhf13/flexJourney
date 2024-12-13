import { Exercise } from '@/features/workout/types/WorkoutTypes'
import { Box, Grid, Typography } from '@mui/material'
import { useCompletedExercises } from '../hooks/useCompletedExercises'
import { ProgressExerciseCard } from './ProgressExerciseCard'

interface ExerciseListProps {
    exercises: Exercise[]
    dayId: string
    onDayComplete: () => void
}

export const ExerciseList = ({ exercises, dayId, onDayComplete }: ExerciseListProps) => {
    const { isExerciseCompleted, completedExercises } = useCompletedExercises(dayId)

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary'
                }}
            >
                Today's Exercises
            </Typography>
            <Grid container spacing={3}>
                {exercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                        <ProgressExerciseCard
                            exercise={exercise}
                            dayId={dayId}
                            isCompleted={isExerciseCompleted(exercise.id)}
                            onDayComplete={onDayComplete}
                            totalExercises={exercises.length}
                            completedCount={completedExercises.size}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}