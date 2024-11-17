import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { ExerciseCard } from '@/features/workout/components/ExerciseCard'
import { useWorkoutDays } from '@/features/workout/hooks/useWorkoutQuerys'
import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export const PlanExercisePage = () => {
    const { planId, dayId } = useParams<{ planId: string; dayId: string }>()
    const { data: currentPlan, isLoading, error } = useWorkoutDays(planId)
    const currentDay = currentPlan?.days.find(day => day.id === dayId)
    const exercises = currentDay?.exercises



    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {currentDay?.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {currentDay?.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {exercises?.map((exercise) => (
                        <ExerciseCard
                            key={exercise.title}
                            exercise={exercise}
                        />
                    ))}
                </Box>
            </Container>
        </LoadingErrorWrapper >
    )
}