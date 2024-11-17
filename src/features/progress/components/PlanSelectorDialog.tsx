import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import CloseIcon from '@mui/icons-material/Close'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import {
    Box,
    Dialog,
    IconButton,
    Typography
} from '@mui/material'
import { dialogStyles } from '../styles/planSelectorStyles'
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    ...dialogStyles,
                    minHeight: '60vh'
                }
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    p: 3,
                    background: 'rgba(0,0,0,0.2)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <FitnessCenterIcon
                        sx={{
                            fontSize: 28,
                            color: '#4caf50'
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #fff, #e0e0e0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        Choose Your Plan
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'rgba(255,255,255,0.7)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: '#fff'
                        },
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    p: 3,
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(255,255,255,0.05)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        '&:hover': {
                            background: 'rgba(255,255,255,0.3)'
                        }
                    }
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
            </Box>
        </Dialog>
    )
}