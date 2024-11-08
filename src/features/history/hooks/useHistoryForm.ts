import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { ExerciseLog, ExerciseSet, TrainingHistoryEntry } from '../types/HistoryTypes'

interface UseHistoryFormProps {
    initialEntry: TrainingHistoryEntry
    plans: WorkoutPlan[]
}

export const useHistoryForm = ({ initialEntry, plans }: UseHistoryFormProps) => {
    const [selectedPlanId, setSelectedPlanId] = useState(initialEntry.planId)
    const [selectedDayId, setSelectedDayId] = useState(initialEntry.dayId)
    const [exercises, setExercises] = useState<ExerciseLog[]>(initialEntry.exercises)

    const selectedPlan = plans.find(plan => plan.id === selectedPlanId)
    const selectedDay = selectedPlan?.days.find(day => day.id === selectedDayId)
    const availableDays = selectedPlan?.days || []
    const availableExercises = selectedDay?.exercises || []

    useEffect(() => {
        if (selectedPlan && !selectedPlan.days.some(day => day.id === selectedDayId)) {
            setSelectedDayId('')
            setExercises([])
        }
    }, [selectedPlanId, selectedPlan, selectedDayId])

    const handlePlanChange = (event: SelectChangeEvent) => {
        setSelectedPlanId(event.target.value)
    }

    const handleDayChange = (event: SelectChangeEvent) => {
        setSelectedDayId(event.target.value)
        setExercises([])
    }

    const handleAddExercise = (exercise: Exercise) => {
        setExercises(prev => [...prev, {
            exerciseId: exercise.id,
            exerciseName: exercise.title,
            sets: [],
            completedAt: new Date().toISOString()
        }])
    }

    const handleRemoveExercise = (exerciseId: string) => {
        setExercises(prev => prev.filter(ex => ex.exerciseId !== exerciseId))
    }

    const handleUpdateSets = (exerciseId: string, sets: ExerciseSet[]) => {
        setExercises(prev => prev.map(ex =>
            ex.exerciseId === exerciseId ? { ...ex, sets } : ex
        ))
    }

    const getFormUpdates = (): Partial<TrainingHistoryEntry> | null => {
        if (!selectedPlan || !selectedDay) return null

        return {
            planId: selectedPlanId,
            planName: selectedPlan.title,
            dayId: selectedDayId,
            dayName: selectedDay.title,
            exercises: exercises.map(exercise => ({
                ...exercise,
                completedAt: exercise.completedAt || new Date().toISOString()
            }))
        }
    }

    const isValid = selectedPlanId && selectedDayId && exercises.every(ex => ex.sets.length > 0)

    return {
        selectedPlanId,
        selectedDayId,
        exercises,
        selectedPlan,
        selectedDay,
        availableDays,
        availableExercises,
        isValid,
        handlePlanChange,
        handleDayChange,
        handleAddExercise,
        handleRemoveExercise,
        handleUpdateSets,
        getFormUpdates
    }
}