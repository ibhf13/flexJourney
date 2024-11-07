import Alert from '@/features/Feedback/components/Alert'
import { useNotificationContext } from '@/features/Feedback/contexts/NotificationContext'
import { Box } from '@mui/material'
import { useEffect } from 'react'

interface ErrorAlertProps {
    message: string
    showNotification?: boolean
    fullWidth?: boolean
}

const ErrorAlert = ({ 
    message, 
    showNotification = false,
    fullWidth = false 
}: ErrorAlertProps) => {
    const { showNotification: notify } = useNotificationContext()

    useEffect(() => {
        if (showNotification) {
            notify({
                message,
                severity: 'error',
                autoHideDuration: 6000
            })
        }
    }, [message, showNotification, notify])

    if (!showNotification) {
        return (
            <Box width={fullWidth ? '100%' : 'auto'}>
                <Alert
                    severity="error"
                    title="Error"
                    sx={{
                        width: '100%',
                        '& .MuiAlert-message': {
                            width: '100%'
                        }
                    }}
                >
                    {message}
                </Alert>
            </Box>
        )
    }

    return null
}

export default ErrorAlert