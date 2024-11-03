import { useState } from 'react'
import { Typography, Box } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

import { Container, GridContainer, GridItem, Paper } from '@/components/common/StructureComponents'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { DialogPopup } from '@/components/common/Popups'
import { TextField, SelectField } from '@/components/common/Forms'
import { useNotification } from '@/features/Feedback'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleGetStarted = () => {
    showNotification({
      message: "Welcome to FitLife! Let's begin your fitness journey.",
      severity: 'success',
    })
    navigate('/plan')
  }

  const workoutLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 4, md: 8 },
          textAlign: 'center',
          color: 'common.white',
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 'bold',
          }}
        >
          Transform Your Life with FitLife
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: 'grey.400',
          }}
        >
          Personalized workouts, expert guidance, and a supportive community
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <PrimaryButton startIcon={<FitnessCenterIcon />} onClick={handleGetStarted} size="large">
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
        {[
          {
            icon: <FitnessCenterIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
            title: 'Custom Workouts',
            description: 'Tailored fitness programs designed for your goals',
          },
          {
            icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
            title: 'Track Progress',
            description: 'Monitor your fitness journey with detailed analytics',
          },
          {
            icon: <CalendarTodayIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
            title: 'Schedule Workouts',
            description: 'Plan your routine with our smart calendar',
          },
        ].map((feature, index) => (
          <GridItem key={index} xs={12} md={4}>
            <Paper
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ textAlign: 'center', p: 3 }}>
                {feature.icon}
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">{feature.description}</Typography>
              </Box>
            </Paper>
          </GridItem>
        ))}
      </GridContainer>

      {/* Quick Start Section */}
      <Paper sx={{ mt: 4, p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom>
          Quick Start
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
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
          <PrimaryButton>Find Workouts</PrimaryButton>
        </Box>
      </Paper>

      {/* Demo Dialog */}
      <DialogPopup
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Welcome to FitLife"
        maxWidth="md"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">
            Welcome to FitLife! Here's a quick overview of our platform...
          </Typography>
          {/* Add your demo content here */}
        </Box>
      </DialogPopup>
    </Container>
  )
}

export default HomePage
