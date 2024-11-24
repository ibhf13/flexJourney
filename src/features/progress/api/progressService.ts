import { db } from '@/config/firebase'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'
import { DayProgress, WorkoutExercise, WorkoutProgress } from '../types/ProgressTypes'

const COLLECTION_PATH = {
    USERS: 'users',
    WORKOUT_PROGRESS: 'workoutProgress'
} as const

const createProgressId = (planId: string): string => {
    const timestamp = Date.now()

    return `${planId}_${timestamp}`
}

const getUserProgressRef = (userId: string, progressId: string) => {
    return doc(db, COLLECTION_PATH.USERS, userId, COLLECTION_PATH.WORKOUT_PROGRESS, progressId)
}

const createInitialDayProgress = (): DayProgress => ({
    exercises: [],
    isCompleted: false
})

export const initializeProgress = async (userId: string, planId: string): Promise<string> => {
    if (!userId || !planId) {
        throw new Error('Invalid parameters for progress initialization')
    }

    try {
        const progressId = createProgressId(planId)
        const progressRef = getUserProgressRef(userId, progressId)
        const now = new Date()

        const initialProgress: WorkoutProgress = {
            progressId,
            planId,
            userId,
            currentDay: 0,
            exercises: {},
            startedAt: now,
            lastUpdatedAt: now,
            isCurrentDayCompleted: false
        }

        await setDoc(progressRef, initialProgress)

        return progressId
    } catch (error) {
        console.error('Error initializing progress:', error)
        throw new Error('Failed to initialize workout progress')
    }
}

export const saveExerciseProgress = async (
    userId: string,
    progressId: string,
    dayId: string,
    exercise: WorkoutExercise
): Promise<void> => {
    if (!userId) {
        throw new Error('User ID is required')
    }

    if (!progressId) {
        throw new Error('Progress ID is required')
    }

    if (!dayId) {
        throw new Error('Day ID is required')
    }

    if (!exercise || !exercise.exerciseId) {
        throw new Error('Valid exercise data is required')
    }

    try {
        const progressRef = getUserProgressRef(userId, progressId)
        const progressDoc = await getDoc(progressRef)

        if (!progressDoc.exists()) {
            throw new Error('No workout progress found')
        }

        const progress = progressDoc.data() as WorkoutProgress
        const dayProgress = progress.exercises[dayId] || createInitialDayProgress()

        const existingExerciseIndex = dayProgress.exercises.findIndex(
            e => e.exerciseId === exercise.exerciseId
        )

        const updatedExercises = [...dayProgress.exercises]

        if (existingExerciseIndex >= 0) {
            updatedExercises[existingExerciseIndex] = {
                ...exercise,
                completedAt: new Date()
            }
        } else {
            updatedExercises.push({
                ...exercise,
                completedAt: new Date()
            })
        }

        const updatedDayProgress: DayProgress = {
            ...dayProgress,
            exercises: updatedExercises,
            isCompleted: exercise.isCompleted,
            completedAt: exercise.isCompleted ? new Date() : undefined
        }

        await updateDoc(progressRef, {
            [`exercises.${dayId}`]: updatedDayProgress,
            lastUpdatedAt: new Date(),
            isCurrentDayCompleted: exercise.isCompleted
        })
    } catch (error) {
        console.error('Error saving exercise progress:', error)
        throw error
    }
}

export const getCurrentProgress = async (userId: string): Promise<WorkoutProgress | null> => {
    if (!userId) {
        throw new Error('User ID is required')
    }

    try {
        const progressCollection = collection(db, COLLECTION_PATH.USERS, userId, COLLECTION_PATH.WORKOUT_PROGRESS)
        const q = query(
            progressCollection,
            orderBy('startedAt', 'desc'),
            limit(1)
        )

        const snapshot = await getDocs(q)

        return snapshot.docs.length > 0 ? (snapshot.docs[0].data() as WorkoutProgress) : null
    } catch (error) {
        console.error('Error fetching progress:', error)
        throw new Error('Failed to fetch workout progress')
    }
}