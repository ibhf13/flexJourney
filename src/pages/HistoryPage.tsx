import { LoadingErrorWrapper } from '@/components/common/Error/LoadingErrorWrapper'
import { DailySummary } from '@/features/history/components/DailySummary'
import { HistoryListItem } from '@/features/history/components/HistoryListItem'
import { useHistory } from '@/features/history/hooks/useHistory'
import { groupHistoryByDate } from '@/features/history/utils/dateUtils'
import { Box, Container, Typography } from '@mui/material'
import { useEffect } from 'react'

export const HistoryPage = () => {
    const { history, isLoading, error, fetchHistory } = useHistory()

    useEffect(() => {
        fetchHistory()
    }, [])

    const groupedHistory = groupHistoryByDate(history)

    return (
        <Container maxWidth="md">
            <Box py={4}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        mb: 4
                    }}
                >
                    Training History
                </Typography>

                <LoadingErrorWrapper isLoading={isLoading} error={error}>
                    {groupedHistory.map(({ date, entries }) => (
                        <Box key={date} mb={4}>
                            <DailySummary date={date} entries={entries} />
                            <Box ml={2}>
                                {entries.map((entry) => (
                                    <HistoryListItem
                                        key={entry.id}
                                        entry={entry}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </LoadingErrorWrapper>
            </Box>
        </Container>
    )
}