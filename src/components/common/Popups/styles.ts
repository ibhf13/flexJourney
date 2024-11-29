import { Box, DialogContent, styled } from '@mui/material'


export const DialogHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'end',
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2, 4),
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 3),
    },
}))