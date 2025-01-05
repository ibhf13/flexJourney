import { useExercisesQuery } from '@/features/exercises/hooks/useExercisesQuery'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { useState } from 'react'
import { planDaysStep, reviewStep } from '../constants'
import { useWorkoutBuilderContext } from '../contexts'

const useExerciseSelection = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const { exercises } = useExercisesQuery()
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
        setCurrentStep(planDaysStep)
    }

    const navigateToReview = () => {
        setCurrentStep(reviewStep)
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

export default useExerciseSelection