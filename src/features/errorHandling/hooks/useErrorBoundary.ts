import { useCallback, useState } from 'react'

export const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null)

  const handleError = useCallback((error: Error) => {
    setError(error)
    console.error('Caught error:', error)
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    handleError,
    resetError
  }
}