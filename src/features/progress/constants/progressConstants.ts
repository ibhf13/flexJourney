export const PROGRESS_CONSTANTS = {
    QUERY_KEYS: {
        WORKOUT_PROGRESS: 'workoutProgress'
    },
    MESSAGES: {
        SUCCESS: {
            PROGRESS_INITIALIZED: 'Progress initialized successfully',
            EXERCISE_SAVED: 'Exercise progress saved successfully'
        },
        ERROR: {
            INIT_FAILED: 'Failed to initialize progress',
            SAVE_FAILED: 'Failed to save exercise progress',
            FETCH_FAILED: 'Failed to fetch workout progress',
            NO_USER: 'User must be logged in'
        }
    }
} as const