import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const historyThemeExtension = {
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: (theme: Theme) => `linear-gradient(135deg, 
                        ${alpha(theme.palette.primary.main, 0.05)}, 
                        ${alpha(theme.palette.secondary.main, 0.05)}
                    )`,
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: (theme: Theme) => `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                },
                outlined: {
                    borderColor: 'primary.main',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(8px)',
                    '&.Mui-expanded': {
                        margin: 0,
                    },
                },
            },
        },
    },
}