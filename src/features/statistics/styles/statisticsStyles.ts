import { Theme } from '@mui/material'

export const accordionStyles = (theme: Theme) => ({
    root: {
        borderRadius: '8px 8px 0 0',
        backgroundColor: theme.palette.background.paper,
        '&:before': { display: 'none' },
        boxShadow: theme.shadows[1],
        border: `1px solid ${theme.palette.divider}`,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[3]
        }
    },
    summary: {
        borderBottom: 1,
        borderColor: 'divider',
        borderRadius: '8px 8px 0 0',
        '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            gap: 2
        }
    },
    details: {
        p: 3,
        backgroundColor: theme.palette.background.default
    }
})

export const containerStyles = {
    wrapper: {
        py: 4,
        px: { xs: 2, sm: 3 },
        minHeight: '100vh',
        backgroundColor: 'background.default'
    },
    gridContainer: {
        Padding: 1
    }
} 