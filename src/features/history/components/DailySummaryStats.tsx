import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TimerIcon from '@mui/icons-material/Timer'
import { Chip, Stack, Tooltip } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { TrainingHistoryEntry } from '../types/HistoryTypes'

interface DailySummaryStatsProps {
    entries: TrainingHistoryEntry[]
}

export const DailySummaryStats = ({ entries }: DailySummaryStatsProps) => {
    const totalExercises = entries.reduce(
        (sum, entry) => sum + entry.exercises.length,
        0
    )

    const totalSets = entries.reduce(
        (sum, entry) => sum + entry.exercises.reduce(
            (setSum, exercise) => setSum + exercise.sets.length,
            0
        ),
        0
    )

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                flexWrap: 'wrap',
                gap: 1
            }}
        >
            <Tooltip title="Total Exercises" arrow placement="top">
                <Chip
                    icon={<FitnessCenterIcon sx={{ fontSize: '1rem' }} />}
                    label={`${totalExercises} exercises`}
                    color="primary"
                    size="small"
                    sx={{
                        height: '24px',
                        borderRadius: '12px',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        '& .MuiChip-label': {
                            px: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        },
                        '& .MuiChip-icon': {
                            color: 'primary.main',
                        },
                    }}
                />
            </Tooltip>

            <Tooltip title="Total Sets" arrow placement="top">
                <Chip
                    icon={<TimerIcon sx={{ fontSize: '1rem' }} />}
                    label={`${totalSets} sets`}
                    color="secondary"
                    size="small"
                    sx={{
                        height: '24px',
                        borderRadius: '12px',
                        bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                        color: 'secondary.main',
                        border: '1px solid',
                        borderColor: 'secondary.main',
                        '& .MuiChip-label': {
                            px: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        },
                        '& .MuiChip-icon': {
                            color: 'secondary.main',
                        },
                    }}
                />
            </Tooltip>
        </Stack>
    )
}