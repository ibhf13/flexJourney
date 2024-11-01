import { useParams, useNavigate } from 'react-router-dom'
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material'
import { WorkoutDayCard } from '@/features/workout/components/WorkoutDayCard'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { usePlanDetails } from '@/features/workout/hooks/usePlanDetails'

export const PlanDetailsPage = () => {
    const { planId } = useParams<{ planId: string }>()
    const navigate = useNavigate()
    const { isLoading, error, currentPlan } = usePlanDetails(planId)

    const handleDaySelect = (day: WorkoutDay) => {
        navigate(`/plan/${planId}/day/${day.id}`)
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        )
    }

    if (!currentPlan) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="warning">No workout plan selected</Alert>
            </Container>
        )
    }

    return (
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
    )
}