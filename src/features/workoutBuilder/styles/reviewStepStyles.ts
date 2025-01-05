import { Theme } from '@mui/material'

export const reviewStepStyles = (theme: Theme) => ({
    container: {
        mx: 'auto',
        maxWidth: { xs: '100%', sm: 600 },
        minWidth: { xs: '100%', sm: 600 },
    },
    headerIcon: {
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
        mb: 3
    },
    previewIcon: {
        fontSize: 40,
        color: theme.palette.primary.main,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
    },
    gradientTitle: {
        background: `linear-gradient(135deg,
      ${theme.palette.primary.main},
      ${theme.palette.primary.dark})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    paper: {
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        background: `linear-gradient(135deg,
      ${theme.palette.background.paper},
      ${theme.palette.background.default})`
    },
    inputField: {
        borderRadius: 2,
        '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`
        }
    },
    gradientButton: {
        borderRadius: 2,
        background: `linear-gradient(135deg,
      ${theme.palette.primary.main},
      ${theme.palette.primary.dark})`,
        '&:hover': {
            background: `linear-gradient(135deg,
        ${theme.palette.primary.dark},
        ${theme.palette.primary.main})`
        }
    }
})