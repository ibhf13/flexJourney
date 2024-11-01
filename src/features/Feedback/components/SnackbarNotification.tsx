import { Snackbar, Alert } from '@mui/material'
import { NotificationProps } from '../types'

const SnackbarNotification = ({
  message,
  severity = 'info',
  autoHideDuration = 6000,
  action,
  open,
  onClose,
}: NotificationProps & { onClose: () => void }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    onClose()
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={action}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarNotification
