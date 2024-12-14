import { toast, ToastOptions } from 'react-hot-toast'
import { ErrorOptions, ErrorSeverity } from '../types/errorTypes'

const DEFAULT_DURATION = 3000

type ToastStyleMap = {
    readonly [key in ErrorSeverity]: string
}

const SEVERITY_COLORS: ToastStyleMap = {
    [ErrorSeverity.ERROR]: '#d32f2f',
    [ErrorSeverity.SUCCESS]: '#2e7d32',
    [ErrorSeverity.WARNING]: '#ed6c02',
    [ErrorSeverity.INFO]: '#0288d1'
}

export const toastConfig: Readonly<ToastOptions> = {
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
    severity: ErrorSeverity = ErrorSeverity.INFO,
    options?: ErrorOptions
): string => {
    const toastOptions: ToastOptions = {
        ...toastConfig,
        ...options,
        className: `toast-${severity}`,
        style: {
            ...toastConfig.style,
            background: SEVERITY_COLORS[severity],
        }
    }

    return toast(message, toastOptions)
}