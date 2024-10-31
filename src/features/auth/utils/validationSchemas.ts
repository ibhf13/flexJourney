import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be at least 6 characters')
        .required('Password is required'),
});

export const signupSchema = yup.object({
    displayName: yup
        .string()
        .required('Name is required')
        .min(2, 'Name should be at least 2 characters'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export const resetPasswordSchema = yup.object({
    email: yup
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;