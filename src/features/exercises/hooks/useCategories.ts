import { FirebaseError } from '@/config/firebase/utils/errors'
import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/exerciseService'

export const useCategories = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<FirebaseError | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadCategories = async () => {
            try {
                setIsLoading(true)
                const data = await fetchCategories()

                if (isMounted) {
                    setCategories(data)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as FirebaseError)
                }

                console.error('Error loading categories:', err)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadCategories()

        return () => {
            isMounted = false
        }
    }, [])

    return { categories, isLoading, error }
}