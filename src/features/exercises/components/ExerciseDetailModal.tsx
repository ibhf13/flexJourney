import { useAuthContext } from '@/contexts/AuthContext'
import { useExerciseCompletion } from '@/features/exercises/hooks/useExerciseCompletion'
import { useUnsavedChanges } from '@/features/exercises/hooks/useUnsavedChanges'
import { Exercise, ExerciseFormData } from '@/features/exercises/types/ExerciseTypes'
import { useNotification } from '@/features/Feedback'
import { historyService } from '@/features/history/services/historyService'
import { TrainingHistoryEntry } from '@/features/history/types/HistoryTypes'
import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext'
import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { Box, Dialog, DialogContent, Grid, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { ExerciseForm } from '../forms/ExerciseForm'
import { ExerciseDetails } from './ExerciseDetails'
import { ExerciseModalHeader } from './ExerciseModalHeader'
import { ExerciseVideo } from './ExerciseVideo'

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
    const { user } = useAuthContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

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

            if (!user) {
                showNotification({
                    message: 'You must be logged in to save progress',
                    severity: 'error'
                })

                return
            }

            if (isSubmitting) return
            setIsSubmitting(true)

            const historyEntry: TrainingHistoryEntry = {
                id: crypto.randomUUID(),
                planId: selectedPlan.id,
                planName: selectedPlan.title,
                dayId: day.id,
                dayName: day.title,
                userId: user.uid,
                date: new Date().toISOString(),
                exercises: [{
                    exerciseId: exercise.id,
                    exerciseName: exercise.title,
                    sets: data.sets.map(set => ({
                        weight: set.weight || 0,
                        reps: set.repetitions || 0,
                        time: set.time || 0,
                        unit: exercise.type === 'cardio' ? 'sec' : 'kg'
                    })),
                    completedAt: new Date().toISOString()
                }]
            }

            await historyService.saveTrainingHistory(user.uid, historyEntry)

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
        } finally {
            setIsSubmitting(false)
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
                        <ExerciseVideo title={exercise.title} videoUrl={exercise.videoUrl} />
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