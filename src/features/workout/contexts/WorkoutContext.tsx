import { createContext, useContext, useReducer, ReactNode } from 'react';
import { WorkoutPlan } from '../types/WorkoutTypes';
import { WORKOUT_PLANS } from '../api/mockData';

interface WorkoutContextState {
    availablePlans: WorkoutPlan[];
    selectedPlan: WorkoutPlan | null;
    selectedDay: number;
    completedExercises: string[];
    currentStreak: number;
}

interface WorkoutContextValue extends WorkoutContextState {
    selectPlan: (plan: WorkoutPlan) => void;
    selectDay: (dayIndex: number) => void;
    completeExercise: (exerciseId: string) => void;
    resetWorkout: () => void;
}

const initialState: WorkoutContextState = {
    availablePlans: WORKOUT_PLANS,
    selectedPlan: null,
    selectedDay: 0,
    completedExercises: [],
    currentStreak: 0,
};

const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined);

type WorkoutAction =
    | { type: 'SELECT_PLAN'; payload: WorkoutPlan }
    | { type: 'SELECT_DAY'; payload: number }
    | { type: 'COMPLETE_EXERCISE'; payload: string }
    | { type: 'RESET_WORKOUT' };

function workoutReducer(state: WorkoutContextState, action: WorkoutAction): WorkoutContextState {
    switch (action.type) {
        case 'SELECT_PLAN':
            return {
                ...state,
                selectedPlan: action.payload,
                selectedDay: 0,
                completedExercises: [],
            };
        case 'SELECT_DAY':
            return {
                ...state,
                selectedDay: action.payload,
            };
        case 'COMPLETE_EXERCISE':
            return {
                ...state,
                completedExercises: [...state.completedExercises, action.payload],
                currentStreak: state.currentStreak + 1,
            };
        case 'RESET_WORKOUT':
            return initialState;
        default:
            return state;
    }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(workoutReducer, initialState);

    const value: WorkoutContextValue = {
        ...state,
        selectPlan: (plan) => dispatch({ type: 'SELECT_PLAN', payload: plan }),
        selectDay: (dayIndex) => dispatch({ type: 'SELECT_DAY', payload: dayIndex }),
        completeExercise: (exerciseId) => dispatch({ type: 'COMPLETE_EXERCISE', payload: exerciseId }),
        resetWorkout: () => dispatch({ type: 'RESET_WORKOUT' }),
    };

    return (
        <WorkoutContext.Provider value={value}>
            {children}
        </WorkoutContext.Provider>
    );
}

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkoutContext must be used within a WorkoutProvider');
    }
    return context;
};

