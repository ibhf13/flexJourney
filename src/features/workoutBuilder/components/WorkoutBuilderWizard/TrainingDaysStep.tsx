import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography, useTheme } from '@mui/material'
import { useTrainingDaysStep } from '../../hooks/useTrainingDaysStep'
import { DayCard } from './DayCard'
import { trainingDaysStyles } from './styles/trainingDaysStyles'

const AVAILABLE_DAYS = [1, 2, 3, 4, 5, 6, 7]

export const TrainingDaysStep = () => {
    const theme = useTheme()
    const styles = trainingDaysStyles(theme)
    const {
        workoutPlan,
        errors,
        handleDaysChange,
        handleDayTitleChange,
        handleContinue,
        setCurrentStep
    } = useTrainingDaysStep()

    return (
        <Box sx={styles.container}>
            <Paper elevation={0} sx={styles.paper}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Number of Training Days</InputLabel>
                    <Select
                        value={workoutPlan.days?.length || ''}
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

                {workoutPlan.days && workoutPlan.days.length > 0 && (
                    <Stack spacing={2} sx={styles.scrollableStack}>
                        {workoutPlan.days.map((day, index) => (
                            <Paper key={day.id} elevation={0} sx={styles.dayCard}>
                                <DayCard
                                    day={day}
                                    index={index}
                                    onTitleChange={(title) => handleDayTitleChange(index, title)}
                                />
                            </Paper>
                        ))}
                    </Stack>
                )}

                {errors.length > 0 && (
                    <Paper elevation={0} sx={styles.errorPaper}>
                        {errors.map((error, index) => (
                            <Typography key={index} color="error" sx={styles.errorText}>
                                <span>•</span> {error}
                            </Typography>
                        ))}
                    </Paper>
                )}

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
                        onClick={handleContinue}
                        sx={styles.continueButton}
                    >
                        Continue
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
