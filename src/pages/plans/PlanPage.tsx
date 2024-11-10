import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext'
import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutPlans'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { WorkoutBuilderCard } from '@/features/workoutBuilder/components/WorkoutBuilderCard'
import { LoadingErrorWrapper } from '@features/workout/components/common/LoadingErrorWrapper'
import { PlanCard } from '@features/workout/components/PlanCard'
import { Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const PlanPage = () => {
  const navigate = useNavigate()
  const { plans, isLoading, error, refreshPlans } = useWorkoutPlans()
  const { selectPlan } = useWorkoutContext()

  const handlePlanSelect = (plan: WorkoutPlan) => {
    selectPlan(plan)
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
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <PlanCard plan={plan} onClick={handlePlanSelect} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <WorkoutBuilderCard onPlanCreated={refreshPlans} />
          </Grid>
        </Grid>
      </Container>
    </LoadingErrorWrapper>
  )
}
