import { SxProps, Theme } from '@mui/material'

interface TrainingDaysStyles {
    container: SxProps<Theme>
    paper: SxProps<Theme>
    select: SxProps<Theme>
    scrollableStack: SxProps<Theme>
    dayCard: SxProps<Theme>
    errorPaper: SxProps<Theme>
    errorText: SxProps<Theme>
    buttonContainer: SxProps<Theme>
    backButton: SxProps<Theme>
    continueButton: SxProps<Theme>
}

export const trainingDaysStyles = (theme: Theme): TrainingDaysStyles => ({
    container: {
        maxWidth: { xs: '100%', sm: 600 },
        minWidth: { xs: '100%', sm: 600 },
        mx: 'auto'
    },
    paper: {
        p: { xs: 3, sm: 4 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        background: `linear-gradient(135deg,
      ${theme.palette.background.paper},
      ${theme.palette.background.default})`
    },
    select: {
        borderRadius: 2,
        '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`
        }
    },
    scrollableStack: {
        maxHeight: '50vh',
        overflowY: 'auto',
        pr: 2,
        mr: -2,
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '3px'
        }
    },
    dayCard: {
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        background: theme.palette.background.paper,
        transition: 'all 0.3s ease'
    },
    errorPaper: {
        p: 2,
        mt: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'error.light',
        background: 'error.lighter'
    },
    errorText: {
        display: 'flex',
        alignItems: 'center',
        gap: 1
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 4,
        gap: 2
    },
    backButton: {
        borderRadius: 2,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.primary.dark,
            backgroundColor: `${theme.palette.primary.main}10`
        }
    },
    continueButton: {
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
