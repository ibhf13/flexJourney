import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { createContext, ReactNode, useContext, useState } from 'react'
import { WorkoutBuilderStep, WorkoutPlan } from '../types/workoutBuilderTypes'

interface WorkoutBuilderState extends Partial<WorkoutPlan> {
    days: WorkoutPlan['days']
    description: string
    level: DifficultyLevel
    type: 'custom' | 'default'
}

interface WorkoutBuilderContextType {
    currentStep: WorkoutBuilderStep
    workoutPlan: WorkoutBuilderState
    setCurrentStep: (step: WorkoutBuilderStep) => void
    updateWorkoutPlan: (updates: Partial<WorkoutBuilderState>) => void
    resetBuilder: () => void
}

const INITIAL_STATE: WorkoutBuilderState = {
    days: [],
    description: '',
    level: 'Beginner' as DifficultyLevel,
    type: 'custom'
}

const WorkoutBuilderContext = createContext<WorkoutBuilderContextType | undefined>(undefined)

export const WorkoutBuilderProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<WorkoutBuilderStep>('basics')
    const [workoutPlan, setWorkoutPlan] = useState<WorkoutBuilderState>(INITIAL_STATE)

    const updateWorkoutPlan = (updates: Partial<WorkoutBuilderState>) => {
        setWorkoutPlan(prev => ({
            ...prev,
            ...updates,
            updatedAt: new Date()
        }))
    }

    const resetBuilder = () => {
        setCurrentStep('basics')
        setWorkoutPlan(INITIAL_STATE)
    }

    const setCurrentStepWithScroll = (step: WorkoutBuilderStep) => {
        setCurrentStep(step)
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
    }

    return (
        <WorkoutBuilderContext.Provider
            value={{
                currentStep,
                workoutPlan,
                setCurrentStep: setCurrentStepWithScroll,
                updateWorkoutPlan,
                resetBuilder
            }}
        >
            {children}
        </WorkoutBuilderContext.Provider>
    )
}

export const useWorkoutBuilderContext = () => {
    const context = useContext(WorkoutBuilderContext)

    if (!context) {
        throw new Error('useWorkoutBuilderContext must be used within WorkoutBuilderProvider')
    }

    return context
}
