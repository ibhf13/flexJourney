import { ROUTES } from '@/config/router/routeConstants'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { DayCard } from '@/features/workout/components/DayCard'
import { useWorkoutDays } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { ExercisePageSkeleton } from '../components/skeletons/ExerciseCardSkeleton'

const PlanDayPage = () => {
    const { planId } = useParams<{ planId: string }>()
    const navigate = useNavigate()
    const { isLoading, error, data: currentPlan } = useWorkoutDays(planId)

    const handleDaySelect = (day: WorkoutDay) => {
        const path = ROUTES.MAIN.PLANS.DAY
            .replace(':planId', planId ?? '')
            .replace(':dayId', day.id)

        navigate(path)
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 2, sm: 4 },
                px: { xs: 1, sm: 3 },
                overflow: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}
        >
            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 4 } }}>
                <LoadingErrorWrapper isLoading={isLoading} error={error} loadingComponent={<ExercisePageSkeleton />}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: { sm: 1, md: 4 } }}>
                        <Box>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {currentPlan?.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                {currentPlan?.description}
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            {currentPlan?.days.map((day) => (
                                <Grid item xs={12} sm={6} md={4} key={day.id}>
                                    <DayCard day={day} onClick={handleDaySelect} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </LoadingErrorWrapper>
            </Paper>
        </Container>

    )
}

export default PlanDayPage
