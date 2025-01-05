import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { PlanCard } from '@/features/workout/components/PlanCard'
import { useRefreshWorkoutPlans, useWorkoutPlans } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import WorkoutBuilderCard from '@/features/workoutBuilder/components/WorkoutBuilderWizard'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PlanPageSkeleton } from '../components/skeletons/PlanCardSkeleton'

const PlanPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: plans, isLoading, error } = useWorkoutPlans(user?.uid ?? "")
  const refreshPlans = useRefreshWorkoutPlans()

  const filteredPlans = plans?.filter(plan =>
    plan.type === 'default' || (plan.type === 'custom' && plan.userId === user?.uid)
  )

  const handlePlanSelect = (plan: WorkoutPlan) => {
    navigate(`/plan/${plan.id}`)
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
        <LoadingErrorWrapper isLoading={isLoading} error={error ?? null} loadingComponent={<PlanPageSkeleton />}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: { sm: 1, md: 4 } }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Choose Your Workout Plan
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Select a workout plan that matches your fitness level and goals
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <WorkoutBuilderCard onPlanCreated={refreshPlans} />
              </Grid>
              {filteredPlans?.map((plan) => (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <PlanCard
                    plan={plan}
                    onClick={handlePlanSelect}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </LoadingErrorWrapper>
      </Paper>
    </Container>
  )
}

export default PlanPage
