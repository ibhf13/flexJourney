import { StepConnector, stepConnectorClasses, styled } from '@mui/material'


export const CustomConnector = styled(StepConnector)(({ theme }) => ({
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

export const StepIconRoot = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
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