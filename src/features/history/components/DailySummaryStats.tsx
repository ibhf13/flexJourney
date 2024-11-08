import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TimerIcon from '@mui/icons-material/Timer'
import { Chip, Stack, Tooltip } from '@mui/material'
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
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: { xs: 1, sm: 0 }
            }}
        >
            <Tooltip title="Total Exercises">
                <Chip
                    icon={<FitnessCenterIcon />}
                    label={`${totalExercises} exercises`}
                    color="primary"
                    size="small"
                    sx={{
                        borderRadius: '16px',
                        fontWeight: 600,
                        '& .MuiChip-label': {
                            px: 1,
                        },
                    }}
                />
            </Tooltip>

            <Tooltip title="Total Sets">
                <Chip
                    icon={<TimerIcon />}
                    label={`${totalSets} sets`}
                    color="secondary"
                    size="small"
                    sx={{
                        borderRadius: '16px',
                        fontWeight: 600,
                        '& .MuiChip-label': {
                            px: 1,
                        },
                    }}
                />
            </Tooltip>
        </Stack>
    )
}