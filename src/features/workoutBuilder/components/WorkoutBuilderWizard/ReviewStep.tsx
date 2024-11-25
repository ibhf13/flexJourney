import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useExercises } from '@/features/exercises/hooks/useExercises'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { saveWorkoutPlan } from '../../api/workoutBuilderService'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'
import { PlanSummary } from './ReviewStep/PlanSummary'
import { reviewStepStyles } from './styles/reviewStepStyles'

export const ReviewStep = ({ onSuccess }: { onSuccess?: () => void }) => {
    const theme = useTheme()
    const styles = reviewStepStyles(theme)
    const { workoutPlan, resetBuilder } = useWorkoutBuilderContext()
    const { exercises } = useExercises()
    const { user } = useAuthContext()
    const { handleError } = useErrorHandler()
    const [isSaving, setIsSaving] = useState(false)
    const [description, setDescription] = useState('')
    const [level, setLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER)

    const handleSave = async () => {
        if (!user || !workoutPlan.title || !workoutPlan.days) return
        setIsSaving(true)
        try {
            await saveWorkoutPlan(workoutPlan as any, description, level, workoutPlan.type, user as any)
            resetBuilder()
            onSuccess?.()
        } catch (error) {
            handleError(error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Stack spacing={3} sx={styles.container}>
            <PlanSummary workoutPlan={workoutPlan} exercises={exercises} />

            <Paper elevation={0} sx={styles.paper}>
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
                        placeholder="Add any additional notes for your plan"
                        sx={{ '& .MuiOutlinedInput-root': styles.inputField }}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Difficulty Level</InputLabel>
                        <Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value as DifficultyLevel)}
                            label="Difficulty Level"
                            sx={styles.inputField}
                        >
                            {Object.values(DifficultyLevel).map((level) => (
                                <MenuItem key={level} value={level}>{level}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={resetBuilder}
                    disabled={isSaving}
                    sx={styles.inputField}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                    startIcon={isSaving ? <CircularProgress size={20} /> : null}
                    sx={styles.gradientButton}
                >
                    {isSaving ? 'Saving...' : 'Save Plan'}
                </Button>
            </Box>
        </Stack>
    )
}