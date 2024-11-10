import { createContext, ReactNode, useContext, useState } from 'react'
import { WorkoutBuilderStep, WorkoutPlan } from '../types/workoutBuilderTypes'

interface WorkoutBuilderContextType {
    currentStep: WorkoutBuilderStep
    workoutPlan: Partial<WorkoutPlan>
    setCurrentStep: (step: WorkoutBuilderStep) => void
    updateWorkoutPlan: (updates: Partial<WorkoutPlan>) => void
    resetBuilder: () => void
}

const WorkoutBuilderContext = createContext<WorkoutBuilderContextType | undefined>(undefined)

export const WorkoutBuilderProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<WorkoutBuilderStep>('basics')
    const [workoutPlan, setWorkoutPlan] = useState<Partial<WorkoutPlan>>({
        days: [],
        description: '',
        level: 'Beginner'
    })

    const updateWorkoutPlan = (updates: Partial<WorkoutPlan>) => {
        setWorkoutPlan(prev => ({ ...prev, ...updates }))
    }

    const resetBuilder = () => {
        setCurrentStep('basics')
        setWorkoutPlan({
            days: [],
            description: '',
            level: 'Beginner'
        })
    }

    return (
        <WorkoutBuilderContext.Provider
            value={{
                currentStep,
                workoutPlan,
                setCurrentStep,
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
