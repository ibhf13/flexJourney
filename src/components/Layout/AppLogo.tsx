import logoImage from '@/assets/images/logo2.png'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface AppLogoProps {
    redirect?: string
}

const AppLogo = ({ redirect = '/' }: AppLogoProps) => {
    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate(redirect)
    }

    return (
        <Box
            onClick={handleLogoClick}
            sx={{
                cursor: 'pointer',
                width: { xs: 80, md: 100 },
                height: { xs: 50, md: 60 },
            }}
        >
            <img
                src={logoImage}
                alt="Fitness App Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
        </Box>

    )
}

export default AppLogo