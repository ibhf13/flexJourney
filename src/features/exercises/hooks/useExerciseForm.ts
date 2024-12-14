import { auth } from '@/config/firebase'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { canEditExercise } from '../api/exerciseService'
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
    const currentUser = auth.currentUser


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

        if (!currentUser) throw new Error('User must be authenticated')

        try {
            if (mode === 'edit' && exercise?.id) {
                if (!canEditExercise(exercise)) {
                    throw new Error('Unauthorized to edit this exercise')
                }

                await updateExercise({
                    exerciseId: exercise.id,
                    updates: data,
                })
            } else if (mode === 'create') {

                await createExercise({
                    ...data,
                    id: '',
                    createdBy: currentUser.uid,
                } as Exercise)
            }

            onClose()
        } catch (error) {
            console.error('Form submission error:', error)
            throw error
        }
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