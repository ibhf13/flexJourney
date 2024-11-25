import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material'

interface SelectedExerciseItemProps {
    exercise: Exercise
    index: number
    onRemove: (exerciseId: string) => void
}

export const SelectedExerciseItem = ({ exercise, index, onRemove }: SelectedExerciseItemProps) => {
    const theme = useTheme()

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: theme.palette.primary.main
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography color="text.secondary">
                    {index + 1}.
                </Typography>
                <Typography>{exercise.title}</Typography>
            </Box>
            <IconButton
                onClick={() => onRemove(exercise.id)}
                size="small"
                sx={{
                    color: theme.palette.error.main,
                    '&:hover': {
                        backgroundColor: `${theme.palette.error.main}20`
                    }
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Paper>
    )
}