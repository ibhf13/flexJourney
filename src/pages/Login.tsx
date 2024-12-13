import AppLogo from '@/components/Layout/AppLogo'
import { Box, Container, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthForm from '../features/auth/components/AuthForm'
import SocialLoginButtons from '../features/auth/components/SocialLoginButtons'
import { useLoginHandler } from '../features/auth/hooks/useLoginHandler'
import { loginSchema } from '../features/auth/utils/validationSchemas'

const Login: React.FC = () => {
  const { isLoading, handleLogin, handleGoogleSignIn } = useLoginHandler()

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AppLogo redirect="/login" />
        </Box>
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 400 }}>
          <AuthForm
            mode="login"
            onSubmit={handleLogin}
            validationSchema={loginSchema}
            isLoading={isLoading}
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to="/reset-password"
              color="primary"
              underline="hover"
              sx={{ cursor: 'pointer' }}
            >
              Forgot password?
            </Link>
          </Box>
          <SocialLoginButtons isLoading={isLoading} onGoogleSignIn={handleGoogleSignIn} />
        </Paper>
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/signup" color="primary" underline="hover">
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Login
