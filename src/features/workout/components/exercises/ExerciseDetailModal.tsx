import React, { useState } from 'react';
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
import { ConfirmationDialog } from '@/components/common/dialogs/ConfirmationDialog';
import { useExerciseContext } from '../../contexts/ExerciseContext';

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
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const { toggleExerciseCompletion } = useExerciseContext();

    const handleFormSubmit = (data: ExerciseFormData) => {
        toggleExerciseCompletion(exercise.id);
        setHasChanges(false);
        onClose();
    };

    const handleCancel = () => {
        if (hasChanges) {
            setShowConfirmation(true);
        } else {
            onClose();
        }
    };

    const handleConfirmClose = () => {
        setShowConfirmation(false);
        setHasChanges(false);
        onClose();
    };

    const handleCancelClose = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCancel}
                maxWidth="lg"
                fullWidth
                fullScreen={isMobile}
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{exercise.title}</Typography>
                        <IconButton onClick={handleCancel} size="small">
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
                                    onCancel={handleCancel}
                                    onChange={() => setHasChanges(true)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <ConfirmationDialog
                open={showConfirmation}
                title="Discard Changes?"
                message="You have unsaved changes. Are you sure you want to close without saving?"
                onConfirm={handleConfirmClose}
                onCancel={handleCancelClose}
            />
        </>
    );
};