import {
  CheckboxProps as MuiCheckboxProps,
  SelectProps as MuiSelectProps,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

export interface BaseFieldProps {
  label?: MuiTextFieldProps['label']
  error?: MuiTextFieldProps['error']
  helperText?: MuiTextFieldProps['helperText']
  required?: boolean
  disabled?: boolean
}

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'>, BaseFieldProps {
  variant?: 'outlined' | 'filled'
}

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectFieldProps extends Omit<MuiSelectProps, 'variant'>, BaseFieldProps {
  options: SelectOption[]
  placeholder?: string
  variant?: 'outlined' | 'filled'
}

export interface CheckboxFieldProps extends MuiCheckboxProps, BaseFieldProps {
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom'
}

export interface RadioGroupOption extends SelectOption {
  disabled?: boolean
}

export interface RadioGroupProps extends BaseFieldProps {
  options: RadioGroupOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  row?: boolean
}
