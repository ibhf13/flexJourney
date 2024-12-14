import { useCallback, useState } from 'react'
import { ErrorSeverity, LoadingState } from '../types/errorTypes'
import { useErrorHandler } from './useErrorHandler'


interface LoadingHandler<T extends (...args: any[]) => Promise<any>> {
    readonly isLoading: boolean
    readonly error: Error | null
    execute: (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>
}

export const useLoadingHandler = <T extends (...args: any[]) => Promise<any>>(
    asyncFn: T
): LoadingHandler<T> => {
    const [state, setState] = useState<LoadingState>({
        isLoading: false,
        error: null
    })

    const { handleError } = useErrorHandler()

    const execute = useCallback(async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
        setState({ isLoading: true, error: null })
        try {
            const result = await asyncFn(...args)

            setState({ isLoading: false, error: null })

            return result
        } catch (error) {
            const errorObject = error instanceof Error ? error : new Error('Unknown error occurred')

            setState({ isLoading: false, error: errorObject })
            handleError(error, ErrorSeverity.ERROR)
            throw errorObject
        }
    }, [asyncFn, handleError])

    return {
        ...state,
        execute
    }
}