import { Drawer, Box, IconButton, Typography, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { SideDrawerProps } from './types'

const SideDrawer = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  showCloseButton = true,
  fullHeight = true,
  width = '50%',
  anchor = 'right',
  actions,
  customDrawerProps,
}: SideDrawerProps) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: width,
          maxWidth: '100%',
        },
      }}
      {...customDrawerProps}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6">{title}</Typography>
            {subtitle && (
              <Typography variant="subtitle2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {showCloseButton && (
            <IconButton aria-label="close" onClick={onClose} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: 'auto',
            height: fullHeight ? '100%' : 'auto',
          }}
        >
          {children}
        </Box>
        {actions && (
          <>
            <Divider />
            <Box sx={{ p: 2 }}>{actions}</Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}

export default SideDrawer
