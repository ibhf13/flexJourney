import ResponsivePopup from '@/components/common/Popups/ResponsivePopup'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutQuerys'
import {
    Box,
    Button,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
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
    const theme = useTheme()
    const { user } = useAuth()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const { data: plans = [], isLoading: isPlansLoading } = useWorkoutPlans(user?.uid ?? "")

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
    } = useHistoryForm({
        initialEntry: entry,
        plans
    })

    const handleSave = () => {
        const updates = getFormUpdates()

        if (updates) {
            onSave(updates)
        }
    }

    const headerContent = (
        <Typography variant="h6" component="span">
            Edit Training Entry
        </Typography>
    )

    return (
        <ResponsivePopup
            open={open}
            onClose={onClose}
            maxWidth="md"
            headerContent={headerContent}
            contentStyle={{
                borderRadius: fullScreen ? 0 : 2,
                background: theme.palette.background.paper,
            }}
        >


            <Stack spacing={2} sx={{ mt: 1, overflow: 'hidden' }}>
                <FormControl fullWidth disabled={isPlansLoading} >
                    <InputLabel>Workout Plan</InputLabel>
                    <Select
                        value={selectedPlanId}
                        label="Workout Plan"
                        onChange={handlePlanChange}
                        sx={{
                            '& .MuiSelect-select': {
                                py: 1.5,
                            }
                        }}
                    >
                        {plans?.map(plan => (
                            <MenuItem key={plan.id} value={plan.id}>
                                {plan.title} ({plan.level})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth disabled={!selectedPlan || isPlansLoading}>
                    <InputLabel>Workout Day</InputLabel>
                    <Select
                        value={selectedDayId}
                        label="Workout Day"
                        onChange={handleDayChange}
                        sx={{
                            '& .MuiSelect-select': {
                                py: 1.5,
                            }
                        }}
                    >
                        {availableDays.map(day => (
                            <MenuItem key={day.id} value={day.id}>
                                {day.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <AnimatePresence>
                    {selectedDay && (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <WorkoutHistoryExercises
                                exercises={exercises}
                                availableExercises={availableExercises}
                                onAddExercise={handleAddExercise}
                                onRemoveExercise={handleRemoveExercise}
                                onUpdateSets={handleUpdateSets}
                            />
                        </Box>
                    )}
                </AnimatePresence>
            </Stack>

            <DialogActions
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 2 }
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={!isValid}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                    }}
                >
                    Save Changes
                </Button>
            </DialogActions>
        </ResponsivePopup>
    )
}