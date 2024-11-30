import { useMediaQuery, useTheme } from '@mui/material'
import MobileDrawer from './MobileDrawer'
import Popup from './Popup'
import { ResponsivePopupProps } from './types'

const ResponsivePopup = ({
    open,
    onClose,
    headerStyle,
    icon,
    iconStyle,
    headerContent,
    children,
    preventBackdropClick = false,
    maxWidth = 'sm',
    drawerAnchor = 'bottom',
    drawerHeight = '90dvh',
    swipeAreaWidth = 20,
    disableSwipeToOpen = true,
    contentStyle,
    fullHeight = false,
    isCompleteCustomHeader = false,
    customDialogProps,
    customDrawerProps,
}: ResponsivePopupProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))


    if (isMobile) {
        return (
            <MobileDrawer
                open={open}
                anchor={drawerAnchor}
                drawerHeight={fullHeight ? '100%' : drawerHeight}
                swipeAreaWidth={swipeAreaWidth}
                disableSwipeToOpen={disableSwipeToOpen}
                customDrawerProps={customDrawerProps}
                isCompleteCustomHeader={isCompleteCustomHeader}
                preventBackdropClick={preventBackdropClick}
                onClose={onClose}
                headerStyle={headerStyle}
                headerContent={headerContent}
                icon={icon}
                iconStyle={iconStyle}
                contentStyle={contentStyle}
                children={children}
            />
        )
    }

    return (
        <Popup
            open={open}
            maxWidth={maxWidth}
            onClose={onClose}
            headerStyle={headerStyle}
            headerContent={headerContent}
            icon={icon}
            iconStyle={iconStyle}
            isCompleteCustomHeader={isCompleteCustomHeader}
            preventBackdropClick={preventBackdropClick}
            contentStyle={contentStyle}
            customDialogProps={{
                ...customDialogProps,
                PaperProps: {
                    sx: {
                        height: fullHeight ? '100%' : 'auto',
                        borderRadius: { xs: 0, sm: 3 },
                        background: theme.palette.background.paper,
                        ...customDialogProps?.PaperProps?.sx,
                    }
                }
            }}
            children={children}

        />
    )
}

export default ResponsivePopup