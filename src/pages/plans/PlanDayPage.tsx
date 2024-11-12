import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { WorkoutDayCard } from '@/features/workout/components/WorkoutDayCard'
import { usePlanDetails } from '@/features/workout/hooks/usePlanDetails'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { Alert, Box, Container, Grid, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

export const PlanDayPage = () => {
    const { planId } = useParams<{ planId: string }>()
    const navigate = useNavigate()
    const { isLoading, error, currentPlan } = usePlanDetails(planId)

    const handleDaySelect = (day: WorkoutDay) => {
        navigate(`/plan/${planId}/day/${day.id}`)
    }

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            {!currentPlan ? (
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Alert severity="warning">No workout plan selected</Alert>
                </Container>
            ) : (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Box mb={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {currentPlan.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {currentPlan.description}
                        </Typography>
                    </Box>

                    {currentPlan.days.length === 0 ? (
                        <Alert severity="info">No workout days available for this plan</Alert>
                    ) : (
                        <Grid container spacing={3}>
                            {currentPlan.days.map((day) => (
                                <Grid item xs={12} sm={6} md={4} key={day.id}>
                                    <WorkoutDayCard day={day} onClick={handleDaySelect} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            )}
        </LoadingErrorWrapper>
    )
}