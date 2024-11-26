import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, useTheme } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { DIFFICULTY_LEVELS } from '../../constants/WorkoutBuilderConstants'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'
import { PlanBasicsFormData, planBasicsSchema } from '../../schemas/workoutBuilderSchemas'
import { planBasicsStyles } from './styles/planBasicsStyles'


export const PlanBasicsStep = () => {
    const theme = useTheme()
    const styles = planBasicsStyles(theme)
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()

    const { control, handleSubmit, formState: { errors } } = useForm<PlanBasicsFormData>({
        resolver: zodResolver(planBasicsSchema),
        defaultValues: {
            title: workoutPlan.title || '',
            description: workoutPlan.description || '',
            level: workoutPlan.level || undefined
        }
    })

    const onSubmit = (data: PlanBasicsFormData) => {
        updateWorkoutPlan(data)
        setCurrentStep('days')
    }

    return (
        <Box sx={styles.container}>
            <Paper
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                elevation={0}
                sx={styles.formContainer}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Plan Name"
                                placeholder="e.g., Summer Strength Training 2024"
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                InputProps={{ sx: styles.inputField }}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                rows={3}
                                label="Description"
                                placeholder="What are your goals for this workout plan?"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                InputProps={{ sx: styles.inputField }}
                            />
                        )}
                    />

                    <Controller
                        name="level"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.level}>
                                <InputLabel>Difficulty Level</InputLabel>
                                <Select
                                    {...field}
                                    label="Difficulty Level"
                                    sx={styles.inputField}
                                >
                                    {DIFFICULTY_LEVELS.map(level => (
                                        <MenuItem key={level.value} value={level.value}>
                                            <Box sx={{ py: 1 }}>
                                                <Typography variant="subtitle1">
                                                    {level.value}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {level.desc}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        sx={styles.submitButton}
                    >
                        Continue to Next Step
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}