import {
  Radio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material'
import { RadioGroupProps } from './types'

const RadioGroup = ({
  label,
  options,
  error,
  helperText,
  required,
  disabled,
  row,
  value,
  onChange,
  ...props
}: RadioGroupProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <FormControl error={error} required={required} disabled={disabled}>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiRadioGroup row={row} value={value} onChange={handleChange} {...props}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default RadioGroup
