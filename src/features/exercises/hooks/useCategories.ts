import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/exerciseService'

export const useCategories = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setIsLoading(true)
                const data = await fetchCategories()

                setCategories(data)
            } catch (err) {
                setError(err as Error)
                console.error('Error loading categories:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadCategories()
    }, [])

    return { categories, isLoading, error }
}