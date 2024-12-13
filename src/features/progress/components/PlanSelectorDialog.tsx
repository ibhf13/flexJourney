import { CardSkeleton } from '@/components/common/Cards'
import ResponsivePopup from '@/components/common/Popups/ResponsivePopup'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { useRefreshWorkoutPlans } from '@/features/workout/hooks/useWorkoutQuerys'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import {
    Box,
    Typography
} from '@mui/material'
import { PlanSelector } from './PlanSelector'

interface PlanSelectorDialogProps {
    open: boolean
    onClose: () => void
    plans: WorkoutPlan[]
    isLoading: boolean
    error: Error | null
    onPlanSelect: (plan: WorkoutPlan) => void
}

export const PlanSelectorDialog = ({
    open,
    onClose,
    plans,
    isLoading,
    error,
    onPlanSelect
}: PlanSelectorDialogProps) => {
    const refreshPlans = useRefreshWorkoutPlans()

    const headerContent = (
        <Box display="flex" alignItems="center" gap={2}>
            <FitnessCenterIcon sx={{ fontSize: 28, color: '#fff' }} />
            <Typography variant="h6">
                Choose Your Plan
            </Typography>
        </Box>
    )

    return (
        <ResponsivePopup
            open={open}
            onClose={onClose}
            maxWidth="lg"
            headerContent={headerContent}
            headerStyle={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                p: 3,
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
            contentStyle={{
                minHeight: '60vh'
            }}
        >
            <LoadingErrorWrapper isLoading={isLoading} error={error} loadingComponent={<CardSkeleton />}>
                <Box p={2}>
                    <PlanSelector
                        plans={plans}
                        isLoading={isLoading}
                        onPlanSelect={(plan) => {
                            onPlanSelect(plan)
                            onClose()
                        }}
                        onPlanCreated={refreshPlans}
                    />
                </Box>
            </LoadingErrorWrapper>
        </ResponsivePopup>
    )
}