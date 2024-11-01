import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Container, Grid, Alert, CircularProgress } from '@mui/material'
import { ExerciseCard } from '@/features/workout/components/exercises/ExerciseCard'
import { useExerciseContext } from '@/features/workout/contexts/ExerciseContext'
import { useDayDetails } from '@/features/workout/hooks/useDayDetails'

export const ExerciseListPage = () => {
    const { planId, dayId } = useParams<{ planId: string; dayId: string }>()
    const { currentDay, isLoading: isDayLoading, error: dayError } = useDayDetails(planId, dayId)
    const { exercises, completedExercises, setExercises, toggleExerciseCompletion } = useExerciseContext()

    useEffect(() => {
        if (currentDay) {
            setExercises(currentDay.exercises)
        }
    }, [currentDay, setExercises])

    const handleExerciseSelect = (exerciseId: string) => {
        toggleExerciseCompletion(exerciseId)
    }

    if (isDayLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        )
    }

    if (dayError) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error">{dayError.message}</Alert>
            </Container>
        )
    }

    if (!currentDay) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="warning">No workout day found</Alert>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {currentDay.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {currentDay.description}
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {exercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                        <ExerciseCard
                            exercise={exercise}
                            onSelect={() => handleExerciseSelect(exercise.id)}
                            isCompleted={completedExercises.has(exercise.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}