import { useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationSeverity } from '../types';

export const useNotificationHandler = () => {
  const { showNotification } = useNotification();

  const showMessage = useCallback((
    message: string,
    severity: NotificationSeverity = 'info',
    duration?: number
  ) => {
    showNotification({
      message,
      severity,
      autoHideDuration: duration,
    });
  }, [showNotification]);

  return {
    success: (message: string, duration?: number) =>
      showMessage(message, 'success', duration),
    error: (message: string, duration?: number) =>
      showMessage(message, 'error', duration),
    warning: (message: string, duration?: number) =>
      showMessage(message, 'warning', duration),
    info: (message: string, duration?: number) =>
      showMessage(message, 'info', duration),
  };
};