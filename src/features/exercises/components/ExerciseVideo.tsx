import { YoutubePlayer } from '@/components/common/VideoPlayer/YoutubePlayer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'

interface ExerciseVideoProps {
    videoUrl: string;
    title: string;
}

export const ExerciseVideo: React.FC<ExerciseVideoProps> = ({ videoUrl, title }) => {
    return (
        <Accordion defaultExpanded={false}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label={`${title} accordion`}
            >
                <Typography variant="h6">{title ?? "Exercise Video"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <YoutubePlayer videoUrl={videoUrl} />
            </AccordionDetails>
        </Accordion>
    )
};