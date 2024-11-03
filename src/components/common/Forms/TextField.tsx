import { TextField as MuiTextField, FormControl, FormHelperText } from '@mui/material'
import { TextFieldProps } from './types'

const TextField = ({
  label,
  error,
  helperText,
  required,
  disabled,
  variant = 'outlined',
  fullWidth = true,
  ...props
}: TextFieldProps) => {

  return (
    <FormControl error={error} fullWidth={fullWidth}>
      <MuiTextField
        label={label}
        error={error}
        required={required}
        disabled={disabled}
        variant={variant}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default TextField
