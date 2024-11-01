import { Card, CardContent, CardMedia, Typography, CardActionArea, Chip } from '@mui/material'
import { WorkoutPlan } from '@/features/workout/types/WorkoutTypes'

interface PlanCardProps {
  plan: WorkoutPlan
  onClick: (plan: WorkoutPlan) => void
}

export const PlanCard = ({ plan, onClick }: PlanCardProps) => {
  const handleClick = () => onClick(plan)

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <CardMedia component="img" height="140" image={plan.imageUrl} alt={plan.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {plan.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {plan.description}
          </Typography>
          <Chip
            label={plan.level}
            color={
              plan.level === 'Beginner'
                ? 'success'
                : plan.level === 'Intermediate'
                  ? 'warning'
                  : 'error'
            }
            size="small"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
