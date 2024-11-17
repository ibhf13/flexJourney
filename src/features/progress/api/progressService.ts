import { db } from '@/config/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { DayProgress, WorkoutExercise, WorkoutProgress } from '../types/ProgressTypes'

const COLLECTION_PATH = {
    USERS: 'users',
    WORKOUT_PROGRESS: 'workoutProgress'
} as const

const getUserProgressRef = (userId: string) => {
    return doc(db, COLLECTION_PATH.USERS, userId, COLLECTION_PATH.WORKOUT_PROGRESS, 'current')
}

const createInitialDayProgress = (): DayProgress => ({
    exercises: [],
    isCompleted: false
})

export const initializeProgress = async (userId: string, planId: string): Promise<void> => {
    if (!userId || !planId) {
        throw new Error('Invalid parameters for progress initialization')
    }

    try {
        const progressRef = getUserProgressRef(userId)
        const now = new Date()

        const initialProgress: WorkoutProgress = {
            planId,
            userId,
            currentDay: 0,
            exercises: {},
            startedAt: now,
            lastUpdatedAt: now,
            isCurrentDayCompleted: false
        }

        await setDoc(progressRef, initialProgress)
    } catch (error) {
        console.error('Error initializing progress:', error)
        throw new Error('Failed to initialize workout progress')
    }
}

export const saveExerciseProgress = async (
    userId: string,
    dayId: string,
    exercise: WorkoutExercise
): Promise<void> => {
    if (!userId || !dayId || !exercise) {
        throw new Error('Invalid parameters for saving exercise progress')
    }

    try {
        const progressRef = getUserProgressRef(userId)
        const progressDoc = await getDoc(progressRef)

        if (!progressDoc.exists()) {
            throw new Error('No workout progress found')
        }

        const progress = progressDoc.data() as WorkoutProgress
        const dayProgress = progress.exercises[dayId] || createInitialDayProgress()

        const updatedDayProgress: DayProgress = {
            ...dayProgress,
            exercises: [...(dayProgress.exercises || []), { ...exercise, completedAt: new Date() }],
            isCompleted: exercise.isCompleted
        }

        await updateDoc(progressRef, {
            [`exercises.${dayId}`]: updatedDayProgress,
            lastUpdatedAt: new Date(),
            isCurrentDayCompleted: exercise.isCompleted
        })
    } catch (error) {
        console.error('Error saving exercise progress:', error)
        throw new Error('Failed to save exercise progress')
    }
}

export const getCurrentProgress = async (userId: string): Promise<WorkoutProgress | null> => {
    if (!userId) {
        throw new Error('User ID is required')
    }

    try {
        const progressRef = getUserProgressRef(userId)
        const progressDoc = await getDoc(progressRef)

        return progressDoc.exists() ? (progressDoc.data() as WorkoutProgress) : null
    } catch (error) {
        console.error('Error fetching progress:', error)
        throw new Error('Failed to fetch workout progress')
    }
}