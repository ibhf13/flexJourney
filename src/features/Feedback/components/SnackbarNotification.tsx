import { Snackbar, Alert } from '@mui/material';
import { NotificationProps } from '../types';

const SnackbarNotification = ({
  message,
  severity = 'info',
  autoHideDuration = 6000,
  action,
  onClose,
}: NotificationProps & { onClose: () => void }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={action}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;