import { BaseCard } from '@/components/common/Cards'
import { DifficultyChip } from '@/components/common/Forms/DifficultyChip'
import { Box, CardContent, Chip, Typography } from '@mui/material'
import { WorkoutDay } from '../types/WorkoutTypes'

interface DayCardProps {
    day: WorkoutDay
    onClick: (day: WorkoutDay) => void
    isLoading?: boolean
}

export const DayCard = ({ day, onClick, isLoading = false }: DayCardProps) => {
    const handleClick = () => {
        if (!isLoading) {
            onClick(day)
        }
    }

    return (
        <BaseCard
            title={day.title}
            imageUrl={day.imageUrl}
            imageHeight={200}
            isLoading={isLoading}
            onClick={handleClick}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {day.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        minHeight: '3em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {day.description}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Chip
                        label={`${day.exercises.length} exercises`}
                        color="primary"
                        size="small"
                        variant="outlined"
                        aria-label={`Contains ${day.exercises.length} exercises`}
                    />
                    <DifficultyChip
                        level={day.level}
                        aria-label={`Difficulty level: ${day.level}`}
                    />
                </Box>
            </CardContent>
        </BaseCard>
    )
}