import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import {
    Divider,
    FormControl,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { ExerciseLog, ExerciseSet } from '../types/HistoryTypes'
import { ExerciseSetEditor } from './ExerciseSetEditor'

interface WorkoutHistoryExercisesProps {
    exercises: ExerciseLog[]
    availableExercises: Exercise[]
    onAddExercise: (exercise: Exercise) => void
    onRemoveExercise: (exerciseId: string) => void
    onUpdateSets: (exerciseId: string, sets: ExerciseSet[]) => void
}

export const WorkoutHistoryExercises = ({
    exercises,
    availableExercises,
    onAddExercise,
    onRemoveExercise,
    onUpdateSets
}: WorkoutHistoryExercisesProps) => {
    const remainingExercises = availableExercises.filter(
        ex => !exercises.some(e => e.exerciseId === ex.id)
    )

    return (
        <Stack spacing={2}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '1rem', sm: '1.125rem' }
                    }}
                >
                    Exercises
                </Typography>

                <FormControl
                    sx={{
                        minWidth: { xs: 200, sm: 250 }
                    }}
                    size="small"
                >
                    <Select
                        value=""
                        displayEmpty
                        onChange={(e) => {
                            const exercise = availableExercises.find(ex => ex.id === e.target.value)

                            if (exercise) onAddExercise(exercise)
                        }}
                        renderValue={() => "Add Exercise"}
                        sx={{
                            borderRadius: '8px',
                            '& .MuiSelect-select': {
                                py: 1,
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }
                        }}
                        startAdornment={<AddIcon color="primary" sx={{ ml: 1 }} />}
                    >
                        {remainingExercises.map(exercise => (
                            <MenuItem
                                key={exercise.id}
                                value={exercise.id}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    borderRadius: 1,
                                    mx: 1,
                                    width: 'calc(100% - 16px)',
                                    my: 0.5,
                                    '&:hover': {
                                        bgcolor: 'action.hover'
                                    }
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <FitnessCenterIcon sx={{ fontSize: '1.25rem', color: 'primary.main' }} />
                                    <Typography variant="body2">
                                        {exercise.title}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                        {remainingExercises.length === 0 && (
                            <MenuItem disabled sx={{ py: 1.5, px: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No more exercises available
                                </Typography>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Stack>

            <AnimatePresence initial={false}>
                {exercises.map((exercise) => (
                    <Paper
                        key={exercise.exerciseId}
                        component={motion.div}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        elevation={0}
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            overflow: 'hidden',
                            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6)
                        }}
                    >
                        <Stack spacing={2} sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <FitnessCenterIcon
                                        sx={{
                                            color: 'primary.main',
                                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }}
                                    >
                                        {exercise.exerciseName}
                                    </Typography>
                                </Stack>

                                <IconButton
                                    size="small"
                                    onClick={() => onRemoveExercise(exercise.exerciseId)}
                                    sx={{
                                        color: 'error.main',
                                        '&:hover': {
                                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                            <Divider sx={{ opacity: 0.6 }} />

                            <ExerciseSetEditor
                                sets={exercise.sets}
                                onChange={(sets) => onUpdateSets(exercise.exerciseId, sets)}
                            />
                        </Stack>
                    </Paper>
                ))}
            </AnimatePresence>

            {exercises.length === 0 && (
                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 2,
                        bgcolor: 'transparent'
                    }}
                >
                    <Typography
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        No exercises added yet. Use the dropdown above to add exercises.
                    </Typography>
                </Paper>
            )}
        </Stack>
    )
}