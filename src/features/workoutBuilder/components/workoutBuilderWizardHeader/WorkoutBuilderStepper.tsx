import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { CustomConnector } from '../../styles'
import { WorkoutBuilderStep, WorkoutBuilderStepKey } from '../../types'
import StepIcon from './StepIcon'

interface StepperProps {
    steps: WorkoutBuilderStep[]
    currentStep: WorkoutBuilderStepKey
}

export const WorkoutBuilderStepper = ({ steps, currentStep }: StepperProps) => {
    const activeStep = steps.findIndex(step => step.key === currentStep)

    return (
        <Box sx={{
            width: '100%',
            borderRadius: 0,
            '& .MuiStepLabel-label': {
                opacity: theme => theme.palette.mode === 'dark' ? 0.7 : 0.9,
            }
        }}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<CustomConnector />}
            >
                {steps.map((step, index) => (
                    <Step key={step.key}>
                        <StepLabel
                            StepIconComponent={StepIcon}
                            sx={{
                                '& .MuiStepLabel-label': {
                                    mt: 1,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    transition: 'all 0.3s ease',
                                    color: index === activeStep ?
                                        'primary.main' :
                                        'text.secondary',
                                    fontWeight: index === activeStep ? 600 : 400,
                                    ...(index === activeStep && {
                                        transform: 'scale(1.05)',
                                    }),
                                },
                            }}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}