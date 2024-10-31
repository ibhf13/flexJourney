import { Button, CircularProgress, Link } from '@mui/material';
import { PrimaryButtonProps } from './types';

const PrimaryButton = ({  
  children,
  isLoading = false,
  disabled,
  variant = 'contained',
  to,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      variant={variant}
      disabled={disabled || isLoading}
      component={to ? Link : 'button'}
      to={to}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{ 
            color: variant === 'contained' ? 'primary.contrastText' : 'primary.main',
            mr: children ? 1 : 0 
          }}
        />
      ) : null}
      {children}
    </Button>
  );
};

export default PrimaryButton;