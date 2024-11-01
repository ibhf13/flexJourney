import { useState, useEffect } from 'react'
import { WorkoutPlan } from '../types/WorkoutTypes'
import { fetchWorkoutPlans } from '../api/mockData'

export const useWorkoutPlans = () => {
  const [plans, setPlans] = useState<WorkoutPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setIsLoading(true)
        const data = await fetchWorkoutPlans()
        setPlans(data)
      } catch (err) {
        setError('Failed to fetch workout plans')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlans()
  }, [])

  return { plans, isLoading, error }
}
