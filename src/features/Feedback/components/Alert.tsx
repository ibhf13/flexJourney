import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import { AlertProps } from '../types';

const Alert = ({
  severity = 'info',
  title,
  children,
  ...props
}: AlertProps & { title?: string }) => {
  return (
    <MuiAlert
      severity={severity}
      elevation={6}
      variant="filled"
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};

export default Alert;