export const COLLECTIONS = {
  GLOBAL: {
    EXERCISES: 'exercises',
    WORKOUT_PLANS: 'workoutPlans',
  },
  USERS: {
    COLLECTION: 'users',
    SUB_COLLECTIONS: {
      TRAINING_HISTORY: 'trainingHistory',
      WORKOUT_PROGRESS: 'workoutProgress',
      STATS: 'stats',
      SETTINGS: 'settings',
      PROFILE: 'profile'
    }
  }
} as const

// Type definitions for collection paths
export type CollectionPath =
  | `${typeof COLLECTIONS.GLOBAL.EXERCISES}`
  | `${typeof COLLECTIONS.GLOBAL.WORKOUT_PLANS}`
  | `${typeof COLLECTIONS.USERS.COLLECTION}/${string}`
  | `${typeof COLLECTIONS.USERS.COLLECTION}/${string}/${typeof COLLECTIONS.USERS.SUB_COLLECTIONS.TRAINING_HISTORY}`
  | `${typeof COLLECTIONS.USERS.COLLECTION}/${string}/${typeof COLLECTIONS.USERS.SUB_COLLECTIONS.WORKOUT_PROGRESS}`
  | `${typeof COLLECTIONS.USERS.COLLECTION}/${string}/${typeof COLLECTIONS.USERS.SUB_COLLECTIONS.STATS}`
  | `${typeof COLLECTIONS.USERS.COLLECTION}/${string}/${typeof COLLECTIONS.USERS.SUB_COLLECTIONS.SETTINGS}`
  | `${typeof COLLECTIONS.USERS.COLLECTION}/${string}/${typeof COLLECTIONS.USERS.SUB_COLLECTIONS.PROFILE}`