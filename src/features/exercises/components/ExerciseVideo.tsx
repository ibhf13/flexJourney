import { YoutubePlayer } from '@/components/common/VideoPlayer/YoutubePlayer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

interface ExerciseVideoProps {
    videoUrl: string;
    title: string;
}

export const ExerciseVideo: React.FC<ExerciseVideoProps> = ({ videoUrl, title }) => {
    const [error, setError] = useState<string | null>(null);

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
                <Typography variant="h6">{title ?? "Exercise Video"}</Typography>
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
                            onError={handleError}
                        />
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
};