import { WorkoutPlan } from '../types/WorkoutTypes'
import { BaseWorkoutCard } from './common/BaseWorkoutCard'
import { BaseCardContent } from './common/BaseCardContent'


interface PlanCardProps {
  plan: WorkoutPlan
  onClick: (plan: WorkoutPlan) => void
  isLoading?: boolean
}

export const PlanCard = ({ plan, onClick, isLoading = false }: PlanCardProps) => {

  const exercisesCount = plan.days.reduce((acc, day) => acc + day.exercises.length, 0)

  const handleClick = () => {
    if (!isLoading) {
      onClick(plan)
    }
  }

  return (
    <BaseWorkoutCard
      title={plan.title}
      imageUrl={plan.imageUrl}
      isLoading={isLoading}
      onClick={handleClick}
    >
      <BaseCardContent
        title={plan.title}
        description={plan.description}
        level={plan.level}
        exercisesCount={exercisesCount}
      />
    </BaseWorkoutCard>
  )
}