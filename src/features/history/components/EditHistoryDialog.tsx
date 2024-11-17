// import { useWorkoutPlans } from '@/features/workout/hooks/useWorkoutPlans'
import CloseIcon from '@mui/icons-material/Close'
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
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    // const { plans, isLoading } = useWorkoutPlans()
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
    } = useHistoryForm({ initialEntry: entry, plans: [] })

    const handleSave = () => {
        const updates = getFormUpdates()

        if (updates) {
            onSave(updates)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            fullScreen={fullScreen}
            PaperProps={{
                sx: {
                    borderRadius: fullScreen ? 0 : 2,
                    background: (theme) => theme.palette.background.paper,
                }
            }}
        >
            <DialogTitle>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6" component="span">
                        Edit Training Entry
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent
                sx={{
                    pb: { xs: 2, sm: 3 },
                    px: { xs: 2, sm: 3 }
                }}
            >
                <Stack spacing={2} mt={1}>
                    <FormControl fullWidth disabled={isLoading}>
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
                            {plans.map(plan => (
                                <MenuItem key={plan.id} value={plan.id}>
                                    {plan.title} ({plan.level})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth disabled={!selectedPlan || isLoading}>
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
            </DialogContent>

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
        </Dialog>
    )
}