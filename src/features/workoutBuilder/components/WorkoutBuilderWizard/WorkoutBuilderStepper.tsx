import { Check } from '@mui/icons-material'
import { Box, Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled } from '@mui/material'
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
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.divider,
        borderTopWidth: 3,
        borderRadius: 1,
    },
}))

const StepIconRoot = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
    ({ theme, ownerState }) => ({
        backgroundColor: theme.palette.divider,
        zIndex: 1,
        color: theme.palette.common.white,
        width: 24,
        height: 24,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundColor: theme.palette.primary.main,
        }),
    }),
)

function StepIcon(props: {
    active?: boolean
    completed?: boolean
    icon: React.ReactNode
}) {
    return (
        <StepIconRoot ownerState={{ active: !!props.active, completed: !!props.completed }}>
            {props.completed ? <Check sx={{ fontSize: 18 }} /> : props.icon}
        </StepIconRoot>
    )
}

export const WorkoutBuilderStepper = ({ steps, currentStep }: StepperProps) => {
    const activeStep = steps.findIndex(step => step.key === currentStep)

    return (
        <Box sx={{ width: '100%' }}>
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
                                    typography: 'body2',
                                    ...(index === activeStep && {
                                        color: 'primary.main',
                                        fontWeight: 'bold',
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