import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LockIcon from '@mui/icons-material/Lock'
import { LoadingButton } from '@mui/lab'
import { Accordion, AccordionSummary, Stack, TextField, Typography, useTheme } from '@mui/material'
import { usePasswordManagement } from '../hooks/usePasswordManagement'

export const PasswordManagement = () => {
    const {
        hasPassword,
        handlePasswordSubmit,
        isLoading,
        register,
        errors,
    } = usePasswordManagement()
    const theme = useTheme()

    return (
        <Accordion sx={{
            p: 1,
            width: '100%',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
            },
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <LockIcon color="primary" />
                    <Typography variant="h6" gutterBottom>
                        {hasPassword ? 'Change Password' : 'Set Password'}
                    </Typography>
                </Stack>
            </AccordionSummary>
            <form onSubmit={handlePasswordSubmit}>
                <Stack spacing={2} p={2}>
                    {hasPassword && (
                        <TextField
                            label="Current Password"
                            type="password"
                            fullWidth
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword?.message}
                            {...register('currentPassword')}
                        />
                    )}
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                        {...register('newPassword')}
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        sx={{ mt: 2 }}
                    >
                        {hasPassword ? 'Update Password' : 'Set Password'}
                    </LoadingButton>
                </Stack>
            </form>
        </Accordion>

    )
} 