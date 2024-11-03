import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { WorkoutPlan } from '../types/WorkoutTypes'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage'

interface WorkoutContextState {
    selectedPlan: WorkoutPlan | null
    selectedDay: number
    completedExercises: string[]
    currentStreak: number
    trainingHistory: {
        date: string
        planId: string
        exercisesCompleted: string[]
    }[]
    lastWorkoutDate: string | null
    exerciseProgress: {
        [exerciseId: string]: {
            weight: number
            reps: number
            lastCompleted: string
        }
    }
}

interface WorkoutContextValue extends WorkoutContextState {
    selectPlan: (plan: WorkoutPlan) => void
    selectDay: (dayIndex: number) => void
    completeExercise: (exerciseId: string) => void
    resetWorkout: () => void
    updateExerciseProgress: (exerciseId: string, weight: number, reps: number) => void
}

const initialState: WorkoutContextState = {
    selectedPlan: null,
    selectedDay: 0,
    completedExercises: [],
    currentStreak: 0,
    trainingHistory: [],
    lastWorkoutDate: null,
    exerciseProgress: {},
}

const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined)

type WorkoutAction =
    | { type: 'SELECT_PLAN'; payload: WorkoutPlan }
    | { type: 'SELECT_DAY'; payload: number }
    | { type: 'COMPLETE_EXERCISE'; payload: string }
    | { type: 'RESET_WORKOUT' }
    | { type: 'UPDATE_EXERCISE_PROGRESS'; payload: { exerciseId: string; weight: number; reps: number } }
    | { type: 'LOAD_STORED_STATE'; payload: WorkoutContextState }

function workoutReducer(state: WorkoutContextState, action: WorkoutAction): WorkoutContextState {
    switch (action.type) {
        case 'SELECT_PLAN':
            return {
                ...state,
                selectedPlan: action.payload,
                selectedDay: 0,
                completedExercises: [],
            }
        case 'SELECT_DAY':
            return {
                ...state,
                selectedDay: action.payload,
            }
        case 'COMPLETE_EXERCISE':
            const today = new Date().toISOString().split('T')[0]
            const isNewDay = today !== state.lastWorkoutDate

            const updatedCompletedExercises = state.completedExercises.includes(action.payload)
                ? state.completedExercises
                : [...state.completedExercises, action.payload]

            const updatedHistory = [...state.trainingHistory]
            const todayEntry = updatedHistory.find(entry => entry.date === today)

            if (todayEntry) {
                if (!todayEntry.exercisesCompleted.includes(action.payload)) {
                    todayEntry.exercisesCompleted.push(action.payload)
                }
            } else {
                updatedHistory.push({
                    date: today,
                    planId: state.selectedPlan?.id || '',
                    exercisesCompleted: [action.payload]
                })
            }

            return {
                ...state,
                completedExercises: updatedCompletedExercises,
                currentStreak: isNewDay ? state.currentStreak + 1 : state.currentStreak,
                lastWorkoutDate: today,
                trainingHistory: updatedHistory
            }
        case 'RESET_WORKOUT':
            return initialState
        case 'UPDATE_EXERCISE_PROGRESS':
            return {
                ...state,
                exerciseProgress: {
                    ...state.exerciseProgress,
                    [action.payload.exerciseId]: {
                        weight: action.payload.weight,
                        reps: action.payload.reps,
                        lastCompleted: new Date().toISOString()
                    }
                }
            }
        case 'LOAD_STORED_STATE':
            return action.payload
        default:
            return state
    }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(workoutReducer, initialState)

    useEffect(() => {
        const storedState = loadFromLocalStorage('workoutState')
        if (storedState) {
            dispatch({ type: 'LOAD_STORED_STATE', payload: storedState })
        }
    }, [])

    useEffect(() => {
        saveToLocalStorage('workoutState', state)
    }, [state])

    const value: WorkoutContextValue = {
        ...state,
        selectPlan: (plan) => dispatch({ type: 'SELECT_PLAN', payload: plan }),
        selectDay: (dayIndex) => dispatch({ type: 'SELECT_DAY', payload: dayIndex }),
        completeExercise: (exerciseId) => dispatch({ type: 'COMPLETE_EXERCISE', payload: exerciseId }),
        resetWorkout: () => dispatch({ type: 'RESET_WORKOUT' }),
        updateExerciseProgress: (exerciseId: string, weight: number, reps: number) =>
            dispatch({ type: 'UPDATE_EXERCISE_PROGRESS', payload: { exerciseId, weight, reps } }),
    }

    return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    if (context === undefined) {
        throw new Error('useWorkoutContext must be used within a WorkoutProvider')
    }
    return context
}
