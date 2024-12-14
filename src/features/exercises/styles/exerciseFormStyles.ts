import { Box, MenuItem } from '@mui/material'
import { styled } from '@mui/system'

export const ImageUploadBox = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-in-out',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
    position: 'relative',
}))

export const CustomTypeMenuItem = styled(MenuItem)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(1),
}))