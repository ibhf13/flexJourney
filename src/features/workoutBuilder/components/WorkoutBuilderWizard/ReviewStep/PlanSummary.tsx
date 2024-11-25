import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { Box, Chip, Paper, Stack, Typography, useTheme } from '@mui/material'
import { WorkoutPlan } from '../../../types/workoutBuilderTypes'
import { reviewStepStyles } from '../styles/reviewStepStyles'


interface PlanSummaryProps {
    workoutPlan: Partial<WorkoutPlan>
    exercises?: Exercise[]
}

export const PlanSummary = ({ workoutPlan, exercises }: PlanSummaryProps) => {
    const theme = useTheme()
    const styles = reviewStepStyles(theme)
    const totalExercises = workoutPlan.days?.reduce((sum, day) =>
        sum + day.exercises.length, 0) || 0

    return (
        <Paper elevation={0} sx={styles.paper}>
            <Typography variant="h6" gutterBottom color="primary.main">
                {workoutPlan.title}
            </Typography>
            <Stack direction="row" spacing={1} mb={3}>
                <Chip
                    label={`${workoutPlan.days?.length || 0} Days`}
                    color="primary"
                    variant="outlined"
                />
                <Chip
                    label={`${totalExercises} Exercises`}
                    color="primary"
                    variant="outlined"
                />
            </Stack>
            <Stack spacing={2}>
                {workoutPlan.days?.map((day) => (
                    <Paper key={day.id} variant="outlined" sx={styles.paper}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {day.title}
                        </Typography>
                        <Stack spacing={1}>
                            {day.exercises.map((exercise) => {
                                const exerciseDetails = exercises?.find(e => e.id === exercise.id)

                                return (
                                    <Box key={exercise.id} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.secondary'
                                    }}>
                                        <span>•</span>
                                        {exerciseDetails?.title}
                                    </Box>
                                )
                            })}
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Paper>
    )
}