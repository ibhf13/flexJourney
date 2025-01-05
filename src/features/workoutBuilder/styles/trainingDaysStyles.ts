import { SxProps, Theme } from '@mui/material'

interface TrainingDaysStyles {
    container: SxProps<Theme>
    paper: SxProps<Theme>
    select: SxProps<Theme>
    scrollableStack: SxProps<Theme>
    dayInput: SxProps<Theme>
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
    dayInput: {
        '& .MuiInputBase-root': {
            borderRadius: 2,
            transition: 'all 0.3s ease',
            backgroundColor: theme.palette.mode === 'dark'
                ? `${theme.palette.background.paper}80`
                : theme.palette.background.paper,
            backdropFilter: 'blur(8px)',
            '&:hover': {
                backgroundColor: `${theme.palette.primary.main}08`,
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
                borderColor: theme.palette.primary.main,
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '1px',
                }
            }
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
            transition: 'all 0.3s ease',
            '&:first-of-type': {
                pt: 1,
                '&.Mui-focused': {
                    pt: 1,
                },
            },
            '&.Mui-focused': {
                color: theme.palette.primary.main,
                transform: 'translate(14px, -9px) scale(0.75)'
            }
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            transition: 'all 0.3s ease',
            borderRadius: 2,
            legend: {
                marginLeft: '4px'
            }
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: '1px'
        },
        '& .Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
            borderWidth: '1px'
        },
        '& .MuiFormHelperText-root': {
            marginLeft: 0,
            transition: 'opacity 0.3s ease',
            fontSize: '0.75rem',
            '&.Mui-error': {
                color: theme.palette.error.main,
                opacity: 0.9
            }
        }
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
