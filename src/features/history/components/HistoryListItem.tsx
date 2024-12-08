import { ConfirmationPopUp } from '@/components/common/Popups/ConfirmationPopUp'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { Box, Chip, Collapse, IconButton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useHistory } from '../hooks/useHistory'
import { TrainingHistoryEntry } from '../types/HistoryTypes'
import { EditHistoryDialog } from './EditHistoryDialog'

interface HistoryListItemProps {
    entry: TrainingHistoryEntry
}

export const HistoryListItem = ({ entry }: HistoryListItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const { deleteEntry, updateEntry } = useHistory()

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const success = await deleteEntry(entry._documentId ?? '')

            if (success) {
                setIsDeleteDialogOpen(false)
            }
        } catch (error) {
            console.error('Failed to delete entry:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEdit = (updates: Partial<TrainingHistoryEntry>) => {
        updateEntry(updates, entry.id)
        setIsEditDialogOpen(false)
    }

    return (
        <Box
            component={motion.div}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: { xs: 2, sm: 3 },
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.divider, 0.1),
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
                }
            }}
        >
            {/* Header Section */}
            <Box
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                    p: { xs: 1.5, sm: 2 },
                    cursor: 'pointer',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {/* Title and Actions Row */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ minWidth: 0 }} // Allows text truncation
                    >
                        <FitnessCenterIcon
                            color="primary"
                            sx={{ fontSize: { xs: 18, sm: 20 } }}
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                color: 'text.primary',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {entry.planName}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                    >
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsEditDialogOpen(true)
                            }}
                            sx={{
                                color: 'primary.main',
                                p: '4px',
                            }}
                        >
                            <EditIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsDeleteDialogOpen(true)
                            }}
                            sx={{
                                color: 'error.main',
                                p: '4px',
                            }}
                        >
                            <DeleteIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{
                                p: '4px',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <ExpandMoreIcon sx={{ fontSize: '1.25rem' }} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>

            <Collapse in={isExpanded}>
                <Box
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                        pt: 0,
                    }}
                >
                    <Stack spacing={1.5}>
                        {entry.exercises.map((exercise, index) => (
                            <Box
                                key={`${exercise.exerciseId}-${index}`}
                                component={motion.div}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'primary.main',
                                        mb: 1,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {exercise.exerciseName}
                                </Typography>

                                <Stack
                                    direction="row"
                                    sx={{
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}
                                >
                                    {exercise.sets.map((set, setIndex) => (
                                        <Chip
                                            key={setIndex}
                                            label={`${set.weight}${set.unit} × ${set.reps}`}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                height: '22px',
                                                borderRadius: '11px',
                                                borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                                                '& .MuiChip-label': {
                                                    px: 1,
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Collapse>

            <EditHistoryDialog
                entry={entry}
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleEdit}
            />

            <ConfirmationPopUp
                open={isDeleteDialogOpen}
                title="Delete Workout Entry"
                message="Are you sure you want to delete this workout entry? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteDialogOpen(false)}
                buttonText="Delete"
            />
        </Box>
    )
}