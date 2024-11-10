import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../../contexts/WorkoutBuilderContext'

export const PlanBasicsStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!workoutPlan.title?.trim()) {
            setError('Please enter a plan name')

            return
        }

        setCurrentStep('days')
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Let's start with the basics
            </Typography>

            <TextField
                fullWidth
                label="Plan Name"
                value={workoutPlan.title || ''}
                onChange={(e) => {
                    setError('')
                    updateWorkoutPlan({ title: e.target.value })
                }}
                error={!!error}
                helperText={error}
                sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}