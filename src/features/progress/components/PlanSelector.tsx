import { PlanCard } from '@/features/workout/components/PlanCard'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { WorkoutBuilderCard } from '@/features/workoutBuilder/components/WorkoutBuilderCard'
import { Grid } from '@mui/material'

interface PlanSelectorProps {
    plans: WorkoutPlan[]
    isLoading: boolean
    onPlanSelect: (plan: WorkoutPlan) => void
    onPlanCreated?: () => void
}

export const PlanSelector = ({
    plans,
    isLoading,
    onPlanSelect,
    onPlanCreated
}: PlanSelectorProps) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <WorkoutBuilderCard onPlanCreated={onPlanCreated} />
            </Grid>
            {plans.map((plan) => (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                    <PlanCard
                        plan={plan}
                        onClick={onPlanSelect}
                        isLoading={isLoading}
                    />
                </Grid>
            ))}
        </Grid>
    )
}