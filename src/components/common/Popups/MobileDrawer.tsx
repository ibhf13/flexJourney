import {
    Drawer,
    Box,
    IconButton,
    Typography,
    Divider,
    useTheme,
    useMediaQuery,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import { MobileDrawerProps } from './types';
  
  const MobileDrawer = ({
    open,
    onClose,
    title,
    subtitle,
    children,
    showCloseButton = true,
    anchor = 'bottom',
    height = '50%',
    actions,
    customDrawerProps,
  }: MobileDrawerProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    if (!isMobile) return null;
  
    const isVertical = anchor === 'bottom' || anchor === 'top';
  
    return (
      <Drawer
        anchor={anchor}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            [isVertical ? 'height' : 'width']: height,
            borderTopLeftRadius: anchor === 'bottom' ? 16 : 0,
            borderTopRightRadius: anchor === 'bottom' ? 16 : 0,
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
          {anchor === 'bottom' && (
            <Box
              sx={{
                width: 40,
                height: 4,
                backgroundColor: 'grey.300',
                borderRadius: 2,
                margin: '8px auto',
              }}
            />
          )}
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
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ ml: 2 }}
              >
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
    );
  };
  
  export default MobileDrawer;