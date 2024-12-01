import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { PlanCard } from '@/features/workout/components/PlanCard'
import { useRefreshWorkoutPlans, useWorkoutPlans } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { WorkoutBuilderCard } from '@/features/workoutBuilder/components/WorkoutBuilderCard'
import { Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PlanPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: plans, isLoading, error } = useWorkoutPlans()
  const refreshPlans = useRefreshWorkoutPlans()

  const filteredPlans = plans?.filter(plan =>
    plan.type === 'default' || (plan.type === 'custom' && plan.userId === user?.uid)
  )

  const handlePlanSelect = (plan: WorkoutPlan) => {
    navigate(`/plan/${plan.id}`)
  }

  return (
    <LoadingErrorWrapper isLoading={isLoading} error={error ?? null}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Choose Your Workout Plan
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Select a workout plan that matches your fitness level and goals
        </Typography>

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
      </Container>
    </LoadingErrorWrapper>
  )
}

export default PlanPage
