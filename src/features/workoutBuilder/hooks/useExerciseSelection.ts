import { useExercises } from '@/features/exercises/hooks/useExercises'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'

export const useExerciseSelection = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const { exercises } = useExercises()
    const [currentDayIndex, setCurrentDayIndex] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')

    const handleExerciseAdd = (exercise: Exercise) => {
        if (!workoutPlan.days) return
        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        if (!currentDay.exercises.some(e => e.id === exercise.id)) {
            currentDay.exercises.push(exercise)
            updateWorkoutPlan({ days: newDays })
        }
    }

    const handleExerciseRemove = (exerciseId: string) => {
        if (!workoutPlan.days) return
        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        currentDay.exercises = currentDay.exercises.filter(e => e.id !== exerciseId)
        updateWorkoutPlan({ days: newDays })
    }

    const filteredExercises = exercises?.filter(exercise =>
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const currentDayExercises = workoutPlan.days?.[currentDayIndex]?.exercises || []

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    const handleDayChange = (index: number) => {
        setCurrentDayIndex(index)
    }

    const navigateBack = () => {
        setCurrentStep('days')
    }

    const navigateToReview = () => {
        setCurrentStep('review')
    }

    return {
        currentDayIndex,
        searchQuery,
        workoutPlan,
        filteredExercises,
        currentDayExercises,
        handleExerciseAdd,
        handleExerciseRemove,
        handleSearchChange,
        handleDayChange,
        navigateBack,
        navigateToReview
    }
}