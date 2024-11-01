import { ButtonProps as MuiButtonProps } from '@mui/material'

export interface BaseButtonProps extends Omit<MuiButtonProps, 'variant'> {
  isLoading?: boolean
  fullWidth?: boolean
  href?: string
}

export interface PrimaryButtonProps extends BaseButtonProps {
  variant?: 'contained' | 'outlined'
}

export interface SecondaryButtonProps extends BaseButtonProps {
  variant?: 'text' | 'outlined'
}

export interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode
  iconPosition?: 'start' | 'end'
  label: string
}
