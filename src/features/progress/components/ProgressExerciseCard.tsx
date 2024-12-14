import { useAuth } from '@/features/auth/hooks/useAuth'
import { ExerciseDialog } from '@/features/exercises/components/Dialogs/ExercisesDialog/ExerciseDialog'
import { ExerciseCard } from '@/features/exercises/components/ExerciseCard'
import { Exercise } from '@/features/workout/types/WorkoutTypes'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, IconButton, alpha } from '@mui/material'
import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { ExerciseSet } from '../types/ProgressTypes'
import { CompletedExerciseOverlay } from './CompletedExerciseOverlay'
import { ExerciseFormDialog } from './ExerciseFormDialog'

interface ProgressExerciseCardProps {
    exercise: Exercise
    dayId: string
    isCompleted: boolean
    onDayComplete: () => void
    totalExercises: number
    completedCount: number
}

export const ProgressExerciseCard = ({
    exercise,
    dayId,
    isCompleted,
    onDayComplete,
    totalExercises,
    completedCount
}: ProgressExerciseCardProps) => {
    const [formOpen, setFormOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)
    const { user } = useAuth()
    const { progressState, handleExerciseProgress } = useProgress()

    const handleSaveProgress = async (sets: ExerciseSet[]) => {
        if (!user || !progressState.progressId) return

        await handleExerciseProgress(dayId, {
            exerciseId: exercise.id,
            exerciseName: exercise.title,
            sets,
            isCompleted: true
        })

        if (completedCount + 1 === totalExercises) {
            onDayComplete()
        }

        setFormOpen(false)
    }

    const handleCardClick = () => {
        if (isCompleted) return
        setFormOpen(true)
    }

    const handleInfoClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setInfoOpen(true)
    }

    return (
        <Box sx={{ position: 'relative' }}>
            {!isCompleted && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 1,
                        borderRadius: '50%',
                        boxShadow: 2,
                    }}
                >
                    <IconButton
                        onClick={handleInfoClick}
                        sx={{
                            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
                            color: 'primary.main',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: (theme) => alpha(theme.palette.background.paper, 1),
                                transform: 'scale(1.1)',
                            },
                        }}
                        size="small"
                        aria-label="exercise information"
                    >
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
            <ExerciseCard
                exercise={exercise}
                onView={handleCardClick}
            />
            {isCompleted && <CompletedExerciseOverlay />}
            <ExerciseFormDialog
                exercise={exercise}
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSave={handleSaveProgress}
                isLoading={!progressState.progressId}
            />
            <ExerciseDialog
                exercise={exercise}
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
            />
        </Box>
    )
}