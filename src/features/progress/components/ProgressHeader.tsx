import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, Button, Chip, LinearProgress, Paper, Typography } from '@mui/material'
import { ResetProgressButton } from './ResetProgressButton'

interface ProgressHeaderProps {
    selectedPlan?: WorkoutPlan
    onSelectPlan: () => void
    currentDay?: number
    totalDays?: number
    completedExercises?: number
    totalExercises?: number
    progressId?: string | null
}

export const ProgressHeader = ({
    selectedPlan,
    onSelectPlan,
    currentDay,
    totalDays,
    completedExercises = 0,
    totalExercises = 0,
    progressId
}: ProgressHeaderProps) => {
    const progress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'relative',
                p: { xs: 3, md: 4 },
                overflow: 'hidden',
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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2
                    }}>
                        <FitnessCenterIcon sx={{ fontSize: 32, color: '#4caf50' }} />
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                            Track Your Progress
                        </Typography>
                    </Box>

                    {currentDay && totalDays && (
                        <Chip
                            label={`Day ${currentDay} of ${totalDays}`}
                            color="primary"
                            sx={{
                                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                borderColor: 'rgba(76, 175, 80, 0.5)',
                                color: '#fff'
                            }}
                        />
                    )}
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mt: 3,
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{
                        flex: 1,
                        p: 2,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: 1,
                        minWidth: 200
                    }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Current Plan
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {selectedPlan?.title || 'No plan selected'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {progressId && <ResetProgressButton progressId={progressId} completedExercises={completedExercises} />}
                        <Button
                            variant="contained"
                            onClick={onSelectPlan}
                            startIcon={<SwapHorizIcon />}
                            sx={{
                                backgroundColor: '#4caf50',
                                '&:hover': {
                                    backgroundColor: '#43a047'
                                }
                            }}
                        >
                            {selectedPlan ? 'Change Plan' : 'Select Plan'}
                        </Button>
                    </Box>
                </Box>

                {selectedPlan && (
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Today's Progress
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {completedExercises} / {totalExercises} exercises
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#4caf50'
                                }
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Paper>
    )
}