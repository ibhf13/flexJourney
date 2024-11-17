import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const OverlayContainer = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
    backdropFilter: 'blur(4px)', // Increased blur effect
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit',
    transition: 'all 0.3s ease-in-out',
})

const CompletedStamp = styled(Typography)(({ theme }) => ({
    color: '#4CAF50', // Modern green color
    transform: 'rotate(-15deg)', // Reduced rotation for better readability
    border: '2px solid rgba(76, 175, 80, 0.5)', // Semi-transparent green border
    padding: theme.spacing(1, 3),
    borderRadius: theme.spacing(1.5),
    fontWeight: 800,
    letterSpacing: 3,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background for contrast
    backdropFilter: 'blur(8px)',
    boxShadow: `
        0 4px 20px rgba(76, 175, 80, 0.2),
        0 0 15px rgba(76, 175, 80, 0.3)
    `, // Glowing effect
    animation: 'fadeIn 0.5s ease-out',
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'rotate(-15deg) scale(0.8)',
        },
        to: {
            opacity: 1,
            transform: 'rotate(-15deg) scale(1)',
        },
    },
}))

export const CompletedExerciseOverlay = () => {
    return (
        <OverlayContainer>
            <CompletedStamp variant="h5">
                Done
            </CompletedStamp>
        </OverlayContainer>
    )
}