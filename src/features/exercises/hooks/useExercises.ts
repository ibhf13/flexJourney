import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchExerciseById, fetchExercises } from '../api/exerciseService'

export const useExercises = () => {
    const exercisesQuery = useQuery({
        queryKey: ['exercises'],
        queryFn: fetchExercises,
    })

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const useExerciseById = (exerciseId: string) => {
        return useQuery({
            queryKey: ['exercise', exerciseId],
            queryFn: () => fetchExerciseById(exerciseId),
            enabled: !!exerciseId,
        })
    }

    return {
        exercises: exercisesQuery.data,
        isExercisesLoading: exercisesQuery.isLoading,
        exercisesError: exercisesQuery.error,
        categories: categoriesQuery.data,
        isCategoriesLoading: categoriesQuery.isLoading,
        categoriesError: categoriesQuery.error,
        useExerciseById,
    }
}