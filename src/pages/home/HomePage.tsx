import { useState } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { MainLayout } from '../../components/Layout';
import { Container, GridContainer, GridItem, Paper } from '../../components/common/structureComponents';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { DialogPopup } from '../../components/common/Popups';
import { TextField, SelectField } from '../../components/common/Forms';
import { useNotification } from '../../features/Feedback';

const HomePage = () => {
  const theme = useTheme();
  const { showNotification } = useNotification();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGetStarted = () => {
    showNotification({
      message: 'Welcome to FitLife! Let\'s begin your fitness journey.',
      severity: 'success'
    });
  };

  const workoutLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <MainLayout>
      <Container>
        {/* Hero Section */}
        <Box sx={{ py: { xs: 4, md: 8 }, textAlign: 'center' }}>
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Transform Your Life with FitLife
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Personalized workouts, expert guidance, and a supportive community
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <PrimaryButton
              startIcon={<FitnessCenterIcon />}
              onClick={handleGetStarted}
              size="large"
            >
              Get Started
            </PrimaryButton>
            <SecondaryButton
              startIcon={<PlayCircleIcon />}
              onClick={() => setDialogOpen(true)}
              size="large"
            >
              Watch Demo
            </SecondaryButton>
          </Box>
        </Box>

        {/* Features Grid */}
        <GridContainer spacing={3}>
          <GridItem xs={12} md={4}>
            <Paper sx={{ height: '100%' }}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <FitnessCenterIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Custom Workouts
                </Typography>
                <Typography color="text.secondary">
                  Tailored fitness programs designed for your goals
                </Typography>
              </Box>
            </Paper>
          </GridItem>

          <GridItem xs={12} md={4}>
            <Paper sx={{ height: '100%' }}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Track Progress
                </Typography>
                <Typography color="text.secondary">
                  Monitor your fitness journey with detailed analytics
                </Typography>
              </Box>
            </Paper>
          </GridItem>

          <GridItem xs={12} md={4}>
            <Paper sx={{ height: '100%' }}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <CalendarTodayIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Schedule Workouts
                </Typography>
                <Typography color="text.secondary">
                  Plan your routine with our smart calendar
                </Typography>
              </Box>
            </Paper>
          </GridItem>
        </GridContainer>

        {/* Quick Start Section */}
        <Paper sx={{ mt: 4, p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Quick Start
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Search Workouts"
              placeholder="E.g., Yoga, HIIT..."
              sx={{ flexGrow: 1 }}
            />
            <SelectField
              label="Fitness Level"
              options={workoutLevels}
              defaultValue="beginner"
              sx={{ minWidth: 200 }}
            />
            <PrimaryButton>
              Find Workouts
            </PrimaryButton>
          </Box>
        </Paper>

        {/* Demo Dialog */}
        <DialogPopup
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Welcome to FitLife"
          maxWidth="md" children={<Typography>HI</Typography>}
        >

        </DialogPopup>
      </Container>
    </MainLayout>
  );
};

export default HomePage;