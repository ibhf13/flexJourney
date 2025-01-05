import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, LinearProgress, useTheme } from '@mui/material'
import { STEPS } from '../../constants'
import { DialogHeader } from '../../styles'
import { WorkoutBuilderStep } from '../../types'
import { WorkoutBuilderStepper } from './WorkoutBuilderStepper'

interface WorkoutBuilderWizardHeaderProps {
    currentStep: WorkoutBuilderStep
    onClose: () => void
}

export const WorkoutBuilderWizardHeader = ({
    currentStep,
    onClose
}: WorkoutBuilderWizardHeaderProps) => {
    const theme = useTheme()
    const currentStepIndex = STEPS.findIndex(step => step.key === currentStep.key)
    const currentProgress = STEPS[currentStepIndex]?.progress || 0

    return (
        <>
            <DialogHeader sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                p: theme.spacing(2, 3)
            }}>
                <WorkoutBuilderStepper
                    steps={STEPS}
                    currentStep={currentStep.key}
                />
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        mb: 4,
                        color: 'inherit',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.2)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogHeader>

            <Box sx={{ position: 'relative' }}>
                <LinearProgress
                    variant="determinate"
                    value={currentProgress}
                    sx={{
                        height: 6,
                        background: theme.palette.divider,
                        '& .MuiLinearProgress-bar': {
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: `linear-gradient(to right,
                            ${theme.palette.primary.main},
                            ${theme.palette.primary.light})`
                        }
                    }}
                />
            </Box>
        </>
    )
} 