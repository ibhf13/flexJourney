import { useExercisesQuery } from '@/features/exercises/hooks'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'
import { ExerciseSelectionFormData, exerciseSelectionSchema } from '../schemas/workoutBuilderSchemas'
import { useExerciseSelection } from './useExerciseSelection'

export const useExerciseSelectionForm = () => {
    const { workoutPlan, setCurrentStep, updateWorkoutPlan } = useWorkoutBuilderContext()
    const {
        currentDayIndex,
        currentDayExercises,
        handleDayChange
    } = useExerciseSelection()
    const { exercises } = useExercisesQuery()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const { handleSubmit, formState: { errors }, setValue } = useForm<ExerciseSelectionFormData>({
        resolver: zodResolver(exerciseSelectionSchema),
        defaultValues: {
            days: workoutPlan.days?.map(day => ({
                id: day.id,
                title: day.title,
                exercises: day.exercises
            })) || []
        }
    })

    const handleExerciseAdd = (exercise: Exercise) => {
        if (!workoutPlan.days) return
        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        if (!currentDay.exercises.some(e => e.id === exercise.id)) {
            currentDay.exercises.push(exercise)
            updateWorkoutPlan({ days: newDays })

            setValue(`days.${currentDayIndex}.exercises`, currentDay.exercises)
        }
    }

    const handleExerciseRemove = (exerciseId: string) => {
        if (!workoutPlan.days) return
        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        currentDay.exercises = currentDay.exercises.filter(e => e.id !== exerciseId)
        updateWorkoutPlan({ days: newDays })

        setValue(`days.${currentDayIndex}.exercises`, currentDay.exercises)
    }

    const onSubmit = (data: ExerciseSelectionFormData) => {
        setCurrentStep('review')
    }

    const navigateBack = () => {
        setCurrentStep('days')
    }

    const handleSearchChange = (query: string) => {
        setSearchQuery(query)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const filteredExercises = exercises?.filter((exercise: Exercise) => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || exercise.category === selectedCategory

        return matchesSearch && matchesCategory
    })

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
        handleSubmit,
        onSubmit,
        errors,
        selectedCategory,
        handleCategoryChange
    }
}