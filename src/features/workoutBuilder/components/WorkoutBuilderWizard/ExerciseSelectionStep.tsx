import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Chip, Fade, InputAdornment, Paper, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material'
import { useExerciseSelectionForm } from '../../hooks/useExerciseSelectionForm'
import { ExerciseChip } from './ExerciseChip'
import { SelectedExerciseItem } from './SelectedExerciseItem'
import { exerciseSelectionStyles } from './styles/exerciseSelectionStyles'

export const ExerciseSelectionStep = () => {
    const theme = useTheme()
    const styles = exerciseSelectionStyles(theme)
    const {
        currentDayIndex,
        searchQuery,
        workoutPlan,
        filteredExercises,
        currentDayExercises,
        handleExerciseAdd,
        handleExerciseRemove,
        handleSearchChange,
        handleDayChange,
        navigateBack,
        handleSubmit,
        onSubmit,
        errors
    } = useExerciseSelectionForm()

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={styles.container}
        >
            <Paper elevation={0} sx={styles.tabsContainer}>
                <Tabs
                    value={currentDayIndex}
                    onChange={(_, value) => handleDayChange(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={styles.tabs}
                >
                    {workoutPlan.days?.map((day, index) => (
                        <Tab
                            key={day.id}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <span>{day.title}</span>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {day.exercises.length > 0 && (
                                            <Chip
                                                size="small"
                                                label={day.exercises.length}
                                                color="primary"
                                                sx={styles.exerciseCountChip}
                                            />
                                        )}
                                        {errors.days?.[index]?.exercises && (
                                            <ErrorOutlineIcon
                                                color="error"
                                                sx={{ fontSize: 16 }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            }
                            value={index}
                        />
                    ))}
                </Tabs>
            </Paper>

            <TextField
                fullWidth
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    )
                }}
                sx={styles.searchField}
            />

            <Box sx={styles.exercisesContainer}>
                <Paper elevation={0} sx={styles.exerciseList}>
                    <Typography variant="h6" gutterBottom sx={styles.sectionTitle}>
                        <FitnessCenterIcon />
                        Available Exercises
                    </Typography>
                    <Box sx={styles.scrollableContent}>
                        {filteredExercises?.map(exercise => (
                            <ExerciseChip
                                key={exercise.id}
                                exercise={exercise}
                                isSelected={currentDayExercises.some(e => e.id === exercise.id)}
                                onSelect={handleExerciseAdd}
                            />
                        ))}
                    </Box>
                </Paper>

                <Fade in={currentDayExercises.length > 0}>
                    <Paper elevation={0} sx={styles.exerciseList}>
                        <Typography variant="h6" gutterBottom>
                            Selected Exercises for {workoutPlan.days?.[currentDayIndex]?.title}
                        </Typography>
                        {errors.days?.[currentDayIndex]?.exercises && (
                            <Typography color="error" variant="caption" sx={{ mb: 2, display: 'block' }}>
                                {errors.days[currentDayIndex]?.exercises?.message}
                            </Typography>
                        )}
                        <Box sx={styles.scrollableContent}>
                            {currentDayExercises.map((exercise, index) => (
                                <SelectedExerciseItem
                                    key={exercise.id}
                                    exercise={exercise}
                                    index={index}
                                    onRemove={handleExerciseRemove}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Fade>
            </Box>

            <Box sx={styles.navigationButtons}>
                <Button
                    variant="outlined"
                    onClick={navigateBack}
                    sx={{
                        borderRadius: 2,
                        borderColor: theme.palette.primary.main,
                        '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: `${theme.palette.primary.main}10`
                        }
                    }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={!currentDayExercises.length}
                    sx={{
                        borderRadius: 2,
                        background: `linear-gradient(135deg,
                            ${theme.palette.primary.main},
                            ${theme.palette.primary.dark})`,
                        '&:hover': {
                            background: `linear-gradient(135deg,
                                ${theme.palette.primary.dark},
                                ${theme.palette.primary.main})`
                        }
                    }}
                >
                    Review Plan
                </Button>
            </Box>
        </Box>
    )
}