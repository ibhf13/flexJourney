import { useCallback, useState } from 'react'
import { LoadingState } from '../types/errorTypes'
import { useErrorHandler } from './useErrorHandler'

export const useLoadingHandler = <T extends (...args: any[]) => Promise<any>>(
    asyncFn: T,
    errorMessage = 'Operation failed'
) => {
    const [state, setState] = useState<LoadingState>({
        isLoading: false,
        error: null
    })

    const { handleError } = useErrorHandler()

    const execute = useCallback(async (...args: Parameters<T>) => {
        setState({ isLoading: true, error: null })
        try {
            const result = await asyncFn(...args)

            setState({ isLoading: false, error: null })

            return result
        } catch (error) {
            setState({ isLoading: false, error: error as Error })
            handleError(error, errorMessage)
            throw error
        }
    }, [asyncFn, errorMessage, handleError])

    return {
        ...state,
        execute
    }
}