import { createContext, useContext, useState, useCallback } from 'react';
import { NotificationContextType, NotificationProps } from '../types';
import SnackbarNotification from '../components/SnackbarNotification';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const showNotification = useCallback((props: NotificationProps) => {
    setNotification(props);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notification && (
        <SnackbarNotification
          {...notification}
          onClose={hideNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};