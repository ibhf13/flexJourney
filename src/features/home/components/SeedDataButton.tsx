import { useAuthContext } from '@/contexts/AuthContext'
import { seedWorkoutPlans } from '@/utils/firebaseUtils'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

export const SeedDataButton = () => {
    const [isSeeding, setIsSeeding] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useAuthContext() // Get the current user


    const handleSeedData = async () => {
        if (!user) {
            enqueueSnackbar('You must be logged in to seed data', { variant: 'warning' })

            return
        }

        setIsSeeding(true)
        try {
            const result = await seedWorkoutPlans()

            enqueueSnackbar(result.message, {
                variant: result.success ? 'success' : 'error',
                autoHideDuration: 3000,
            })
        } catch (error) {
            console.error('Seeding error:', error)
            enqueueSnackbar('Failed to seed data. Check console for details.', {
                variant: 'error',
                autoHideDuration: 5000,
            })
        } finally {
            setIsSeeding(false)
        }
    }

    // Only show the button to logged-in users
    if (!user) return null

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Admin: Seed workout data to Firestore
            </Typography>
            <LoadingButton
                variant="contained"
                color="secondary"
                loading={isSeeding}
                onClick={handleSeedData}
                sx={{
                    alignSelf: 'flex-start',
                    '&.MuiLoadingButton-loading': {
                        backgroundColor: 'action.disabledBackground',
                    }
                }}
            >
                Seed Workout Data
            </LoadingButton>
        </Box>
    )
}