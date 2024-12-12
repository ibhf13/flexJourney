import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { DayCard } from '@/features/workout/components/DayCard'
import { useWorkoutDays } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { Alert, Box, Container, Grid, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const PlanDayPage = () => {
    const { planId } = useParams<{ planId: string }>()
    const navigate = useNavigate()
    const { isLoading, error, data: currentPlan } = useWorkoutDays(planId)

    const handleDaySelect = (day: WorkoutDay) => {
        navigate(`/plan/${planId}/day/${day.id}`)
    }

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {currentPlan?.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {currentPlan?.description}
                    </Typography>
                </Box>

                {currentPlan?.days.length === 0 ? (
                    <Alert severity="info">No workout days available for this plan</Alert>
                ) : (
                    <Grid container spacing={3}>
                        {currentPlan?.days.map((day) => (
                            <Grid item xs={12} sm={6} md={4} key={day.id}>
                                <DayCard day={day} onClick={handleDaySelect} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </LoadingErrorWrapper>
    )
}

export default PlanDayPage
