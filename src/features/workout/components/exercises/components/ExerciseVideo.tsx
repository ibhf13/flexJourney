import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { YoutubePlayer } from '@/components/common/VideoPlayer/YoutubePlayer';

interface ExerciseVideoProps {
    videoUrl: string;
}

export const ExerciseVideo: React.FC<ExerciseVideoProps> = ({ videoUrl }) => (
    <Accordion expanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Exercise Video</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <YoutubePlayer videoUrl={videoUrl} />
        </AccordionDetails>
    </Accordion>
);