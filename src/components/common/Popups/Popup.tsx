import {
  Dialog,
  DialogProps
} from '@mui/material'
import PopupHeader from './PopupHeader'
import { StyledDialogContent } from './styles'
import { BasePopupProps } from './types'


interface PopupProps extends BasePopupProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  customDialogProps?: Partial<DialogProps>

}

const Popup = ({
  open,
  onClose,
  children,
  headerStyle,
  icon,
  iconStyle,
  contentStyle,
  headerContent,
  isCompleteCustomHeader,
  maxWidth = 'sm',
  customDialogProps,
}: PopupProps) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby="dialog-title"
      {...customDialogProps}
    >
      <PopupHeader
        onClose={onClose}
        headerStyle={headerStyle}
        icon={icon}
        iconStyle={iconStyle}
        isCompleteCustomHeader={isCompleteCustomHeader}
      >
        {headerContent}
      </PopupHeader>
      <StyledDialogContent sx={contentStyle}>
        {children}
      </StyledDialogContent>
    </Dialog>
  )
}

export default Popup
