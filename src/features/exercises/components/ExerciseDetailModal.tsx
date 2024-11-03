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

interface ExerciseDetailModalProps {
    exercise: Exercise;
    open: boolean;
    onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
    exercise,
    open,
    onClose,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [hasChanges, setHasChanges] = useState(false);
    const { handleExerciseComplete } = useExerciseCompletion();
    const { showNotification } = useNotification();

    const { handleCloseWithConfirmation } = useUnsavedChanges({
        hasChanges,
        setHasChanges,
        onClose,
    });

    const handleFormSubmit = async (data: ExerciseFormData) => {
        try {
            const result = await handleExerciseComplete(exercise, data);
            if (result) {
                setHasChanges(false);
                onClose();
                showNotification({
                    message: 'Exercise completed successfully!',
                    severity: 'success'
                });
            }
        } catch (error) {
            console.error('Error completing exercise:', error);
            showNotification({
                message: 'An error occurred while saving',
                severity: 'error'
            });
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