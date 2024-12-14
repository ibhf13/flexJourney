import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthCredentials, AuthFormMode, SignupCredentials } from '../types/AuthTypes'
import { LoginFormData, SignupFormData } from '../utils/authValidationSchemas'

interface AuthFormProps {
    mode: AuthFormMode
    onSubmit: (data: AuthCredentials | SignupCredentials) => Promise<void>
    validationSchema: z.ZodSchema<LoginFormData | SignupFormData>
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
        control,
        handleSubmit,
    } = useForm<LoginFormData | SignupFormData>({
        resolver: zodResolver(validationSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            ...(mode === 'signup' && {
                displayName: '',
                confirmPassword: '',
            }),
        },
    })

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" align="center" gutterBottom>
                {mode === 'login' ? 'Login' : 'Sign Up'}
            </Typography>

            {mode === 'signup' && (
                <Controller
                    name="displayName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Name"
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            )}

            <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />

            {mode === 'signup' && (
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            )}

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 2 }}
            >
                {isLoading ? (
                    <CircularProgress size={24} />
                ) : (
                    mode === 'login' ? 'Login' : 'Sign Up'
                )}
            </Button>
        </FormContainer>
    )
}

export default AuthForm
