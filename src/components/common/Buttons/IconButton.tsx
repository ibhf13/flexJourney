import { Button, CircularProgress } from '@mui/material';
import { IconButtonProps } from './types';

const IconButton = ({
  icon,
  label,
  iconPosition = 'start',
  isLoading = false,
  disabled,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      startIcon={iconPosition === 'start' && !isLoading ? icon : null}
      endIcon={iconPosition === 'end' && !isLoading ? icon : null}
      disabled={disabled || isLoading}
      aria-label={label}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{ 
            color: 'inherit',
            mr: 1 
          }}
        />
      ) : null}
      {props.children}
    </Button>
  );
};

export default IconButton;