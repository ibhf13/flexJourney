import { DEFAULT_IMAGE_URL } from '@/config/constants'
import { createDocument } from '@/config/firebase/operations/database'
import { getGlobalCollection } from '@/config/firebase/utils/helpers'
import { WorkoutPlan } from '../types/workoutBuilderTypes'

const generateDocId = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

export const saveWorkoutPlan = async (
    workoutPlan: WorkoutPlan,
    userId: string
): Promise<string> => {
    const collectionRef = getGlobalCollection('WORKOUT_PLANS')
    const docId = generateDocId(workoutPlan.title)

    const formattedWorkoutPlan = {
        ...workoutPlan,
        imageUrl: workoutPlan.imageUrl || DEFAULT_IMAGE_URL,
        days: workoutPlan.days.map(day => ({
            ...day,
            imageUrl: day.imageUrl || DEFAULT_IMAGE_URL,
            level: day.level || workoutPlan.level
        })),
        userId,
    }

    await createDocument(
        collectionRef,
        formattedWorkoutPlan,
        docId
    )

    return docId
}