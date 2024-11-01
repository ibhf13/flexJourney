import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (data: any) => Promise<void>
  validationSchema: any
  isLoading?: boolean
}

const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '400px',
  width: '100%',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}))

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  validationSchema,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" gutterBottom>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Typography>

      {mode === 'signup' && (
        <TextField
          {...register('displayName')}
          label="Name"
          fullWidth
          error={!!errors.displayName}
          helperText={errors.displayName?.message as string}
        />
      )}

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message as string}
      />

      {mode === 'signup' && (
        <TextField
          {...register('confirmPassword')}
          label="Confirm Password"
          type="password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message as string}
        />
      )}

      <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
        {isLoading ? <CircularProgress size={24} /> : mode === 'login' ? 'Login' : 'Sign Up'}
      </Button>
    </FormContainer>
  )
}

export default AuthForm
