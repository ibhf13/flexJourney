import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TimerIcon from '@mui/icons-material/Timer'
import { Box, Chip, Collapse, IconButton, Paper, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { TrainingHistoryEntry } from '../types/HistoryTypes'
import { HistoryListItem } from './HistoryListItem'

interface DailySummaryProps {
    date: string
    workouts: {
        planName: string
        entry: TrainingHistoryEntry
    }[]
}

export const DailySummary = ({ date, workouts }: DailySummaryProps) => {
    const [isExpanded, setIsExpanded] = useState(true)

    const totalExercises = workouts.reduce(
        (sum, workout) => sum + workout.entry.exercises.length,
        0
    )

    const totalSets = workouts.reduce(
        (sum, workout) => sum + workout.entry.exercises.reduce(
            (setSum, exercise) => setSum + exercise.sets.length,
            0
        ),
        0
    )

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: { xs: 2, sm: 3 },
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
            }}
        >
            <Box
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                    p: { xs: 1.5, sm: 2 },
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                }}
            >
                <Stack spacing={1.5}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                    >
                        <CalendarTodayIcon
                            color="primary"
                            sx={{ fontSize: { xs: 18, sm: 20 } }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                        >
                            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: 'wrap', gap: 1 }}
                        >
                            <Chip
                                icon={<FitnessCenterIcon sx={{ fontSize: '1rem' }} />}
                                label={`${totalExercises} exercises`}
                                color="primary"
                                size="small"
                                sx={{
                                    borderRadius: '12px',
                                    height: '24px',
                                    '& .MuiChip-label': {
                                        px: 1,
                                        fontSize: '0.75rem',
                                    },
                                }}
                            />
                            <Chip
                                icon={<TimerIcon sx={{ fontSize: '1rem' }} />}
                                label={`${totalSets} sets`}
                                color="secondary"
                                size="small"
                                sx={{
                                    borderRadius: '12px',
                                    height: '24px',
                                    '& .MuiChip-label': {
                                        px: 1,
                                        fontSize: '0.75rem',
                                    },
                                }}
                            />
                        </Stack>

                        <IconButton
                            size="small"
                            sx={{
                                p: 0.5,
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <ExpandMoreIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>

            <Collapse in={isExpanded}>
                <Box sx={{ p: { xs: 1.5, sm: 2 }, pt: 0 }}>
                    <Stack spacing={1.5}>
                        {workouts.map((workout) => (
                            <HistoryListItem
                                key={workout.entry.id}
                                entry={workout.entry}
                            />
                        ))}
                    </Stack>
                </Box>
            </Collapse>
        </Paper>
    )
}