import { AlertProps as MuiAlertProps } from '@mui/material';

export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

export interface NotificationProps {
  message: string;
  severity?: NotificationSeverity;
  autoHideDuration?: number;
  action?: React.ReactNode;
  open?: boolean;
}

export interface NotificationContextType {
  showNotification: (props: NotificationProps) => void;
  hideNotification: () => void;
}

export interface AlertProps extends Omit<MuiAlertProps, 'severity'> {
  severity?: NotificationSeverity;
}