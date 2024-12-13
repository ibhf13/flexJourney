import DEFAULT_IMAGE_URL from '@/assets/images/dumbells.jpg'
import { db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import { WorkoutPlan as BaseWorkoutPlan } from '@/features/workout/types/WorkoutTypes'
import { User } from 'firebase/auth'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { WorkoutPlan as BuilderWorkoutPlan } from '../types/workoutBuilderTypes'

const WORKOUT_PLANS_COLLECTION = COLLECTIONS.GLOBAL.WORKOUT_PLANS

export const saveWorkoutPlan = async (
    workoutPlan: BuilderWorkoutPlan,
    description: string = '',
    level: string = 'Beginner',
    type: 'custom' | 'default' = 'custom',
    user: User
): Promise<string> => {
    try {
        if (!user.uid) {
            throw new Error('User ID is required to save workout plan')
        }

        const workoutPlansRef = collection(db, WORKOUT_PLANS_COLLECTION)
        const docId = workoutPlan.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            + '-' + user.email

        const newDocRef = doc(workoutPlansRef, docId)


        const formattedWorkoutPlan: BaseWorkoutPlan = {
            id: docId,
            title: workoutPlan.title,
            description: description || workoutPlan.description,
            imageUrl: workoutPlan.imageUrl || DEFAULT_IMAGE_URL,
            level: workoutPlan.level || level,
            days: workoutPlan.days.map(day => ({
                id: day.id,
                title: day.title,
                description: day.description,
                imageUrl: day.imageUrl || DEFAULT_IMAGE_URL,
                level: day.level || level,
                exercises: day.exercises
            })),
            userId: user.uid,
            type,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        await setDoc(newDocRef, formattedWorkoutPlan)

        return docId
    } catch (error) {
        console.error('Error saving workout plan:', error)
        throw error
    }
}