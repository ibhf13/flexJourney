import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'

export const useTrainingDaysStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()
    const [errors, setErrors] = useState<string[]>([])

    const createNewDay = (index: number): WorkoutDay => ({
        id: workoutPlan.days?.[index]?.id || crypto.randomUUID(),
        title: workoutPlan.days?.[index]?.title || `Day ${index + 1}`,
        description: '',
        imageUrl: '',
        level: workoutPlan.level || 'Beginner',
        exercises: workoutPlan.days?.[index]?.exercises || []
    })

    const handleDaysChange = (numberOfDays: number) => {
        const newDays = Array.from(
            { length: numberOfDays },
            (_, index) => createNewDay(index)
        )

        updateWorkoutPlan({ days: newDays })
    }

    const handleDayTitleChange = (index: number, title: string) => {
        const newDays = [...workoutPlan.days!]

        newDays[index] = { ...newDays[index], title }
        updateWorkoutPlan({ days: newDays })
    }

    const validateDays = (): string[] => {
        const errors: string[] = []

        if (!workoutPlan.days?.length) {
            errors.push('Please select number of training days')
        }

        const dayTitles = workoutPlan.days?.map(day => day.title) || []

        if (dayTitles.length !== new Set(dayTitles).size) {
            errors.push('Each training day must have a unique title')
        }

        return errors
    }

    const handleContinue = () => {
        const validationErrors = validateDays()

        if (validationErrors.length > 0) {
            setErrors(validationErrors)

            return
        }

        setCurrentStep('exercises')
    }

    return {
        workoutPlan,
        errors,
        handleDaysChange,
        handleDayTitleChange,
        handleContinue,
        setCurrentStep
    }
}