import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Container, Alert, CircularProgress } from '@mui/material'
import { useExerciseContext } from '@/features/workout/contexts/ExerciseContext'
import { useDayDetails } from '@/features/workout/hooks/useDayDetails'
import { ExerciseList } from '@/features/workout/components/exercises/ExerciseList'

export const ExerciseListPage = () => {
    const { planId, dayId } = useParams<{ planId: string; dayId: string }>()
    const { data: currentDay, isLoading, error } = useDayDetails(planId, dayId)
    const { exercises, setExercises } = useExerciseContext()

    useEffect(() => {
        if (currentDay?.exercises) {
            setExercises(currentDay.exercises)
        }
    }, [currentDay, setExercises])

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error">{error.message}</Alert>
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

            <Box sx={{ mt: 2 }}>
                <ExerciseList exercises={exercises} />
            </Box>
        </Container>
    )
}