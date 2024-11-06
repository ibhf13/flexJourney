import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { WorkoutPlan } from '../types/WorkoutTypes'


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
    <BaseCard
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
    </BaseCard>
  )
}