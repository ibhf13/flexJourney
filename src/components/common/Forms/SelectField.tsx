import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import { SelectFieldProps } from './types'

const SelectField = ({
  label,
  options,
  error,
  helperText,
  required,
  disabled,
  placeholder,
  variant = 'outlined',
  fullWidth = true,
  ...props
}: SelectFieldProps) => {
  return (
    <FormControl
      error={error}
      fullWidth={fullWidth}
      variant={variant}
      required={required}
      disabled={disabled}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select label={label} displayEmpty={!!placeholder} {...props}>
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default SelectField
