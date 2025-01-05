import { createContext, ReactNode, useContext, useState } from 'react'
import { basicsStep, INITIAL_STATE } from '../constants'
import { WorkoutBuilderStep, WorkoutPlan } from '../types/workoutBuilderTypes'

interface WorkoutBuilderContextType {
    currentStep: WorkoutBuilderStep
    workoutPlan: WorkoutPlan
    setCurrentStep: (step: WorkoutBuilderStep) => void
    updateWorkoutPlan: (updates: Partial<WorkoutPlan>) => void
    resetBuilder: () => void
}

const WorkoutBuilderContext = createContext<WorkoutBuilderContextType | undefined>(undefined)

export const WorkoutBuilderProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<WorkoutBuilderStep>(basicsStep)
    const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>(INITIAL_STATE)

    const updateWorkoutPlan = (updates: Partial<WorkoutPlan>) => {
        setWorkoutPlan(prev => ({
            ...prev,
            ...updates,
            updatedAt: new Date()
        }))
    }

    const resetBuilder = () => {
        setCurrentStep(basicsStep)
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

const useWorkoutBuilderContext = () => {
    const context = useContext(WorkoutBuilderContext)

    if (!context) {
        throw new Error('useWorkoutBuilderContext must be used within WorkoutBuilderProvider')
    }

    return context
}

export default useWorkoutBuilderContext