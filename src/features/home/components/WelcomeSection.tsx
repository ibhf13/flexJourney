import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export const WelcomeSection = () => {

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
                p: 4,
                textAlign: 'center',
                mb: { xs: 4, md: 6 }
            }}
        >
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    color: 'primary.main',
                    mb: 2
                }}
            >
                Welcome to FlexJourney
            </Typography>
            <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                    maxWidth: '800px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
            >
                Your personal fitness Mentor starts.
            </Typography>
            <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                    maxWidth: '800px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
            >
                Track workouts, monitor progress, and achieve your goals.
            </Typography>
        </Box>
    )
}