import { useAuth } from '@/features/auth/hooks/useAuth'
import { ExerciseCard } from '@/features/exercises/components/ExerciseCard'
import { Exercise } from '@/features/workout/types/WorkoutTypes'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { ExerciseSet } from '../types/ProgressTypes'
import { CompletedExerciseOverlay } from './CompletedExerciseOverlay'
import { ExerciseFormDialog } from './ExerciseFormDialog'

interface ProgressExerciseCardProps {
    exercise: Exercise
    dayId: string
    isCompleted: boolean
}

export const ProgressExerciseCard = ({
    exercise,
    dayId,
    isCompleted
}: ProgressExerciseCardProps) => {
    const [formOpen, setFormOpen] = useState(false)
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

        setFormOpen(false)
    }

    const handleCardClick = () => {
        if (isCompleted) return
        setFormOpen(true)
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <ExerciseCard
                exercise={exercise}
                onClick={handleCardClick}
            />
            {isCompleted && <CompletedExerciseOverlay />}
            <ExerciseFormDialog
                exercise={exercise}
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSave={handleSaveProgress}
                isLoading={progressState.progressId ? false : true}
            />
        </Box>
    )
}