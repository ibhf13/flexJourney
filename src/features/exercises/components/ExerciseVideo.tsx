import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Alert,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { YoutubePlayer } from '@/components/common/VideoPlayer/YoutubePlayer';

interface ExerciseVideoProps {
    videoUrl: string;
    title?: string;
}

export const ExerciseVideo: React.FC<ExerciseVideoProps> = ({
    videoUrl,
    title = 'Exercise Video'
}) => {
    const [error, setError] = useState<string | null>(null);

    const handleVideoReady = () => {
        setError(null);
    };

    const handleError = (error: Error) => {
        setError('Failed to load video. Please check your internet connection and try again.');
        console.error('Video player error:', error);
    };

    return (
        <Accordion defaultExpanded={false}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label={`${title} accordion`}
            >
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        overflow: 'hidden'
                    }}
                >
                    {error ? (
                        <Alert
                            severity="error"
                            sx={{ m: 2 }}
                            action={
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={() => window.location.reload()}
                                >
                                    Retry
                                </Button>
                            }
                        >
                            {error}
                        </Alert>
                    ) : (
                        <YoutubePlayer
                            videoUrl={videoUrl}
                            onReady={handleVideoReady}
                            onError={handleError}
                        />
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};