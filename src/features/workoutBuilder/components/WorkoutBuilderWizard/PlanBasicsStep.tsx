import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { DIFFICULTY_LEVELS } from '../../constants/WorkoutBuilderConstants'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'
import { planBasicsStyles } from './styles/planBasicsStyles'

interface FormErrors {
    title?: string
    description?: string
    level?: string
}

export const PlanBasicsStep = () => {
    const theme = useTheme()
    const styles = planBasicsStyles(theme)
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const validateForm = () => {
        const newErrors: FormErrors = {}

        if (!workoutPlan.title?.trim()) newErrors.title = 'Please enter a plan name'
        if (!workoutPlan.description?.trim()) newErrors.description = 'Please enter a plan description'
        if (!workoutPlan.level) newErrors.level = 'Please select difficulty level'

        return newErrors
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)

            return
        }

        setCurrentStep('days')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof typeof workoutPlan) => (e: any) => {
        setErrors(prev => ({ ...prev, [field]: '' }))
        setTouched(prev => ({ ...prev, [field]: true }))
        updateWorkoutPlan({ [field]: e.target.value })
    }

    return (
        <Box sx={styles.container}>
            <Paper component="form" onSubmit={handleSubmit} elevation={0} sx={styles.formContainer}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Plan Name"
                        placeholder="e.g., Summer Strength Training 2024"
                        value={workoutPlan.title || ''}
                        onChange={handleFieldChange('title')}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        InputProps={{ sx: styles.inputField }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        placeholder="What are your goals for this workout plan?"
                        value={workoutPlan.description || ''}
                        onChange={handleFieldChange('description')}
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        InputProps={{ sx: styles.inputField }}
                    />

                    <FormControl fullWidth error={touched.level && !!errors.level}>
                        <InputLabel>Difficulty Level</InputLabel>
                        <Select
                            value={workoutPlan.level || ''}
                            onChange={handleFieldChange('level')}
                            label="Difficulty Level"
                            sx={styles.inputField}
                        >
                            {DIFFICULTY_LEVELS.map(level => (
                                <MenuItem key={level.value} value={level.value}>
                                    <Box sx={{ py: 1 }}>
                                        <Typography variant="subtitle1">{level.value}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {level.desc}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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