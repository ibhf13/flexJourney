import { Card, CardContent, CardMedia, Typography, CardActionArea, Chip, Box } from '@mui/material'
import { WorkoutDay } from '../types/WorkoutTypes'

interface WorkoutDayCardProps {
    day: WorkoutDay
    onClick: (day: WorkoutDay) => void
}
export const WorkoutDayCard = ({ day, onClick }: WorkoutDayCardProps) => {
    const handleClick = () => onClick(day)

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
                <CardMedia component="img" height="200" image={day.imageUrl} alt={day.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {day.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {day.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                            label={`${day.exercises.length} exercises`}
                            color="primary"
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            label={day.level}
                            color={
                                day.level === 'Beginner'
                                    ? 'success'
                                    : day.level === 'Intermediate'
                                        ? 'warning'
                                        : 'error'
                            }
                            size="small"
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}