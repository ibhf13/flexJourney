import { COLLECTIONS } from '@/config/firebase/collections'
import { db } from '@/config/firebase/firebaseConfig'
import { WORKOUT_PLANS } from '@/mocks'
import { collection, doc, writeBatch } from 'firebase/firestore'

export const seedWorkoutPlans = async () => {
    try {
        console.log('seeding workout plans')
        const batch = writeBatch(db)
        const workoutPlansRef = collection(db, COLLECTIONS.GLOBAL.WORKOUT_PLANS)

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



// import { db } from '@/config/firebase/config';
// import { COLLECTIONS } from '@/config/firebase/types/collections';
// import { WORKOUT_PLANS } from '@/mocks';
// import { executeBatch, createBatchOperations } from '@/core/firebase/operations/batch';
// import { getGlobalCollection } from '@/core/firebase/utils/helpers';

// export const seedWorkoutPlans = async () => {
//   try {
//     const operations = WORKOUT_PLANS.map(plan => ({
//       type: 'set' as const,
//       id: plan.id,
//       data: {
//         ...plan,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     }));

//     const batchOperations = createBatchOperations(
//       COLLECTIONS.GLOBAL.WORKOUT_PLANS,
//       operations
//     );

//     await executeBatch(batchOperations);

//     return { success: true, message: 'Workout plans seeded successfully' };
//   } catch (error) {
//     console.error('Error seeding workout plans:', error);
//     return {
//       success: false,
//       message: error instanceof Error
//         ? `Failed to seed workout plans: ${error.message}`
//         : 'Failed to seed workout plans: Unknown error'
//     };
//   }
// };