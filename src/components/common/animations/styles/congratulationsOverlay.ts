import { Theme, alpha } from '@mui/material'

export const overlayStyles = {
    wrapper: {
        position: 'relative',
        zIndex: (theme: Theme) => theme.zIndex.modal
    },
    backdrop: {
        position: 'fixed',
        inset: 0,
        backgroundColor: (theme: Theme) => alpha(theme.palette.background.default, 0.85),
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },
    content: (theme: Theme) => ({
        position: 'relative',
        background: `linear-gradient(145deg, 
            ${alpha(theme.palette.background.paper, 0.9)},
            ${alpha(theme.palette.background.paper, 0.7)})`,
        borderRadius: 16,
        padding: '40px 32px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        textAlign: 'center'
    }),
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        color: (theme: Theme) => theme.palette.text.secondary,
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'rotate(90deg)',
            color: (theme: Theme) => theme.palette.error.main,
            backgroundColor: (theme: Theme) => alpha(theme.palette.error.main, 0.1)
        }
    },
    title: {
        mb: 3,
        mt: 1,
        fontSize: {
            xs: '1.75rem',
            sm: '2.25rem',
            md: '2.75rem'
        },
        fontWeight: 800,
        letterSpacing: '-0.5px'
    },
    message: (theme: Theme) => ({
        color: alpha(theme.palette.text.primary, 0.9),
        fontSize: {
            xs: '1.1rem',
            sm: '1.35rem',
            md: '1.6rem'
        },
        lineHeight: 1.4,
        fontWeight: 500
    })
} 