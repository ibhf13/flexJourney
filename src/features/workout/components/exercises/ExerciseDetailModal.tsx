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
    Fade,
    Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { YoutubePlayer } from '@/components/common/VideoPlayer/YoutubePlayer';
import { Exercise } from '../../types/WorkoutTypes';
import { ConfirmationDialog } from '@/components/common/dialogs/ConfirmationDialog';
import { MediaWithSkeleton } from '../common/MediaWithSkeleton';

export interface ExerciseDetailModalProps {
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

    const handleClose = () => {
        setShowConfirmation(true);
    };

    const handleConfirmClose = () => {
        setShowConfirmation(false);
        onClose();
    };

    const handleCancelClose = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleConfirmClose}
                maxWidth="lg"
                fullWidth
                fullScreen={isMobile}
                TransitionComponent={isMobile ? Slide : Fade}
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="h2">
                            {exercise.title}
                        </Typography>
                        <IconButton
                            onClick={handleConfirmClose}
                            aria-label="close"
                            sx={{
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'rotate(90deg)',
                                },
                            }}
                        >
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
                            <Box
                                mt={2}
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexWrap: 'wrap'
                                }}
                            >
                                <Typography variant="subtitle1" color="primary">
                                    Level: {exercise.level}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Category: {exercise.category}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Rest Period: {exercise.defaultRestPeriod}s
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Accordion
                                defaultExpanded
                                sx={{
                                    backgroundColor: 'background.paper',
                                    boxShadow: theme.shadows[2],
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="video-content"
                                    id="video-header"
                                >
                                    <Typography variant="h6">Instruction Video</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ width: '100%', position: 'relative' }}>
                                        <YoutubePlayer videoUrl={exercise.videoUrl} />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            {/* <ConfirmationDialog
                open={showConfirmation}
                title="Close Exercise Details"
                message="Are you sure you want to close this exercise? Any unsaved progress will be lost."
                onConfirm={handleConfirmClose}
                onCancel={handleCancelClose}
            /> */}
        </>
    );
};