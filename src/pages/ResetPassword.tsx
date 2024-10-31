import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Link, Paper } from '@mui/material';
import { useResetPassword } from '@/features/auth/hooks/useResetPassword';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ResetPassword: React.FC = () => {
    const { isLoading, isEmailSent, handleResetPassword } = useResetPassword();

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
                    <FitnessCenterIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Reset Password
                    </Typography>
                </Box>
                <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 400 }}>
                    {isEmailSent ? (
                        <Box>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Check your email for password reset instructions.
                            </Typography>
                            <Link
                                component={RouterLink}
                                to="/login"
                                color="primary"
                                underline="hover"
                            >
                                Back to Login
                            </Link>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Enter your email address and we'll send you instructions to reset your password.
                            </Typography>
                            <ResetPasswordForm
                                onSubmit={handleResetPassword}
                                isLoading={isLoading}
                            />
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default ResetPassword;