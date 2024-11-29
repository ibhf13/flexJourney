import { Check, RadioButtonUnchecked } from '@mui/icons-material'
import { Box, Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled, useTheme } from '@mui/material'
import { WorkoutBuilderStep } from '../../types/workoutBuilderTypes'

interface StepperProps {
    steps: ReadonlyArray<{
        key: WorkoutBuilderStep
        label: string
        progress: number
    }>
    currentStep: WorkoutBuilderStep
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel} `]: {
        top: 12,
        left: 'calc(-50% + 20px)',
        right: 'calc(50% + 20px)',
    },
    [`&.${stepConnectorClasses.active} `]: {
        [`& .${stepConnectorClasses.line} `]: {
            background: `linear - gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        },
    },
    [`&.${stepConnectorClasses.completed} `]: {
        [`& .${stepConnectorClasses.line} `]: {
            background: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line} `]: {
        height: 3,
        border: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        transition: 'all 0.3s ease',
    },
}))

const StepIconRoot = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
    ({ ownerState }) => ({
        backgroundColor: 'transparent',
        zIndex: 1,
        width: 28,
        height: 28,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `2px solid ${ownerState.completed || ownerState.active ?
            'white' :
            'rgba(255, 255, 255, 0.3)'
            }`,
        color: ownerState.completed || ownerState.active ?
            'white' :
            'rgba(255, 255, 255, 0.5)',
        boxShadow: ownerState.active ?
            `0 0 0 3px ${'white'} 20` :
            'none',
        '&:hover': {
            transform: ownerState.active ? 'scale(1.1)' : 'none',
        },
    }),
)

function StepIcon(props: {
    active?: boolean
    completed?: boolean
    icon: React.ReactNode
}) {
    const theme = useTheme()

    return (
        <StepIconRoot ownerState={{ active: props.active, completed: props.completed }}>
            {props.completed ? (
                <Check
                    sx={{
                        fontSize: 18,
                        color: 'white',
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))'
                    }}
                />
            ) : (
                props.active ? (
                    <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        boxShadow: `0 0 0 4px ${'white'} 20`
                    }} />
                ) : (
                    <RadioButtonUnchecked sx={{ fontSize: 12 }} />
                )
            )}
        </StepIconRoot>
    )
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