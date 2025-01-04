import { migrateAllProfiles } from '@/features/profile/utils/profileMigration'
import { seedWorkoutPlans } from '@/utils/workoutPlanSeeder'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

type AdminAction = 'seed' | 'migrate'

interface ActionState {
    isLoading: boolean
    action: AdminAction | null
}

export const SeedDataButton = () => {
    const [actionState, setActionState] = useState<ActionState>({
        isLoading: false,
        action: null
    })
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useAuthContext()

    const handleAction = async (action: AdminAction) => {
        if (!user) {
            enqueueSnackbar('You must be logged in to perform admin actions', { variant: 'warning' })

            return
        }

        setActionState({ isLoading: true, action })
        try {
            if (action === 'seed') {
                const result = await seedWorkoutPlans()

                enqueueSnackbar(result.message, {
                    variant: result.success ? 'success' : 'error',
                    autoHideDuration: 3000,
                })
            } else if (action === 'migrate') {
                await migrateAllProfiles()
                enqueueSnackbar('Profile migration completed successfully', {
                    variant: 'success',
                    autoHideDuration: 3000,
                })
            }
        } catch (error) {
            console.error(`${action} error:`, error)
            enqueueSnackbar(`Failed to ${action} data. Check console for details.`, {
                variant: 'error',
                autoHideDuration: 5000,
            })
        } finally {
            setActionState({ isLoading: false, action: null })
        }
    }

    if (!user) return null

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Admin Actions
            </Typography>
            <Stack direction="row" spacing={2}>
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    loading={actionState.isLoading && actionState.action === 'seed'}
                    onClick={() => handleAction('seed')}
                    disabled={actionState.isLoading}
                    sx={{
                        '&.MuiLoadingButton-loading': {
                            backgroundColor: 'action.disabledBackground',
                        }
                    }}
                >
                    Seed Workout Data
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    color="warning"
                    loading={actionState.isLoading && actionState.action === 'migrate'}
                    onClick={() => handleAction('migrate')}
                    disabled={actionState.isLoading}
                    sx={{
                        '&.MuiLoadingButton-loading': {
                            backgroundColor: 'action.disabledBackground',
                        }
                    }}
                >
                    Migrate Profiles
                </LoadingButton>
            </Stack>
        </Box>
    )
}