import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { Box, TextField, Typography, useTheme } from '@mui/material'

interface DayCardProps {
    day: WorkoutDay
    index: number
    onTitleChange: (value: string) => void
}

export const DayCard = ({ day, index, onTitleChange }: DayCardProps) => {
    const theme = useTheme()

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
        }}>
            <Typography sx={{
                minWidth: 80,
                color: 'primary.main',
                fontWeight: 600
            }}>
                Day {index + 1}
            </Typography>
            <TextField
                fullWidth
                size="small"
                value={day.title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder={`Enter name for Day ${index + 1}`}
                InputProps={{
                    sx: {
                        borderRadius: 2,
                        '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`
                        }
                    }
                }}
            />
        </Box>
    )
}