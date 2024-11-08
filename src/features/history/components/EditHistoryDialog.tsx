import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutPlans'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material'
import { useHistoryForm } from '../hooks/useHistoryForm'
import { TrainingHistoryEntry } from '../types/HistoryTypes'
import { WorkoutHistoryExercises } from './WorkoutHistoryExercises'

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
    const {
        selectedPlanId,
        selectedDayId,
        exercises,
        selectedPlan,
        selectedDay,
        availableDays,
        availableExercises,
        isValid,
        handlePlanChange,
        handleDayChange,
        handleAddExercise,
        handleRemoveExercise,
        handleUpdateSets,
        getFormUpdates
    } = useHistoryForm({ initialEntry: entry, plans })

    const handleSave = () => {
        const updates = getFormUpdates()

        if (updates) {
            onSave(updates)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Training Entry</DialogTitle>
            <DialogContent>
                {/* Plan Selection */}
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

                {/* Day Selection */}
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

                {/* Exercise List and Editor */}
                {selectedDay && (
                    <WorkoutHistoryExercises
                        exercises={exercises}
                        availableExercises={availableExercises}
                        onAddExercise={handleAddExercise}
                        onRemoveExercise={handleRemoveExercise}
                        onUpdateSets={handleUpdateSets}
                    />
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