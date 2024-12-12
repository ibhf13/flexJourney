import { Theme } from '@mui/material'

export const planBasicsStyles = (theme: Theme) => ({
    container: {
        maxWidth: { xs: '100%', sm: 800 },
        minWidth: { xs: '100%', sm: 800 },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `linear-gradient(135deg, 
            ${theme.palette.primary.light}20,
            ${theme.palette.primary.main}40)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 3,
    },
    gradientText: {
        background: `linear-gradient(135deg,
            ${theme.palette.primary.main},
            ${theme.palette.primary.dark})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    formContainer: {
        p: { xs: 3, sm: 4 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        background: `linear-gradient(135deg,
            ${theme.palette.background.paper},
            ${theme.palette.background.default})`
    },
    inputField: {
        borderRadius: 2,
        '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
        }
    },
    submitButton: {
        minWidth: 180,
        height: 48,
        borderRadius: 3,
        background: `linear-gradient(135deg,
            ${theme.palette.primary.main},
            ${theme.palette.primary.dark})`,
        textTransform: 'none',
        fontSize: '1rem',
        '&:hover': {
            background: `linear-gradient(135deg,
                ${theme.palette.primary.dark},
                ${theme.palette.primary.main})`
        }
    }
})