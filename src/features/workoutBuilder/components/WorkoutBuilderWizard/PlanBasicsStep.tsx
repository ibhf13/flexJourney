import {
    alpha,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'


interface FormErrors {
    title?: string
    description?: string
    level?: string
}

export const PlanBasicsStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: FormErrors = {}

        if (!workoutPlan.title?.trim()) {
            newErrors.title = 'Please enter a plan name'
        }

        if (!workoutPlan.description?.trim()) {
            newErrors.description = 'Please enter a plan description'
        }

        if (!workoutPlan.level) {
            newErrors.level = 'Please select difficulty level'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)

            return
        }

        setCurrentStep('days')
    }

    const handleFieldChange = (field: keyof typeof workoutPlan) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        setErrors(prev => ({ ...prev, [field]: '' }))
        setTouched(prev => ({ ...prev, [field]: true }))
        updateWorkoutPlan({ [field]: e.target.value })
    }

    return (
        <Box sx={{
            maxWidth: 600,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
        }}>
            <Box sx={{ textAlign: 'center' }}>

                <Typography variant="h5" gutterBottom>
                    Let's Create Your Perfect Workout Plan
                </Typography>
                <Typography color="text.secondary">
                    Start by giving your workout plan a meaningful name and details that reflect your goals
                </Typography>
            </Box>

            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={0}
                sx={{
                    p: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    bgcolor: 'background.paper'
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Plan Name"
                        placeholder="e.g., Summer Strength Training 2024"
                        value={workoutPlan.title || ''}
                        onChange={handleFieldChange('title')}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        InputProps={{
                            sx: {
                                borderRadius: 2,
                                '&.Mui-focused': {
                                    boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                                }
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        placeholder="Describe your workout plan goals and focus areas"
                        value={workoutPlan.description || ''}
                        onChange={handleFieldChange('description')}
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        InputProps={{
                            sx: {
                                borderRadius: 2,
                                '&.Mui-focused': {
                                    boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                                }
                            }
                        }}
                    />

                    <FormControl fullWidth error={touched.level && !!errors.level}>
                        <InputLabel>Difficulty Level</InputLabel>
                        <Select
                            value={workoutPlan.level || ''}
                            onChange={handleFieldChange('level')}
                            label="Difficulty Level"
                            sx={{
                                borderRadius: 2,
                                '&.Mui-focused': {
                                    boxShadow: theme => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                                }
                            }}
                        >
                            <MenuItem value="Beginner">
                                <Box sx={{ py: 1 }}>
                                    <Typography variant="subtitle1">Beginner</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Perfect for those just starting their fitness journey
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem value="Intermediate">
                                <Box sx={{ py: 1 }}>
                                    <Typography variant="subtitle1">Intermediate</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        For those with some training experience
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem value="Advanced">
                                <Box sx={{ py: 1 }}>
                                    <Typography variant="subtitle1">Advanced</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Challenging workouts for experienced athletes
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </Select>
                        {touched.level && errors.level && (
                            <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                                {errors.level}
                            </Typography>
                        )}
                    </FormControl>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 4
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        sx={{
                            minWidth: 180,
                            height: 48,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Continue to Next Step
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}