export interface FirestoreCollections {
  workoutPlans: string
  exercises: string
  users: string
  trainingHistory: string
  statistics: string
  workoutProgress: string
}

export const COLLECTIONS: FirestoreCollections = {
  workoutPlans: 'workoutPlans',
  exercises: 'exercises',
  users: 'users',
  trainingHistory: 'trainingHistory',
  statistics: 'userStats',
  // statistics: 'statistics',
  workoutProgress: 'workoutProgress'
} as const