import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Exercise, PREDEFINED_EXERCISE_TYPES } from '../types/ExerciseTypes'
import { useExercisesQuery } from './useExercisesQuery'

interface UseExerciseFormProps {
    exercise: Exercise | null
    mode: 'create' | 'edit'
    onClose: () => void
    open: boolean
}

export const useExerciseForm = ({ exercise, mode, onClose, open }: UseExerciseFormProps) => {
    const { updateExercise, createExercise, isUpdating, isCreating } = useExercisesQuery()

    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            title: exercise?.title || '',
            description: exercise?.description || '',
            imageUrl: exercise?.imageUrl || '',
            videoUrl: exercise?.videoUrl || '',
            category: exercise?.category || '',
            defaultRestPeriod: exercise?.defaultRestPeriod || 60,
            level: exercise?.level || DifficultyLevel.BEGINNER,
            type: exercise?.type || PREDEFINED_EXERCISE_TYPES.STRENGTH,
        },
    })

    useEffect(() => {
        if (open && exercise) {
            reset({
                title: exercise.title,
                description: exercise.description,
                imageUrl: exercise.imageUrl,
                videoUrl: exercise.videoUrl,
                category: exercise.category,
                defaultRestPeriod: exercise.defaultRestPeriod,
                level: exercise.level,
                type: exercise.type,
            })
        }
    }, [open, exercise, reset])

    const handleClose = () => {
        reset()
        onClose()
    }

    const onSubmit = async (data: Partial<Exercise>) => {
        if (mode === 'edit' && exercise?.id) {
            await updateExercise({
                exerciseId: exercise.id,
                updates: data,
            })
        } else if (mode === 'create') {
            await createExercise(data as Omit<Exercise, 'id'>)
        }

        onClose()
    }

    return {
        control,
        handleSubmit,
        handleClose,
        onSubmit,
        isUpdating,
        isCreating,
        setValue
    }
}