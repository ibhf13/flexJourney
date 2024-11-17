import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { Box, Tab, Tabs } from '@mui/material'

interface DaySliderProps {
    days: WorkoutDay[]
    currentDayIndex: number
    onDaySelect: (index: number) => void
}

export const DaySlider = ({
    days,
    currentDayIndex,
    onDaySelect
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
                {days.map((day, index) => (
                    <Tab
                        key={day.id}
                        label={`Day ${index + 1}`}
                        id={`day-tab-${index}`}
                        aria-controls={`day-tabpanel-${index}`}
                    />
                ))}
            </Tabs>
        </Box>
    )
}