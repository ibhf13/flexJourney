import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

interface ResetPasswordFormProps {
  onSubmit: (email: string) => Promise<void>
  isLoading: boolean
}

interface ResetPasswordFormData {
  email: string
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: '',
    },
  })

  const handleFormSubmit = async (data: ResetPasswordFormData) => {
    await onSubmit(data.email)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{ width: '100%' }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={isLoading}
      >
        Reset Password
      </LoadingButton>
    </Box>
  )
}

export default ResetPasswordForm
