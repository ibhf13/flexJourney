import { ROUTES } from '@/config/router/routeConstants'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate(ROUTES.MAIN.HOME)
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 3
                }}
            >
                <ErrorOutlineIcon
                    sx={{
                        fontSize: 80,
                        color: 'error.main'
                    }}
                />
                <Typography variant="h1" component="h1" sx={{ fontSize: '6rem' }}>
                    404
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Oops! Page not found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<HomeIcon />}
                    onClick={handleGoHome}
                    size="large"
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    )
}

export default NotFoundPage 