import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { WorkoutBuilderStep, WorkoutBuilderStepKeys, WorkoutPlan } from '../types'

export const DIFFICULTY_LEVELS = [
    {
        value: DifficultyLevel.BEGINNER,
        desc: 'Perfect for those just starting their fitness journey'
    },
    {
        value: DifficultyLevel.INTERMEDIATE,
        desc: 'For those with some training experience'
    },
    {
        value: DifficultyLevel.ADVANCED,
        desc: 'Challenging workouts for experienced athletes'
    }
]

export const AVAILABLE_DAYS = [1, 2, 3, 4, 5, 6, 7]


export const basicsStep: WorkoutBuilderStep = { key: WorkoutBuilderStepKeys.BASICS, label: 'Plan Description', progress: 10 }
export const planDaysStep: WorkoutBuilderStep = { key: WorkoutBuilderStepKeys.PLAN_DAYS, label: 'Training Days', progress: 35 }
export const exercisesStep: WorkoutBuilderStep = { key: WorkoutBuilderStepKeys.EXERCISES, label: 'Exercises', progress: 60 }
export const reviewStep: WorkoutBuilderStep = { key: WorkoutBuilderStepKeys.REVIEW, label: 'Review & Save', progress: 90 }

export const STEPS: WorkoutBuilderStep[] = [basicsStep, planDaysStep, exercisesStep, reviewStep]

export const INITIAL_STATE: WorkoutPlan = {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    level: DifficultyLevel.BEGINNER,
    days: [],
    createdAt: new Date(),
    userId: '',
    type: 'custom'
}