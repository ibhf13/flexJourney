import ResponsivePopup from '@/components/common/Popups/ResponsivePopup'
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
    onPlanSelect: (plan: WorkoutPlan) => void
}

export const PlanSelectorDialog = ({
    open,
    onClose,
    plans,
    isLoading,
    onPlanSelect
}: PlanSelectorDialogProps) => {

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
            <PlanSelector
                plans={plans}
                isLoading={isLoading}
                onPlanSelect={(plan) => {
                    onPlanSelect(plan)
                    onClose()
                }}
            />
        </ResponsivePopup>
    )
}