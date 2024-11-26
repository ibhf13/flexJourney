import { Theme } from '@mui/material'

export const exerciseSelectionStyles = (theme: Theme) => ({
    container: {
        maxWidth: { xs: '100%', sm: 800 },
        minWidth: { xs: '100%', sm: 800 },
        mx: 'auto'
    },
    tabsContainer: {
        mb: 3,
        borderRadius: 2,
        background: `linear-gradient(135deg,
            ${theme.palette.background.paper},
            ${theme.palette.background.default})`
    },
    tabs: {
        px: 2,
        '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0',
            background: theme.palette.primary.main
        }
    },
    searchField: {
        mb: 3,
        '& .MuiInputBase-root': {
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            '&.Mui-focused': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`
            }
        }
    },
    exercisesContainer: {
        display: 'flex',
        gap: 3,
        flexDirection: { xs: 'column', md: 'row' }
    },
    exerciseList: {
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        flex: 1,
        background: `linear-gradient(135deg,
            ${theme.palette.background.paper},
            ${theme.palette.background.default})`
    },
    scrollableContent: {
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        maxHeight: '60vh',
        overflowY: 'auto',
        pr: 2,
        mr: -2,
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '3px'
        }
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 4,
        gap: 2
    },
    exerciseCountChip: {
        background: `linear-gradient(135deg,
            ${theme.palette.primary.main},
            ${theme.palette.primary.dark})`
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: theme.palette.primary.main
    },
    backButton: {
        borderRadius: 2,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.primary.dark,
            backgroundColor: `${theme.palette.primary.main}10`
        }
    },
    submitButton: {
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