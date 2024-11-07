import { seedWorkoutPlans } from '../features/workout/api/workoutService'

const runSeed = async () => {
  try {
    await seedWorkoutPlans()
    console.log('Seeding completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

runSeed()
