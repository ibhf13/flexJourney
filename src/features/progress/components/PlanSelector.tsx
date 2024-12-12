import { PlanCard } from '@/features/workout/components/PlanCard'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { Grid } from '@mui/material'

interface PlanSelectorProps {
    plans: WorkoutPlan[]
    isLoading: boolean
    onPlanSelect: (plan: WorkoutPlan) => void
}

export const PlanSelector = ({
    plans,
    isLoading,
    onPlanSelect
}: PlanSelectorProps) => {
    return (
        <Grid container spacing={3}>
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