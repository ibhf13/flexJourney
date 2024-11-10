import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const TrainingDaysStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const [selectedDays, setSelectedDays] = useState<boolean[]>(
        DAYS_OF_WEEK.map((_, index) => workoutPlan.days?.some(day => day.title.includes(`Day ${index + 1}`)) || false)
    )
    const [errors, setErrors] = useState<string[]>([])

    const handleDayToggle = (index: number) => {
        const newSelectedDays = [...selectedDays]

        newSelectedDays[index] = !newSelectedDays[index]
        setSelectedDays(newSelectedDays)

        const newDays = newSelectedDays
            .map((isSelected, idx) => {
                if (!isSelected) return null
                const existingDay = workoutPlan.days?.find(day => day.title.includes(`Day ${idx + 1}`))

                if (existingDay) return existingDay

                return {
                    id: uuidv4(),
                    title: `Day ${idx + 1}`,
                    description: '',
                    imageUrl: '',
                    level: workoutPlan.level || 'Beginner',
                    exercises: []
                }
            })
            .filter((day): day is NonNullable<typeof day> => day !== null)

        updateWorkoutPlan({ days: newDays })
    }

    const handleDayNameChange = (index: number, newTitle: string) => {
        const newDays = [...(workoutPlan.days || [])]

        newDays[index] = {
            ...newDays[index],
            title: newTitle
        }
        updateWorkoutPlan({ days: newDays })
    }

    const validateAndContinue = () => {
        const newErrors: string[] = []
        const selectedCount = selectedDays.filter(Boolean).length

        if (selectedCount === 0) {
            newErrors.push('Please select at least one training day')
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
            <Typography variant="h6" gutterBottom>
                Select Training Days
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
                {DAYS_OF_WEEK.map((day, index) => (
                    <FormControlLabel
                        key={day}
                        control={
                            <Checkbox
                                checked={selectedDays[index]}
                                onChange={() => handleDayToggle(index)}
                            />
                        }
                        label={day}
                    />
                ))}
            </Stack>

            {workoutPlan.days && workoutPlan.days.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Customize Day Titles
                    </Typography>
                    <Stack spacing={2}>
                        {workoutPlan.days.map((day, index) => (
                            <Box key={day.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label={`Day ${index + 1} Title`}
                                    value={day.title}
                                    onChange={(e) => handleDayNameChange(index, e.target.value)}
                                    size="small"
                                />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}

            {errors.map((error, index) => (
                <Typography key={index} color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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