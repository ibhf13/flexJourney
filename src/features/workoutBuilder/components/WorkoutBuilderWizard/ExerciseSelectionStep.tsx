import { LoadingErrorWrapper } from '@/components/common/Error/LoadingErrorWrapper'
import { useExercises } from '@/features/exercises/hooks/useExercises'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Chip, IconButton, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'

export const ExerciseSelectionStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const { exercises, isLoading, error } = useExercises()
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

    const filteredExercises = exercises.filter(exercise =>
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const currentDayExercises = workoutPlan.days?.[currentDayIndex]?.exercises || []

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                <Tabs
                    value={currentDayIndex}
                    onChange={(_, newValue) => setCurrentDayIndex(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 3 }}
                >
                    {workoutPlan.days?.map((day, index) => (
                        <Tab key={day.id} label={day.title} value={index} />
                    ))}
                </Tabs>

                <TextField
                    fullWidth
                    label="Search Exercises"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                    {filteredExercises.map(exercise => (
                        <Chip
                            key={exercise.id}
                            label={exercise.title}
                            onClick={() => handleExerciseAdd(exercise)}
                            clickable
                            color={currentDayExercises.some(e => e.id === exercise.id) ? 'primary' : 'default'}
                        />
                    ))}
                </Box>

                <Typography variant="h6" gutterBottom>
                    Selected Exercises for {workoutPlan.days?.[currentDayIndex]?.title}
                </Typography>

                <Box sx={{ mb: 4 }}>
                    {currentDayExercises.map((exercise) => {
                        const exerciseDetails = exercises.find(e => e.id === exercise.id)

                        return (
                            <Box
                                key={exercise.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    mb: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1
                                }}
                            >
                                <Typography>{exerciseDetails?.title}</Typography>
                                <IconButton
                                    onClick={() => handleExerciseRemove(exercise.id)}
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )
                    })}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        onClick={() => setCurrentStep('days')}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setCurrentStep('review')}
                    >
                        Review Plan
                    </Button>
                </Box>
            </Box>
        </LoadingErrorWrapper>
    )
}