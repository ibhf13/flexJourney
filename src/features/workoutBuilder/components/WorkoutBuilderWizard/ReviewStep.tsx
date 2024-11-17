import { useExercises } from '@/features/exercises/hooks/useExercises'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import PreviewIcon from '@mui/icons-material/Preview'
import {
    Alert,
    alpha,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { saveWorkoutPlan } from '../../api/workoutBuilderService'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'

interface ReviewStepProps {
    onSuccess?: () => void
}

export const ReviewStep = ({ onSuccess }: ReviewStepProps) => {
    const { workoutPlan, setCurrentStep, resetBuilder } = useWorkoutBuilderContext()
    const { exercises } = useExercises()
    const { user } = useAuthContext()
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [description, setDescription] = useState('')
    const [level, setLevel] = useState<DifficultyLevel>('Beginner')

    const handleSave = async () => {
        if (!user || !workoutPlan.title || !workoutPlan.days) return

        setIsSaving(true)
        setError(null)

        try {
            await saveWorkoutPlan(
                workoutPlan as Required<typeof workoutPlan>,
                description,
                level,
                workoutPlan.type,
                user.uid,
            )
            setSuccess(true)
            setTimeout(() => {
                resetBuilder()
                onSuccess?.()
            }, 2000)
        } catch (err) {
            setError('Failed to save workout plan. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    const totalExercises = workoutPlan.days?.reduce(
        (sum, day) => sum + day.exercises.length,
        0
    ) || 0

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Paper
                    elevation={0}
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
                        mx: 'auto',
                        mb: 2
                    }}
                >
                    <PreviewIcon
                        sx={{
                            fontSize: 40,
                            color: 'primary.main'
                        }}
                    />
                </Paper>
                <Typography variant="h5" gutterBottom>
                    Review Your Workout Plan
                </Typography>
                <Typography color="text.secondary">
                    Review and confirm your workout plan details before saving
                </Typography>
            </Box>

            <Stack spacing={3}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <FitnessCenterIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6">
                            {workoutPlan.title}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        <Chip
                            label={`${workoutPlan.days?.length || 0} Days`}
                            color="primary"
                            variant="outlined"
                        />
                        <Chip
                            label={`${totalExercises} Exercises`}
                            color="primary"
                            variant="outlined"
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={3}>
                        {workoutPlan.days?.map((day, index) => (
                            <Box key={day.id}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CheckCircleOutlineIcon
                                        sx={{ mr: 1, color: 'success.main' }}
                                    />
                                    {day.title}
                                </Typography>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: 'background.default'
                                    }}
                                >
                                    <Stack spacing={1}>
                                        {day.exercises.map((exercise) => {
                                            const exerciseDetails = exercises.find(e => e.id === exercise.id)

                                            return (
                                                <Typography
                                                    key={exercise.id}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        color: 'text.secondary'
                                                    }}
                                                >
                                                    <span style={{ marginRight: 8 }}>•</span>
                                                    {exerciseDetails?.title}
                                                </Typography>
                                            )
                                        })}
                                    </Stack>
                                </Paper>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Final Details
                    </Typography>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add any additional notes or description for your workout plan"
                            InputProps={{
                                sx: {
                                    borderRadius: 2,
                                    '&.Mui-focused': {
                                        boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                                    }
                                }
                            }}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Difficulty Level</InputLabel>
                            <Select
                                value={level}
                                onChange={(e) => setLevel(e.target.value as DifficultyLevel)}
                                label="Difficulty Level"
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-focused': {
                                        boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                                    }
                                }}
                            >
                                <MenuItem value="Beginner">Beginner</MenuItem>
                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                <MenuItem value="Advanced">Advanced</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>

                {(error || success) && (
                    <Alert
                        severity={error ? 'error' : 'success'}
                        sx={{
                            borderRadius: 2,
                            '& .MuiAlert-message': {
                                width: '100%'
                            }
                        }}
                    >
                        {error || 'Workout plan saved successfully!'}
                    </Alert>
                )}

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2
                }}>
                    <Button
                        variant="outlined"
                        onClick={() => setCurrentStep('exercises')}
                        disabled={isSaving}
                        sx={{
                            borderRadius: 2,
                            px: 4
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={isSaving}
                        startIcon={isSaving ? <CircularProgress size={20} /> : null}
                        sx={{
                            borderRadius: 2,
                            px: 4
                        }}
                    >
                        {isSaving ? 'Saving...' : 'Save Workout Plan'}
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}