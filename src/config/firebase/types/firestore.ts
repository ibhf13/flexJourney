export interface FirestoreCollections {
    workoutPlans: string
    exercises: string
    users: string
    trainingHistory: string
  }
  
  export const COLLECTIONS: FirestoreCollections = {
    workoutPlans: 'workoutPlans',
    exercises: 'exercises',
    users: 'users',
    trainingHistory: 'trainingHistory'
  } as const