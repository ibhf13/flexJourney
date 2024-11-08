import { useEffect, useState } from 'react'
import { fetchExercises } from '../api/exerciseService'
import { Exercise } from '../types/ExerciseTypes'

export const useExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const loadExercises = async () => {
            try {
                setIsLoading(true)
                const data = await fetchExercises()

                setExercises(data)
            } catch (err) {
                setError(err as Error)
                console.error('Error loading exercises:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadExercises()
    }, [])

    return { exercises, isLoading, error }
}