import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { CheckboxFieldProps } from './types'

const CheckboxField = ({
  label,
  error,
  helperText,
  required,
  disabled,
  labelPlacement = 'end',
  ...props
}: CheckboxFieldProps) => {

  return (
    <FormControl error={error} required={required} disabled={disabled}>
      <FormControlLabel
        control={<Checkbox {...props} />}
        label={label || ''}
        labelPlacement={labelPlacement}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CheckboxField
