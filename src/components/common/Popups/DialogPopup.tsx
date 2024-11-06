import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DialogPopupProps } from './types'

const DialogPopup = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  showCloseButton = true,
  fullHeight = false,
  maxWidth = 'sm',
  actions,
  fullScreen = false,
  preventBackdropClick = false,
  customDialogProps,
}: DialogPopupProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (preventBackdropClick) {
      event.stopPropagation()
    } else {
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen || isMobile}
      aria-labelledby="dialog-title"
      BackdropProps={{
        onClick: handleBackdropClick,
      }}
      {...customDialogProps}
    >
      <DialogTitle
        id="dialog-title"
        sx={{
          pr: showCloseButton ? 6 : 3,
          pb: subtitle ? 0 : 2,
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
        {showCloseButton && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          height: fullHeight ? '80vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}

export default DialogPopup
