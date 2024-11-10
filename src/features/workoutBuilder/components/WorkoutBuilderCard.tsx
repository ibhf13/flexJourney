import { Add } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardContent, Dialog, DialogContent, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'
import { ExerciseSelectionStep } from './WorkoutBuilderWizard/ExerciseSelectionStep'
import { PlanBasicsStep } from './WorkoutBuilderWizard/PlanBasicsStep'
import { ReviewStep } from './WorkoutBuilderWizard/ReviewStep'
import { TrainingDaysStep } from './WorkoutBuilderWizard/TrainingDaysStep'

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: theme.spacing(2),
    border: `2px dashed ${theme.palette.primary.main}`,
    '&:hover': {
        borderStyle: 'solid',
        transform: 'translateY(-2px)',
        transition: 'transform 0.2s ease-in-out',
    },
}))

const steps = [
    'Plan Basics',
    'Training Days',
    'Select Exercises',
    'Review & Save'
]

interface WorkoutBuilderCardProps {
    onPlanCreated?: () => void
}

export const WorkoutBuilderCard = ({ onPlanCreated }: WorkoutBuilderCardProps) => {
    const [open, setOpen] = useState(false)
    const { currentStep, resetBuilder } = useWorkoutBuilderContext()

    const handleClose = () => {
        setOpen(false)
        resetBuilder()
    }

    const handleSuccess = () => {
        handleClose()
        onPlanCreated?.()
    }

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
            <StyledCard elevation={3}>
                <CardActionArea
                    onClick={() => setOpen(true)}
                    sx={{ height: '100%' }}
                >
                    <CardContent sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        <Add sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h6" component="h2" align="center">
                            Create Custom Plan
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center">
                            Build your own workout plan from scratch
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </StyledCard>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        minHeight: '60vh'
                    }
                }}
            >
                <DialogContent>
                    <Typography variant="h5" component="h2" gutterBottom align="center">
                        Create Custom Workout Plan
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Stepper
                            activeStep={steps.indexOf(currentStep)}
                            alternativeLabel
                            sx={{
                                '& .MuiStepConnector-line': {
                                    borderStyle: 'dashed'
                                }
                            }}
                        >
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        {renderStep()}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}