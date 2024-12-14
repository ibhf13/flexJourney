import { z } from 'zod'
import { AuthCredentials, SignupCredentials } from '../types/AuthTypes'

const passwordSchema = z.string()
  .min(6, 'Password should be at least 6 characters')
  .max(50, 'Password is too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  )

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z.string()
    .min(1, 'Password is required')
}) satisfies z.ZodType<AuthCredentials>

export const signupSchema = z.object({
  displayName: z.string()
    .min(2, 'Name should be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: passwordSchema,
  confirmPassword: passwordSchema
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
) satisfies z.ZodType<SignupCredentials & { confirmPassword: string }>

export const resetPasswordSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
