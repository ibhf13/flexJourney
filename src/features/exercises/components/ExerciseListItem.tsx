import fallbackImage from '@/assets/images/dumbells.jpg'
import { DifficultyChip } from '@/components/common/Forms/DifficultyChip'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import InfoIcon from '@mui/icons-material/Info'
import TimerIcon from '@mui/icons-material/Timer'
import {
    Avatar,
    Box,
    Chip,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material'
import { Exercise } from '../types/ExerciseTypes'

interface ExerciseListItemProps {
    exercise: Exercise
    onSelect: (exercise: Exercise) => void
    isCompleted?: boolean
}

export const ExerciseListItem = ({
    exercise,
    onSelect,
    isCompleted = false
}: ExerciseListItemProps) => {
    return (
        <>
            <ListItem
                sx={{
                    py: 2,
                    opacity: isCompleted ? 0.7 : 1,
                    filter: isCompleted ? 'grayscale(100%)' : 'none',
                }}
            >
                <ListItemAvatar>
                    <Avatar
                        src={fallbackImage ?? exercise.imageUrl}
                        variant="rounded"
                        sx={{ width: 100, height: 100, mr: 2 }}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" component="span">
                                {exercise.title}
                            </Typography>
                            <DifficultyChip level={exercise.level} />
                        </Box>
                    }
                    secondary={
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <TimerIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary" component="span">
                                        {exercise.defaultRestPeriod}s rest
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <FitnessCenterIcon fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary" component="span">
                                        {exercise.type}
                                    </Typography>
                                </Box>
                            </Box>
                            <Chip
                                label={exercise.category}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ mr: 1 }}
                            />
                        </Box>
                    }
                />
                <Tooltip title="View Details">
                    <IconButton
                        color="primary"
                        onClick={() => onSelect(exercise)}
                        disabled={isCompleted}
                    >
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
            <Divider />
        </>
    )
}