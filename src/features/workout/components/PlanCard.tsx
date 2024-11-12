import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { ConfirmationDialog } from '@/components/common/dialogs/ConfirmationDialog'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Chip, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { deleteWorkoutPlan } from '../api/workoutService'
import { WorkoutPlan } from '../types/WorkoutTypes'

interface PlanCardProps {
  plan: WorkoutPlan
  onClick: (plan: WorkoutPlan) => void
  onDelete?: () => void
  isLoading?: boolean
}

export const PlanCard = ({ plan, onClick, onDelete, isLoading = false }: PlanCardProps) => {
  const { user } = useAuthContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const exercisesCount = plan.days.reduce((acc, day) => acc + day.exercises.length, 0)
  const isOwner = user?.uid === plan.userId

  const handleClick = () => {
    if (!isLoading) {
      onClick(plan)
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteWorkoutPlan(plan.id)
      setDeleteDialogOpen(false)
      onDelete?.()
    } catch (error) {
      console.error('Error deleting plan:', error)
    }
  }

  return (
    <>
      <BaseCard
        title={plan.title}
        imageUrl={plan.imageUrl}
        isLoading={isLoading}
        onClick={handleClick}
      >
        <Box sx={{ position: 'relative' }}>
          {isOwner && (
            <>
              <Box sx={{
                position: 'absolute',
                top: -20,
                right: 8,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Chip
                  icon={<PersonIcon />}
                  label="My Plan"
                  size="small"
                  color="primary"
                  onClick={handleMenuClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={(e) => e.stopPropagation()}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={handleDeleteClick}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.lighter'
                      }
                    }}
                  >
                    <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                    Delete Plan
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
          <BaseCardContent
            title={plan.title}
            description={plan.description}
            level={plan.level}
            exercisesCount={exercisesCount}
          />
        </Box>
      </BaseCard>


      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Workout Plan"
        message={`Are you sure you want to delete "${plan.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}