import GoogleIcon from '@mui/icons-material/Google'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Divider, Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthForm from '../features/auth/components/AuthForm'
import { useSignup } from '../features/auth/hooks/useSignup'
import { signupSchema } from '../features/auth/utils/validationSchemas'

const Signup: React.FC = () => {
  const { isLoading, isGoogleLoading, handleSignup, handleGoogleSignIn } = useSignup()

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
          py: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create Account
        </Typography>

        <LoadingButton
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          loading={isGoogleLoading}
          sx={{ mb: 2 }}
        >
          Sign up with Google
        </LoadingButton>

        <Divider sx={{ width: '100%', mb: 2 }}>
          <Typography color="textSecondary">or</Typography>
        </Divider>

        <AuthForm
          mode="signup"
          onSubmit={handleSignup}
          validationSchema={signupSchema}
          isLoading={isLoading}
        />

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Signup
