import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { useExercises } from '@/features/exercises/hooks/useExercises'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Button,
    Chip,
    Divider,
    Fade,
    IconButton,
    InputAdornment,
    Paper,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'

export const ExerciseSelectionStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const { exercises, isExercisesLoading, exercisesError } = useExercises()
    const [currentDayIndex, setCurrentDayIndex] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')

    const handleExerciseAdd = (exercise: Exercise) => {
        if (!workoutPlan.days) return

        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        if (currentDay.exercises.some(e => e.id === exercise.id)) return

        currentDay.exercises.push(exercise)
        updateWorkoutPlan({ days: newDays })
    }

    const handleExerciseRemove = (exerciseId: string) => {
        if (!workoutPlan.days) return

        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        currentDay.exercises = currentDay.exercises.filter(e => e.id !== exerciseId)
        updateWorkoutPlan({ days: newDays })
    }

    const filteredExercises = exercises?.filter(exercise =>
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const currentDayExercises = workoutPlan.days?.[currentDayIndex]?.exercises || []
    const hasSelectedExercises = currentDayExercises.length > 0

    return (
        <LoadingErrorWrapper isLoading={isExercisesLoading} error={exercisesError}>
            <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
                <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
                    <Tabs
                        value={currentDayIndex}
                        onChange={(_, newValue) => setCurrentDayIndex(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            px: 2,
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: '3px 3px 0 0'
                            }
                        }}
                    >
                        {workoutPlan?.days?.map((day, index) => (
                            <Tab
                                key={day.id}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <span>{day.title}</span>
                                        {workoutPlan?.days?.[index]?.exercises?.length && (
                                            <Chip
                                                size="small"
                                                label={workoutPlan.days?.[index]?.exercises.length}
                                                color="primary"
                                            />
                                        )}
                                    </Box>
                                }
                                value={index}
                            />
                        ))}
                    </Tabs>
                </Paper>

                <TextField
                    fullWidth
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FitnessCenterIcon color="primary" />
                        Available Exercises
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {filteredExercises?.map(exercise => (
                            <Tooltip
                                key={exercise.id}
                                title={currentDayExercises.some(e => e.id === exercise.id)
                                    ? "Already added"
                                    : "Click to add"}
                                arrow
                            >
                                <Chip
                                    label={exercise.title}
                                    onClick={() => handleExerciseAdd(exercise)}
                                    clickable
                                    color={currentDayExercises.some(e => e.id === exercise.id) ? 'primary' : 'default'}
                                    sx={{
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 1
                                        }
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </Paper>

                <Fade in={hasSelectedExercises}>
                    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Selected Exercises for {workoutPlan.days?.[currentDayIndex]?.title}
                        </Typography>
                        <Box>
                            {currentDayExercises.map((exercise, index) => {
                                const exerciseDetails = exercises?.find(e => e.id === exercise.id)

                                return (
                                    <Box key={exercise.id}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                p: 2,
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                    borderRadius: 1
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {index + 1}.
                                                </Typography>
                                                <Typography>{exerciseDetails?.title}</Typography>
                                            </Box>
                                            <Tooltip title="Remove exercise" arrow>
                                                <IconButton
                                                    onClick={() => handleExerciseRemove(exercise.id)}
                                                    size="small"
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        {index < currentDayExercises.length - 1 && (
                                            <Divider />
                                        )}
                                    </Box>
                                )
                            })}
                        </Box>
                    </Paper>
                </Fade>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setCurrentStep('days')}
                        size="large"
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setCurrentStep('review')}
                        size="large"
                        disabled={!hasSelectedExercises}
                    >
                        Review Plan
                    </Button>
                </Box>
            </Box>
        </LoadingErrorWrapper>
    )
}