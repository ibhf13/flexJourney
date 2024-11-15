import ConstructionIcon from '@mui/icons-material/Construction'
import TimerIcon from '@mui/icons-material/Timer'
import { Box, Button, Container, Paper, Typography, useTheme } from '@mui/material'
import { keyframes, styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

// Keyframes for animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    textAlign: 'center',
    borderRadius: 24,
    maxWidth: '600px',
    width: '100%',
    background: `linear-gradient(135deg, 
        ${theme.palette.background.paper} 0%,
        ${theme.palette.primary.light}15 100%)`,
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}))

const AnimatedIcon = styled(ConstructionIcon)(({ theme }) => ({
    fontSize: '4rem',
    color: theme.palette.primary.main,
    animation: `${bounce} 2s infinite ease-in-out`,
    marginBottom: theme.spacing(2),
}))

const TimerWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(4),
    animation: `${pulse} 2s infinite ease-in-out`,
}))

const ComingSoonPage = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(45deg, 
                    ${theme.palette.primary.main}15 0%,
                    ${theme.palette.secondary.main}15 100%)`,
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    px: { xs: 2, sm: 4, md: 6 },
                }}
            >
                <StyledPaper elevation={0}>
                    <AnimatedIcon />
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '2rem', sm: '3rem' },
                            background: `linear-gradient(45deg, 
                                ${theme.palette.primary.main} 30%, 
                                ${theme.palette.secondary.main} 90%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Coming Soon!
                    </Typography>
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{
                            maxWidth: '90%',
                            margin: '0 auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                    >
                        We're crafting something extraordinary for your fitness journey.
                        Stay tuned for an amazing experience!
                    </Typography>

                    <TimerWrapper>
                        <TimerIcon color="primary" />
                        <Typography
                            variant="body1"
                            color="primary"
                            sx={{
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                        >
                            Launch coming in a few days
                        </Typography>
                    </TimerWrapper>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{
                            mt: 4,
                            px: { xs: 3, sm: 4 },
                            py: 1.5,
                            borderRadius: '50px',
                            background: `linear-gradient(45deg, 
                                ${theme.palette.primary.main} 30%, 
                                ${theme.palette.secondary.main} 90%)`,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Return to Homepage
                    </Button>
                </StyledPaper>
            </Container>
        </Box>
    )
}

export default ComingSoonPage