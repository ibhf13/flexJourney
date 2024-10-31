import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { PlanCard } from '../components/common/Cards/PlanCard';
import { useWorkoutContext } from '../features/workout/contexts/WorkoutContext';
import { useWorkoutPlans } from '../features/workout/hooks/useWorkoutPlans';
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes';

export const PlanSelectionPage = () => {
    const navigate = useNavigate();
    const { plans, isLoading, error } = useWorkoutPlans();
    const { selectPlan } = useWorkoutContext();

    useEffect(() => {
        selectPlan(plans[0]);
    }, [plans]);

    const handlePlanSelect = (plan: WorkoutPlan) => {
        selectPlan(plan);
        navigate(`/plan/${plan.id}`);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Choose Your Workout Plan
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Select a workout plan that matches your fitness level and goals
            </Typography>

            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                        <PlanCard plan={plan} onClick={handlePlanSelect} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};