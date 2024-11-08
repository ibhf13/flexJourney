import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutPlans'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ExerciseLog, ExerciseSet, TrainingHistoryEntry } from '../types/HistoryTypes'
import { ExerciseSetEditor } from './ExerciseSetEditor'

interface EditHistoryDialogProps {
    entry: TrainingHistoryEntry
    open: boolean
    onClose: () => void
    onSave: (updates: Partial<TrainingHistoryEntry>) => void
}

export const EditHistoryDialog = ({
    entry,
    open,
    onClose,
    onSave
}: EditHistoryDialogProps) => {
    const { plans, isLoading } = useWorkoutPlans()
    const [selectedPlanId, setSelectedPlanId] = useState(entry.planId)
    const [selectedDayId, setSelectedDayId] = useState(entry.dayId)
    const [exercises, setExercises] = useState<ExerciseLog[]>(entry.exercises)

    const selectedPlan = plans.find(plan => plan.id === selectedPlanId)
    const selectedDay = selectedPlan?.days.find(day => day.id === selectedDayId)
    const availableDays = selectedPlan?.days || []
    const availableExercises = selectedDay?.exercises || []

    useEffect(() => {
        if (selectedPlan && !selectedPlan.days.some(day => day.id === selectedDayId)) {
            setSelectedDayId('')
            setExercises([])
        }
    }, [selectedPlanId, selectedPlan, selectedDayId])

    const handlePlanChange = (event: SelectChangeEvent) => {
        setSelectedPlanId(event.target.value)
    }

    const handleDayChange = (event: SelectChangeEvent) => {
        setSelectedDayId(event.target.value)
        setExercises([]) // Reset exercises when day changes
    }

    const handleAddExercise = (exercise: Exercise) => {
        setExercises(prev => [...prev, {
            exerciseId: exercise.id,
            exerciseName: exercise.title,
            sets: [],
            completedAt: new Date().toISOString()
        }])
    }

    const handleRemoveExercise = (exerciseId: string) => {
        setExercises(prev => prev.filter(ex => ex.exerciseId !== exerciseId))
    }

    const handleUpdateSets = (exerciseId: string, sets: ExerciseSet[]) => {
        setExercises(prev => prev.map(ex =>
            ex.exerciseId === exerciseId ? { ...ex, sets } : ex
        ))
    }

    const handleSave = () => {
        if (!selectedPlan || !selectedDay) return

        const updates: Partial<TrainingHistoryEntry> = {
            planId: selectedPlanId,
            planName: selectedPlan.title,
            dayId: selectedDayId,
            dayName: selectedDay.title,
            exercises: exercises.map(exercise => ({
                ...exercise,
                completedAt: exercise.completedAt || new Date().toISOString()
            }))
        }

        onSave(updates)
    }

    const isValid = selectedPlanId && selectedDayId && exercises.every(ex => ex.sets.length > 0)

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Training Entry</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal" disabled={isLoading}>
                    <InputLabel>Workout Plan</InputLabel>
                    <Select value={selectedPlanId} label="Workout Plan" onChange={handlePlanChange}>
                        {plans.map(plan => (
                            <MenuItem key={plan.id} value={plan.id}>
                                {plan.title} ({plan.level})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!selectedPlan || isLoading}>
                    <InputLabel>Workout Day</InputLabel>
                    <Select value={selectedDayId} label="Workout Day" onChange={handleDayChange}>
                        {availableDays.map(day => (
                            <MenuItem key={day.id} value={day.id}>
                                {day.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedDay && (
                    <Box mt={3}>
                        <Typography variant="subtitle1" gutterBottom>
                            Exercises
                        </Typography>

                        {exercises.map((exercise) => (
                            <Box key={exercise.exerciseId} mb={2} p={2} border={1} borderColor="divider" borderRadius={1}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="subtitle2">{exercise.exerciseName}</Typography>
                                    <IconButton size="small" onClick={() => handleRemoveExercise(exercise.exerciseId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <ExerciseSetEditor
                                    sets={exercise.sets}
                                    onChange={(sets) => handleUpdateSets(exercise.exerciseId, sets)}
                                />
                            </Box>
                        ))}

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Add Exercise</InputLabel>
                            <Select
                                value=""
                                label="Add Exercise"
                                onChange={(e) => {
                                    const exercise = availableExercises.find(ex => ex.id === e.target.value)

                                    if (exercise) handleAddExercise(exercise)
                                }}
                            >
                                {availableExercises
                                    .filter(ex => !exercises.some(e => e.exerciseId === ex.id))
                                    .map(exercise => (
                                        <MenuItem key={exercise.id} value={exercise.id}>
                                            {exercise.title}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary" disabled={!isValid}>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    )
}