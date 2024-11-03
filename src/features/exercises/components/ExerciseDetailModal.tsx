import React, { useState } from 'react';
import { Dialog, DialogContent, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import { Exercise } from '@/features/exercises/types/ExerciseTypes';
import { ExerciseForm } from '../forms/ExerciseForm';
import { ExerciseFormData } from '@/features/exercises/types/ExerciseTypes';
import { useExerciseCompletion } from '@/features/exercises/hooks/useExerciseCompletion';
import { useNotification } from '@/features/Feedback';
import { useUnsavedChanges } from '@/features/exercises/hooks/useUnsavedChanges';
import { ExerciseModalHeader } from './ExerciseModalHeader';
import { ExerciseDetails } from './ExerciseDetails';
import { ExerciseVideo } from './ExerciseVideo';
import { useTrainingHistory } from '@/features/workout/hooks/useTrainingHistory'
import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'

interface ExerciseDetailModalProps {
    exercise: Exercise;
    day: WorkoutDay;
    open: boolean;
    onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
    exercise,
    day,
    open,
    onClose,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [hasChanges, setHasChanges] = useState(false);
    const { handleExerciseComplete } = useExerciseCompletion();
    const { showNotification } = useNotification();
    const { selectedPlan } = useWorkoutContext()
    const { saveExerciseLog, isLoading: isSaving } = useTrainingHistory()

    const { handleCloseWithConfirmation } = useUnsavedChanges({
        hasChanges,
        setHasChanges,
        onClose,
    });

    const handleFormSubmit = async (data: ExerciseFormData) => {
        try {
            if (!selectedPlan) {
                showNotification({
                    message: 'No workout plan selected',
                    severity: 'error'
                })
                return
            }

            if (!day) {
                showNotification({
                    message: 'No workout day selected',
                    severity: 'error'
                })
                return
            }

            if (isSaving) return

            await saveExerciseLog(
                selectedPlan.id,
                selectedPlan.title,
                day.id,
                day.title,
                {
                    exerciseId: exercise.id,
                    exerciseName: exercise.title,
                    sets: data.sets.map(set => ({
                        weight: set.weight || 0,
                        reps: set.repetitions || 0,
                        time: set.time || 0,
                        unit: exercise.type === 'cardio' ? 'sec' : 'kg'
                    })),
                    completedAt: new Date().toISOString()
                }
            )

            const completed = handleExerciseComplete(exercise, day, data)

            if (completed) {
                showNotification({
                    message: 'Exercise completed successfully',
                    severity: 'success'
                })
                onClose()
            } else {
                throw new Error('Failed to mark exercise as complete')
            }
        } catch (error) {
            console.error('Error saving exercise:', error)
            showNotification({
                message: 'Failed to save exercise progress',
                severity: 'error'
            })
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseWithConfirmation}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
        >
            <ExerciseModalHeader
                title={exercise.title}
                onClose={handleCloseWithConfirmation}
            />

            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ExerciseDetails
                            imageUrl={exercise.imageUrl}
                            description={exercise.description}
                            level={exercise.level}
                            category={exercise.category}
                            type={exercise.type}
                            defaultRestPeriod={exercise.defaultRestPeriod}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ExerciseVideo videoUrl={exercise.videoUrl} />
                        <Box mt={3}>
                            <ExerciseForm
                                exerciseType={exercise.type}
                                defaultRestPeriod={exercise.defaultRestPeriod}
                                onSubmit={handleFormSubmit}
                                onCancel={onClose}
                                onChange={() => setHasChanges(true)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};