import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'

const AVAILABLE_DAYS = [1, 2, 3, 4, 5, 6, 7]

export const TrainingDaysStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const [errors, setErrors] = useState<string[]>([])

    const handleDaysChange = (numberOfDays: number) => {
        const newDays = Array.from({ length: numberOfDays }, (_, index) => ({
            id: workoutPlan.days?.[index]?.id || uuidv4(),
            title: workoutPlan.days?.[index]?.title || `Day ${index + 1}`,
            description: '',
            imageUrl: '',
            level: workoutPlan.level || 'Beginner',
            exercises: workoutPlan.days?.[index]?.exercises || []
        }))

        updateWorkoutPlan({ days: newDays })
    }

    const handleDayNameChange = (index: number, newTitle: string) => {
        if (!workoutPlan.days) return

        const newDays = [...workoutPlan.days]

        newDays[index] = {
            ...newDays[index],
            title: newTitle
        }
        updateWorkoutPlan({ days: newDays })
    }

    const validateAndContinue = () => {
        const newErrors: string[] = []

        if (!workoutPlan.days?.length) {
            newErrors.push('Please select number of training days')
        }

        const dayTitles = workoutPlan.days?.map(day => day.title) || []
        const hasDuplicates = dayTitles.length !== new Set(dayTitles).size

        if (hasDuplicates) {
            newErrors.push('Each training day must have a unique title')
        }

        if (newErrors.length > 0) {
            setErrors(newErrors)

            return
        }

        setCurrentStep('exercises')
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <CalendarMonthIcon
                    sx={{
                        fontSize: 48,
                        color: 'primary.main',
                        mb: 2
                    }}
                />
                <Typography variant="h5" gutterBottom>
                    Schedule Your Training Days
                </Typography>
                <Typography color="text.secondary">
                    Select how many days you want to train and customize their names
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 3
                }}
            >
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Number of Training Days</InputLabel>
                    <Select
                        value={workoutPlan.days?.length || ''}
                        onChange={(e) => handleDaysChange(Number(e.target.value))}
                        label="Number of Training Days"
                    >
                        {AVAILABLE_DAYS.map((day) => (
                            <MenuItem key={day} value={day}>
                                {day} {day === 1 ? 'Day' : 'Days'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {workoutPlan.days && workoutPlan.days.length > 0 && (
                    <Stack spacing={2}>
                        {workoutPlan.days.map((day, index) => (
                            <Box
                                key={day.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}
                            >
                                <Typography
                                    sx={{
                                        minWidth: 80,
                                        color: 'text.secondary'
                                    }}
                                >
                                    Day {index + 1}
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={day.title}
                                    onChange={(e) => handleDayNameChange(index, e.target.value)}
                                    placeholder={`Enter name for Day ${index + 1}`}
                                />
                            </Box>
                        ))}
                    </Stack>
                )}
            </Paper>

            {errors.length > 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'error.light',
                        borderRadius: 2,
                        bgcolor: 'error.lighter'
                    }}
                >
                    {errors.map((error, index) => (
                        <Typography
                            key={index}
                            color="error"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <span>•</span> {error}
                        </Typography>
                    ))}
                </Paper>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    variant="outlined"
                    onClick={() => setCurrentStep('basics')}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={validateAndContinue}
                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}