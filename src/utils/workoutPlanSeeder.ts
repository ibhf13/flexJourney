import { COLLECTIONS } from '@/config/firebase/collections'
import { db } from '@/config/firebase/firebaseConfig'
import { WORKOUT_PLANS } from '@/mocks'
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore'

export const seedWorkoutPlans = async () => {
    try {
        const workoutPlansRef = collection(db, COLLECTIONS.GLOBAL.WORKOUT_PLANS)

        // Clear existing data first
        const existingDocs = await getDocs(workoutPlansRef)
        const batch = writeBatch(db)

        existingDocs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        // Add new workout plans
        WORKOUT_PLANS.forEach((plan) => {
            const docRef = doc(workoutPlansRef, plan.id)

            batch.set(docRef, {
                ...plan,
                isGlobal: true, // Flag to identify seeded plans
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        })

        await batch.commit()

        return { success: true, message: 'Workout plans seeded successfully' }
    } catch (error) {
        console.error('Error seeding workout plans:', error)

        return {
            success: false,
            message: error instanceof Error
                ? `Failed to seed workout plans: ${error.message}`
                : 'Failed to seed workout plans: Unknown error'
        }
    }
}