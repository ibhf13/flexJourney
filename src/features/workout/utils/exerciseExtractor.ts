import { Exercise } from "@/features/exercises/types/ExerciseTypes"
import { WORKOUT_PLANS } from '../api/mockData'


export const extractUniqueExercises = (): Exercise[] => {
  const exercisesMap = new Map<string, Exercise>()
  
  WORKOUT_PLANS.forEach(plan => {
    plan.days.forEach(day => {
      day.exercises.forEach(exercise => {
        if (!exercisesMap.has(exercise.id)) {
          exercisesMap.set(exercise.id, exercise)
        }
      })
    })
  })
  
  return Array.from(exercisesMap.values())
}