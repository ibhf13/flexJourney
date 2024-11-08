import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Typography
} from '@mui/material'
import { TrainingHistoryEntry } from '../types/HistoryTypes'

interface EnhancedHistoryListItemProps {
    entry: TrainingHistoryEntry
}

export const HistoryListItem = ({ entry }: EnhancedHistoryListItemProps) => {
    const totalSets = entry.exercises.reduce(
        (sum, exercise) => sum + exercise.sets.length,
        0
    )

    return (
        <Accordion
            sx={{
                mb: 2,
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <FitnessCenterIcon color="primary" />
                    <Typography variant="subtitle1">{entry.planName}</Typography>
                    <Chip
                        label={`${entry.exercises.length} exercises • ${totalSets} sets`}
                        size="small"
                        color="secondary"
                    />
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                {entry.exercises.map((exercise) => (
                    <Box key={exercise.exerciseId} mb={2}>
                        <Typography variant="subtitle2" color="primary">
                            {exercise.exerciseName}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                            {exercise.sets.map((set, index) => (
                                <Chip
                                    key={index}
                                    label={`Set ${index + 1}: ${set.weight}${set.unit} × ${set.reps}`}
                                    variant="outlined"
                                    size="small"
                                />
                            ))}
                        </Box>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}