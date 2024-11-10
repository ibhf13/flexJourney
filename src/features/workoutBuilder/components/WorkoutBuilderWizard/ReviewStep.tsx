import { useAuthContext } from '@/contexts/AuthContext'
import { useExercises } from '@/features/exercises/hooks/useExercises'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
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
                user.uid
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

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Review Your Workout Plan
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {workoutPlan.title}
                </Typography>

                {workoutPlan.days?.map((day, index) => (
                    <Box key={day.id} sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {day.title}
                        </Typography>
                        {day.exercises.map((exercise) => {
                            const exerciseDetails = exercises.find(e => e.id === exercise.id)

                            return (
                                <Typography key={exercise.id} sx={{ ml: 2 }}>
                                    • {exerciseDetails?.title}
                                </Typography>
                            )
                        })}
                    </Box>
                ))}
            </Paper>

            <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Difficulty Level</InputLabel>
                <Select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as DifficultyLevel)}
                    label="Difficulty Level"
                >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
            </FormControl>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Workout plan saved successfully!
                </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    variant="outlined"
                    onClick={() => setCurrentStep('exercises')}
                    disabled={isSaving}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                    startIcon={isSaving ? <CircularProgress size={20} /> : null}
                >
                    {isSaving ? 'Saving...' : 'Save Workout Plan'}
                </Button>
            </Box>
        </Box>
    )
}