import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { ExerciseCard } from '@/features/workout/components/ExerciseCard'
import { useWorkoutDays } from '@/features/workout/hooks/useWorkoutQuerys'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ExercisePageSkeleton } from '../components/skeletons/ExerciseCardSkeleton'

const PlanExercisePage = () => {
    const { planId, dayId } = useParams<{ planId: string; dayId: string }>()
    const { data: currentPlan, isLoading, error } = useWorkoutDays(planId)
    const currentDay = currentPlan?.days.find(day => day.id === dayId)
    const exercises = currentDay?.exercises

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 2, sm: 4 },
                px: { xs: 1, sm: 3 },
                overflow: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }}
        >
            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 4 } }}>
                <LoadingErrorWrapper isLoading={isLoading} error={error} loadingComponent={<ExercisePageSkeleton />}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: { sm: 1, md: 4 } }}>
                        <Box>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {currentDay?.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {currentDay?.description}
                            </Typography>
                        </Box>

                        {exercises?.map((exercise) => (
                            <ExerciseCard
                                key={exercise.title}
                                exercise={exercise}
                            />
                        ))}
                    </Box>
                </LoadingErrorWrapper >
            </Paper>
        </Container>
    )
}

export default PlanExercisePage
