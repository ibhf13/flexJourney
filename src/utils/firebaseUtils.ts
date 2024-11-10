import { db } from '@/config/firebase/firebase'
import { COLLECTIONS } from '@/config/firebase/types/firestore'
import { WORKOUT_PLANS } from '@/mocks'
import { collection, doc, writeBatch } from 'firebase/firestore'

export const seedWorkoutPlans = async () => {
    try {
        console.log('seeding workout plans')
        const batch = writeBatch(db)
        const workoutPlansRef = collection(db, COLLECTIONS.workoutPlans)

        // Clear existing data first (optional)
        // If you want to clear existing data, you'll need to fetch and delete existing documents first

        // Add new workout plans
        for (const plan of WORKOUT_PLANS) {
            const docRef = doc(workoutPlansRef, plan.id)

            batch.set(docRef, {
                ...plan,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }

        await batch.commit()

        return { success: true, message: 'Workout plans seeded successfully' }
    } catch (error) {
        console.error('Error seeding workout plans:', error)
        if (error instanceof Error) {
            return {
                success: false,
                message: `Failed to seed workout plans: ${error.message}`
            }
        }

        return {
            success: false,
            message: 'Failed to seed workout plans: Unknown error'
        }
    }
}