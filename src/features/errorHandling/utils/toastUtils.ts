import { toast, ToastOptions } from 'react-hot-toast'
import { ErrorOptions, ErrorSeverity } from '../types/errorTypes'

const DEFAULT_DURATION = 3000

export const toastConfig: ToastOptions = {
    duration: DEFAULT_DURATION,
    position: 'bottom-center',
    style: {
        padding: '16px',
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
    },
}

export const showToast = (
    message: string,
    severity: ErrorSeverity = 'info',
    options?: ErrorOptions
) => {
    const toastOptions: ToastOptions = {
        ...toastConfig,
        ...options,
        className: `toast-${severity}`,
        style: {
            ...toastConfig.style,
            background: severity === 'error' ? '#d32f2f' :
                severity === 'success' ? '#2e7d32' :
                    severity === 'warning' ? '#ed6c02' :
                        '#0288d1',
        }
    }

    return toast(message, toastOptions)
}