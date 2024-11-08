import { Box, Chip, Paper, Typography } from '@mui/material'
import { format } from 'date-fns'
import { TrainingHistoryEntry } from '../types/HistoryTypes'

interface DailySummaryProps {
    date: string
    entries: TrainingHistoryEntry[]
}

export const DailySummary = ({ date, entries }: DailySummaryProps) => {
    const totalExercises = entries.reduce(
        (sum, entry) => sum + entry.exercises.length,
        0
    )

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 2,
                backgroundColor: 'background.default',
                border: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                    {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                </Typography>
                <Chip
                    label={`${totalExercises} exercises`}
                    color="primary"
                    size="small"
                />
            </Box>
        </Paper>
    )
}