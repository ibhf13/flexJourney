import { SxProps, Theme } from '@mui/material'

export const sharedCardStyles: SxProps<Theme> = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 8,
    },
    '&:focus-within': {
        outline: '2px solid',
        outlineColor: 'primary.main',
    },
}

export const cardMediaStyles: SxProps<Theme> = {
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))',
    },
}

export const ellipsisTextStyles: SxProps<Theme> = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
}