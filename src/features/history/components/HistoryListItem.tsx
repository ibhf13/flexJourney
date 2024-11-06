import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    ListItem,
    Typography
} from '@mui/material'
import { format } from 'date-fns'
import { TrainingHistoryEntry } from '../types/HistoryTypes'

interface HistoryListItemProps {
    entry: TrainingHistoryEntry
}

export const HistoryListItem = ({ entry }: HistoryListItemProps) => {
    return (
        <ListItem>
            <Accordion sx={{ width: '100%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                        {format(new Date(entry.date), 'PPP')} - {entry.planName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        Day: {entry.dayName}
                    </Typography>
                    {entry.exercises.map((exercise) => (
                        <Box key={exercise.exerciseId} mt={1}>
                            <Typography variant="body1">{exercise.exerciseName}</Typography>
                            {exercise.sets.map((set, index) => (
                                <Typography key={index} variant="body2" color="textSecondary">
                                    Set {index + 1}: {set.weight}kg x {set.reps} reps
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </ListItem>
    )
}