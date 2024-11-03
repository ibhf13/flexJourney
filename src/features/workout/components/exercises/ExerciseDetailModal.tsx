import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Exercise } from '../../types/WorkoutTypes';
import { ExerciseForm } from './forms/ExerciseForm';
import { ExerciseFormData } from '../../types/ExerciseTypes';
import { YoutubePlayer } from '@/components/common/VideoPlayer/YoutubePlayer';
import { MediaWithSkeleton } from '../common/MediaWithSkeleton';
import { useExerciseCompletion } from '../../hooks/useExerciseCompletion';
import { useNotification } from '@/features/Feedback';

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

    const handleChange = () => {
        setHasChanges(true);
    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);

    const handleCloseWithConfirmation = () => {
        if (hasChanges) {
            if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                setHasChanges(false);
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCloseWithConfirmation}
                maxWidth="lg"
                fullWidth
                fullScreen={isMobile}
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{exercise.title}</Typography>
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box mb={3}>
                                <MediaWithSkeleton
                                    height={300}
                                    imageUrl={exercise.imageUrl}
                                    mediaStyles={{
                                        borderRadius: theme.shape.borderRadius,
                                        boxShadow: theme.shadows[4],
                                    }}
                                />
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {exercise.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">Exercise Video</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <YoutubePlayer videoUrl={exercise.videoUrl} />
                                </AccordionDetails>
                            </Accordion>

                            <Box mt={3}>
                                <ExerciseForm
                                    exerciseType={exercise.type as any}
                                    defaultRestPeriod={exercise.defaultRestPeriod}
                                    onSubmit={handleFormSubmit}
                                    onCancel={onClose}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};