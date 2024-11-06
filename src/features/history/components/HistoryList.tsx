import { Box, List, Typography } from '@mui/material'
import { TrainingHistoryEntry } from '../types/HistoryTypes'
import { HistoryListItem } from './HistoryListItem'

interface HistoryListProps {
    history: TrainingHistoryEntry[]
}

export const HistoryList = ({ history }: HistoryListProps) => {
    if (history.length === 0) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <Typography variant="body1">No training history found</Typography>
            </Box>
        )
    }

    return (
        <List>
            {history.map((entry) => (
                <HistoryListItem key={entry.id} entry={entry} />
            ))}
        </List>
    )
}