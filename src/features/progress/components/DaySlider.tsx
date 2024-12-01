import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Tab, Tabs } from '@mui/material'
import { alpha } from '@mui/material/styles'

interface DaySliderProps {
    days: WorkoutDay[]
    currentDayIndex: number
    onDaySelect: (index: number) => void
    completedDays: Set<string>
}

export const DaySlider = ({
    days,
    currentDayIndex,
    onDaySelect,
    completedDays
}: DaySliderProps) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={currentDayIndex}
                onChange={(_, newValue) => onDaySelect(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="workout days"
            >
                {days.map((day, index) => {
                    const isCompleted = completedDays.has(day.id)

                    return (
                        <Tab
                            key={day.id}
                            label={
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: isCompleted ? 'text.disabled' : 'inherit'
                                }}>
                                    {`Day ${index + 1}`}
                                    {isCompleted && (
                                        <CheckCircleIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'success.main',
                                                opacity: 0.8
                                            }}
                                        />
                                    )}
                                </Box>
                            }
                            id={`day-tab-${index}`}
                            aria-controls={`day-tabpanel-${index}`}
                            sx={{
                                opacity: isCompleted ? 0.7 : 1,
                                '&.Mui-selected': {
                                    color: isCompleted ?
                                        (theme) => alpha(theme.palette.text.primary, 0.7) :
                                        'primary.main'
                                }
                            }}
                        />
                    )
                })}
            </Tabs>
        </Box>
    )
}