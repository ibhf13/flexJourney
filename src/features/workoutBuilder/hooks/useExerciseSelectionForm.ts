import { Exercise } from '@/features/workout/types/WorkoutTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'
import { ExerciseSelectionFormData, exerciseSelectionSchema } from '../schemas/workoutBuilderSchemas'
import { useExerciseSelection } from './useExerciseSelection'

export const useExerciseSelectionForm = () => {
    const { workoutPlan, setCurrentStep, updateWorkoutPlan } = useWorkoutBuilderContext()
    const {
        currentDayIndex,
        searchQuery,
        filteredExercises,
        currentDayExercises,
        handleSearchChange,
        handleDayChange
    } = useExerciseSelection()

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

            // Update form values
            setValue(`days.${currentDayIndex}.exercises`, currentDay.exercises)
        }
    }

    const handleExerciseRemove = (exerciseId: string) => {
        if (!workoutPlan.days) return
        const newDays = [...workoutPlan.days]
        const currentDay = newDays[currentDayIndex]

        currentDay.exercises = currentDay.exercises.filter(e => e.id !== exerciseId)
        updateWorkoutPlan({ days: newDays })

        // Update form values
        setValue(`days.${currentDayIndex}.exercises`, currentDay.exercises)
    }

    const onSubmit = (data: ExerciseSelectionFormData) => {
        setCurrentStep('review')
    }

    const navigateBack = () => {
        setCurrentStep('days')
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
        handleSubmit,
        onSubmit,
        errors
    }
}