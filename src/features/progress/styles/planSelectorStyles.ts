export const baseStyles = {
    background: `linear-gradient(135deg, 
        #1a1a1a 0%,
        #2d2d2d 50%,
        #363636 100%
    )`,
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: `radial-gradient(circle at top right, 
            rgba(83, 83, 83, 0.15) 0%, 
            transparent 60%
        )`,
        zIndex: 1
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(76, 175, 80, 0.1), transparent)',
        zIndex: 0
    }
}

export const dialogStyles = {
    ...baseStyles,
    borderRadius: 2
}

export const drawerStyles = {
    ...baseStyles,
    borderRadius: '20px 20px 0 0'
}