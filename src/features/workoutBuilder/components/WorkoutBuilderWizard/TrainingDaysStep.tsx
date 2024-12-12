import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, useTheme } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { AVAILABLE_DAYS } from '../../constants/WorkoutBuilderConstants'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'
import { TrainingDaysFormData, trainingDaysSchema } from '../../schemas/workoutBuilderSchemas'
import { trainingDaysStyles } from './styles/trainingDaysStyles'

export const TrainingDaysStep = () => {
    const theme = useTheme()
    const styles = trainingDaysStyles(theme)
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()

    const { control, handleSubmit, formState: { errors } } = useForm<TrainingDaysFormData>({
        resolver: zodResolver(trainingDaysSchema),
        defaultValues: {
            days: workoutPlan.days || []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'days'
    })

    const handleDaysChange = (numberOfDays: number) => {
        const currentLength = fields.length

        if (numberOfDays > currentLength) {
            for (let i = currentLength; i < numberOfDays; i++) {
                append({ title: `Day ${i + 1}` })
            }
        } else {
            for (let i = currentLength - 1; i >= numberOfDays; i--) {
                remove(i)
            }
        }
    }

    const onSubmit = (data: TrainingDaysFormData) => {
        const completeWorkoutDays: WorkoutDay[] = data.days.map((day) => ({
            id: crypto.randomUUID(),
            title: day.title,
            description: '',
            imageUrl: '',
            level: workoutPlan.level,
            exercises: []
        }))

        updateWorkoutPlan({ days: completeWorkoutDays })
        setCurrentStep('exercises')
    }

    return (
        <Box sx={styles.container}>
            <Paper
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                elevation={0}
                sx={styles.paper}
            >
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Number of Training Days</InputLabel>
                    <Select
                        value={fields.length}
                        onChange={(e) => handleDaysChange(Number(e.target.value))}
                        label="Number of Training Days"
                        sx={styles.select}
                    >
                        {AVAILABLE_DAYS.map((day) => (
                            <MenuItem key={day} value={day}>
                                {day} {day === 1 ? 'Day' : 'Days'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Stack spacing={2} sx={styles.scrollableStack}>
                    {fields.map((field, index) => (
                        <Controller
                            key={field.id}
                            name={`days.${index}.title`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={`Day ${index + 1}`}
                                    error={!!errors.days?.[index]?.title}
                                    helperText={errors.days?.[index]?.title?.message}
                                    sx={styles.dayInput}
                                />
                            )}
                        />
                    ))}
                </Stack>

                <Box sx={styles.buttonContainer}>
                    <Button
                        variant="outlined"
                        onClick={() => setCurrentStep('basics')}
                        sx={styles.backButton}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={styles.continueButton}
                    >
                        Continue
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
