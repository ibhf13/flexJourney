import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, SxProps, Theme } from '@mui/material'
import { DialogHeader } from './styles'

interface PopupHeaderProps {
    showCloseButton?: boolean
    onClose: () => void
    headerStyle?: SxProps<Theme> | undefined
    children: React.ReactNode
    icon?: React.ReactNode
    iconStyle?: SxProps<Theme> | undefined
    isCompleteCustomHeader?: boolean
}

const PopupHeader = ({
    onClose,
    headerStyle,
    icon,
    iconStyle,
    children,
    isCompleteCustomHeader = false
}: PopupHeaderProps) => {

    if (isCompleteCustomHeader) {
        return (
            children

        )
    }

    if (children && !isCompleteCustomHeader) {
        return (
            <DialogHeader sx={headerStyle || { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }} >
                <Box width="100%">
                    {children}
                </Box>
                <Box>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={iconStyle || {
                            color: 'inherit',
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.2)'
                            }
                        }}
                    >
                        {icon || <CloseIcon />}
                    </IconButton>
                </Box>
            </DialogHeader >
        )
    }

    return (
        <DialogHeader>
            <IconButton
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
        </DialogHeader >
    )

}

export default PopupHeader