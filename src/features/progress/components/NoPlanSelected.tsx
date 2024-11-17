import { DifficultyLevel, WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

interface NoPlanSelectedProps {
    onSelectPlan: () => void
    plans?: WorkoutPlan[]
}

export const NoPlanSelected = ({
    onSelectPlan,
    plans
}: NoPlanSelectedProps) => {
    const beginnerCount = plans?.filter(plan => plan.level === DifficultyLevel.BEGINNER).length
    const intermediateCount = plans?.filter(plan => plan.level === DifficultyLevel.INTERMEDIATE).length
    const advancedCount = plans?.filter(plan => plan.level === DifficultyLevel.ADVANCED).length

    const availablePlans = {
        beginner: beginnerCount || 0,
        intermediate: intermediateCount || 0,
        advanced: advancedCount || 0
    }


    return (
        <Paper
            elevation={3}
            sx={{
                position: 'relative',
                p: { xs: 4, md: 5 },
                mt: 4,
                textAlign: 'center',
                background: `linear-gradient(135deg, 
                    #1a1a1a 0%,
                    #2d2d2d 50%,
                    #363636 100%
                )`,
                color: 'white',
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <FitnessCenterIcon
                    sx={{
                        fontSize: 80,
                        color: '#4caf50',
                        mb: 3,
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                    }}
                />

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        background: 'linear-gradient(45deg, #fff, #e0e0e0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    No Workout Plan Selected
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        color: 'rgba(255,255,255,0.7)',
                        maxWidth: '500px',
                        mx: 'auto'
                    }}
                >
                    Start your fitness journey by selecting a workout plan that matches your goals
                </Typography>

                <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
                    {Object.entries(availablePlans).map(([level, count]) => (
                        <Grid item xs={12} sm={4} key={level}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: 1
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#4caf50',
                                        fontWeight: 600,
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {level}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {count} plans available
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Button
                    variant="contained"
                    onClick={onSelectPlan}
                    size="large"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#43a047',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                        },
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 1,
                        transition: 'all 0.2s ease-in-out',
                        boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)',
                        fontSize: '1.1rem'
                    }}
                >
                    Choose a Plan
                </Button>
            </Box>
        </Paper>
    )
}