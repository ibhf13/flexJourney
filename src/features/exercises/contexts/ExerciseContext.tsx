// import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext'
import { createContext, ReactNode, useCallback, useContext, useReducer } from 'react'
import { Exercise } from '../types/ExerciseTypes'

interface ExerciseContextState {
    exercises: Exercise[]
    isLoading: boolean
    error: Error | null
    completedExercises: Set<string>
}

interface ExerciseContextValue extends ExerciseContextState {
    setExercises: (exercises: Exercise[]) => void
    // toggleExerciseCompletion: (exerciseId: string) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: Error | null) => void
    resetExercises: () => void
}

const initialState: ExerciseContextState = {
    exercises: [],
    isLoading: false,
    error: null,
    completedExercises: new Set(),
}

type ExerciseAction =
    | { type: 'SET_EXERCISES'; payload: Exercise[] }
    // | { type: 'TOGGLE_COMPLETION'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: Error | null }
    | { type: 'RESET_EXERCISES' }

const ExerciseContext = createContext<ExerciseContextValue | undefined>(undefined)

function exerciseReducer(state: ExerciseContextState, action: ExerciseAction): ExerciseContextState {
    switch (action.type) {
        case 'SET_EXERCISES':
            return {
                ...state,
                exercises: action.payload,
                error: null,
                isLoading: false
            }
        // case 'TOGGLE_COMPLETION':
        //     const newCompletedExercises = new Set(state.completedExercises)

        //     if (newCompletedExercises.has(action.payload)) {
        //         newCompletedExercises.delete(action.payload)
        //     } else {
        //         newCompletedExercises.add(action.payload)
        //     }

        //     return { ...state, completedExercises: newCompletedExercises }
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case 'RESET_EXERCISES':
            return initialState
        default:
            return state
    }
}

export function ExerciseProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(exerciseReducer, initialState)
    // const { completeExercise } = useWorkoutContext()

    const setExercises = useCallback((exercises: Exercise[]) => {
        dispatch({ type: 'SET_EXERCISES', payload: exercises })
    }, [])

    // const toggleExerciseCompletion = useCallback((exerciseId: string) => {
    //     dispatch({ type: 'TOGGLE_COMPLETION', payload: exerciseId })
    //     completeExercise(exerciseId)
    // }, [completeExercise])

    const setLoading = useCallback((isLoading: boolean) => {
        dispatch({ type: 'SET_LOADING', payload: isLoading })
    }, [])

    const setError = useCallback((error: Error | null) => {
        dispatch({ type: 'SET_ERROR', payload: error })
    }, [])

    const resetExercises = useCallback(() => {
        dispatch({ type: 'RESET_EXERCISES' })
    }, [])

    const value: ExerciseContextValue = {
        ...state,
        isLoading: state.isLoading,
        error: state.error,
        setExercises,
        // toggleExerciseCompletion,
        setLoading,
        setError,
        resetExercises
    }

    return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>
}

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext)

    if (context === undefined) {
        throw new Error('useExerciseContext must be used within an ExerciseProvider')
    }

    return context
}