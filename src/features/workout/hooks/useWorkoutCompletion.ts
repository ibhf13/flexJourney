import { useStreak } from '@/features/streak/contexts/StreakContext'
import { useCallback, useEffect, useState } from 'react'
import { useWorkoutContext } from '../contexts/WorkoutContext'
import { WorkoutDay } from '../types/WorkoutTypes'

export const useWorkoutCompletion = (day: WorkoutDay) => {
    const { completedExercises } = useWorkoutContext()
    const { updateStreak } = useStreak()
    const [showCongratulations, setShowCongratulations] = useState(false)
    const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false)

    const checkWorkoutComplete = useCallback(() => {
        if (!day?.exercises) return false

        return day.exercises.every(exercise => completedExercises.includes(exercise.id))
    }, [completedExercises, day?.exercises])

    useEffect(() => {
        const isComplete = checkWorkoutComplete()

        if (isComplete && !isWorkoutCompleted) {
            setIsWorkoutCompleted(true)
            setShowCongratulations(true)
            updateStreak(new Date().toISOString())
        }
    }, [checkWorkoutComplete, isWorkoutCompleted, updateStreak])

    const handleCongratulationsComplete = useCallback(() => {
        setShowCongratulations(false)
    }, [])

    return {
        showCongratulations,
        isWorkoutCompleted,
        handleCongratulationsComplete
    }
}