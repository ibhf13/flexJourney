import { ConfirmationDialog } from '@/components/common/dialogs/ConfirmationDialog'
import { Add } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Card, CardActionArea, CardContent, Dialog, DialogContent, Fade, IconButton, LinearProgress, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'
import { ExerciseSelectionStep } from './WorkoutBuilderWizard/ExerciseSelectionStep'
import { PlanBasicsStep } from './WorkoutBuilderWizard/PlanBasicsStep'
import { ReviewStep } from './WorkoutBuilderWizard/ReviewStep'
import { TrainingDaysStep } from './WorkoutBuilderWizard/TrainingDaysStep'
import { WorkoutBuilderStepper } from './WorkoutBuilderWizard/WorkoutBuilderStepper'

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: theme.spacing(2),
    border: `2px dashed ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        borderStyle: 'solid',
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
    },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(4),
    minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
    scrollbarWidth: 'none',  // Firefox
    msOverflowStyle: 'none', // IE and Edge
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}))

const DialogHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const STEPS = [
    { key: 'basics', label: 'Plan Basics', progress: 25 },
    { key: 'days', label: 'Training Days', progress: 50 },
    { key: 'exercises', label: 'Select Exercises', progress: 75 },
    { key: 'review', label: 'Review & Save', progress: 100 }
] as const

interface WorkoutBuilderCardProps {
    onPlanCreated?: () => void
}

export const WorkoutBuilderCard = ({ onPlanCreated }: WorkoutBuilderCardProps) => {
    const [open, setOpen] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const { currentStep, resetBuilder } = useWorkoutBuilderContext()

    const handleClose = () => {
        if (currentStep !== 'review') {
            setShowConfirmDialog(true)
        } else {
            setOpen(false)
        }
    }

    const handleConfirmClose = () => {
        setOpen(false)
        setShowConfirmDialog(false)
        resetBuilder()
    }

    const handleCancelClose = () => {
        setShowConfirmDialog(false)
    }

    const handleSuccess = () => {
        setOpen(false)
        onPlanCreated?.()
    }

    const currentStepIndex = STEPS.findIndex(step => step.key === currentStep)
    const currentProgress = STEPS[currentStepIndex]?.progress || 0

    const renderStep = () => {
        switch (currentStep) {
            case 'basics':
                return <PlanBasicsStep />
            case 'days':
                return <TrainingDaysStep />
            case 'exercises':
                return <ExerciseSelectionStep />
            case 'review':
                return <ReviewStep onSuccess={handleSuccess} />
            default:
                return null
        }
    }

    return (
        <>
            <StyledCard elevation={0}>
                <CardActionArea
                    onClick={() => setOpen(true)}
                    sx={{ height: '100%', p: 1 }}
                >
                    <CardContent sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        p: 4
                    }}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                bgcolor: 'primary.lighter',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 1
                            }}
                        >
                            <Add sx={{ fontSize: 32, color: 'primary.main' }} />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                                sx={{ fontWeight: 600 }}
                            >
                                Create Custom Plan
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Build your own workout plan from scratch
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </StyledCard>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogHeader>
                    <Box>
                        <Typography variant="h6" component="h2">
                            Create Custom Workout Plan
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                            {STEPS[currentStepIndex]?.label}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            color: 'inherit',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogHeader>

                <Box sx={{ position: 'relative' }}>
                    <LinearProgress
                        variant="determinate"
                        value={currentProgress}
                        sx={{
                            height: 4,
                            '& .MuiLinearProgress-bar': {
                                transition: 'transform 0.5s ease-in-out',
                                backgroundColor: '#77d332'
                            },
                            backgroundColor: 'success.lighter'
                        }}
                    />
                </Box>

                <StyledDialogContent>
                    <WorkoutBuilderStepper
                        steps={STEPS}
                        currentStep={currentStep}
                    />

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {renderStep()}
                    </Box>
                </StyledDialogContent>
            </Dialog>

            <ConfirmationDialog
                open={showConfirmDialog}
                title="Cancel Workout Creation?"
                message="Are you sure you want to cancel? All progress will be lost."
                onConfirm={handleConfirmClose}
                onCancel={handleCancelClose}
            />
        </>
    )
}