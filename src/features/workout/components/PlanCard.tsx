import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { useAuthContext } from '@/contexts/AuthContext'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Chip } from '@mui/material'
import { WorkoutPlan } from '../types/WorkoutTypes'

interface PlanCardProps {
  plan: WorkoutPlan
  onClick: (plan: WorkoutPlan) => void
  isLoading?: boolean
}

export const PlanCard = ({ plan, onClick, isLoading = false }: PlanCardProps) => {
  const { user } = useAuthContext()
  const exercisesCount = plan.days.reduce((acc, day) => acc + day.exercises.length, 0)
  const isOwner = user?.uid === plan.userId

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
      <Box sx={{ position: 'relative' }}>
        {isOwner && (
          <Chip
            icon={<PersonIcon />}
            label="My Plan"
            size="small"
            color="primary"
            sx={{
              position: 'absolute',
              top: -20,
              right: 0,
              zIndex: 1
            }}
          />
        )}
        <BaseCardContent
          title={plan.title}
          description={plan.description}
          level={plan.level}
          exercisesCount={exercisesCount}
        />
      </Box>
    </BaseCard>
  )
}