import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Collapse, IconButton, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { format } from 'date-fns'
import { useState } from 'react'
import { TrainingHistoryEntry } from '../types/HistoryTypes'
import { DailySummaryStats } from './DailySummaryStats'
import { HistoryListItem } from './HistoryListItem'

interface DailySummaryProps {
    date: string
    entries: TrainingHistoryEntry[]
}

export const DailySummary = ({ date, entries }: DailySummaryProps) => {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <Paper
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: { xs: 2, sm: 3 },
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                mb: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                }
            }}
        >
            <Box
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                    p: { xs: 1.5, sm: 2 },
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.action.hover, 0.1)
                    },
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
                        <DailySummaryStats entries={entries} />
                        <IconButton
                            size="small"
                            sx={{
                                p: 0.5,
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                                color: 'primary.main',
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsExpanded(!isExpanded)
                            }}
                        >
                            <ExpandMoreIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>

            <Collapse
                in={isExpanded}
                timeout={200}
                sx={{
                    '& .MuiCollapse-wrapper': {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }}
            >
                <Box
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                        pt: 0
                    }}
                >
                    <Stack spacing={1.5}>
                        {entries.map((entry) => (
                            <HistoryListItem
                                key={entry.id}
                                entry={entry}
                            />
                        ))}
                    </Stack>
                </Box>
            </Collapse>
        </Paper>
    )
}