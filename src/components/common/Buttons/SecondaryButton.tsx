import { Button, CircularProgress } from '@mui/material'
import { SecondaryButtonProps } from './types'

const SecondaryButton = ({
  children,
  isLoading = false,
  disabled,
  variant = 'text',
  ...props
}: SecondaryButtonProps) => {

  return (
    <Button variant={variant} color="secondary" disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: 'secondary.main',
            mr: children ? 1 : 0,
          }}
        />
      ) : null}
      {children}
    </Button>
  )
}

export default SecondaryButton
