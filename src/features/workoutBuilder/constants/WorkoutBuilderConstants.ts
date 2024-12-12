import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'

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