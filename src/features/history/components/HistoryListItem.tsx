import { ConfirmationDialog } from '@/components/common/dialogs/ConfirmationDialog'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    IconButton,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useHistory } from '../hooks/useHistory'
import { TrainingHistoryEntry } from '../types/HistoryTypes'
import { EditHistoryDialog } from './EditHistoryDialog'

interface EnhancedHistoryListItemProps {
    entry: TrainingHistoryEntry
}

export const HistoryListItem = ({ entry }: EnhancedHistoryListItemProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const { deleteEntry, updateEntry } = useHistory()

    const totalSets = entry.exercises.reduce(
        (sum, exercise) => sum + exercise.sets.length,
        0
    )

    const handleDelete = () => {
        deleteEntry(entry.id)
        setIsDeleteDialogOpen(false)
    }

    const handleEdit = (updates: Partial<TrainingHistoryEntry>) => {
        updateEntry(entry.id, updates)
        setIsEditDialogOpen(false)
    }

    return (
        <>
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
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Box display="flex" alignItems="center" gap={2}>
                            <FitnessCenterIcon color="primary" />
                            <Typography variant="subtitle1">{entry.planName}</Typography>
                            <Chip
                                label={`${entry.exercises.length} exercises • ${totalSets} sets`}
                                size="small"
                                color="secondary"
                            />
                        </Box>
                        <Box>
                            <IconButton size="small" onClick={(e) => {
                                e.stopPropagation()
                                setIsEditDialogOpen(true)
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" onClick={(e) => {
                                e.stopPropagation()
                                setIsDeleteDialogOpen(true)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
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

            <EditHistoryDialog
                entry={entry}
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleEdit}
            />

            <ConfirmationDialog
                open={isDeleteDialogOpen}
                title="Delete Entry"
                message="Are you sure you want to delete this training entry? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteDialogOpen(false)}
            />
        </>
    )
}