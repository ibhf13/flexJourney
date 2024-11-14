import { FirebaseError } from '@/config/firebase/utils/errors'
import { useEffect, useState } from 'react'
import { fetchExercises } from '../api/exerciseService'
import { Exercise } from '../types/ExerciseTypes'

export const useExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<FirebaseError | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadExercises = async () => {
            try {
                setIsLoading(true)
                const data = await fetchExercises()

                if (isMounted) {
                    setExercises(data)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as FirebaseError)
                }

                console.error('Error loading exercises:', err)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadExercises()

        return () => {
            isMounted = false
        }
    }, [])

    return { exercises, isLoading, error }
}