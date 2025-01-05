
import { Box, Card, DialogContent } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: theme.spacing(3),
    border: `2px dashed ${theme.palette.primary.main}`,
    background: `linear-gradient(135deg, 
        ${theme.palette.background.paper} 0%,
        ${theme.palette.primary.dark}10 100%)`,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        borderStyle: 'solid',
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    },
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(4),
    minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
        width: '8px'
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.background.default,
        borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '4px',
        '&:hover': {
            background: theme.palette.primary.dark
        }
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        minHeight: '85vh'
    },
}))

export const DialogHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(135deg, 
        ${theme.palette.primary.dark} 0%,
        ${theme.palette.primary.main} 100%)`,
    color: theme.palette.common.white,
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(to right, 
            transparent 0%,
            ${theme.palette.common.white}40 50%,
            transparent 100%
        )`
    }
}))