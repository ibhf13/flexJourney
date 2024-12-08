import { BaseCard } from '@/components/common/Cards'
import { DifficultyChip } from '@/components/common/Forms/DifficultyChip'
import { ConfirmationPopUp } from '@/components/common/Popups/ConfirmationPopUp'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import { Box, CardContent, Chip, Menu, MenuItem, Typography } from '@mui/material'
import { usePlanCard } from '../hooks/usePlanCard'
import { WorkoutPlan } from '../types/WorkoutTypes'

interface PlanCardProps {
  plan: WorkoutPlan
  onClick: (plan: WorkoutPlan) => void
  onDelete?: () => void
  isLoading?: boolean
}

export const PlanCard = ({ plan, onClick, onDelete, isLoading = false }: PlanCardProps) => {
  const {
    anchorEl,
    deleteDialogOpen,
    isOwner,
    handleClick,
    handleMenuClick,
    handleMenuClose,
    handleDeleteClick,
    handleDeleteConfirm,
    setDeleteDialogOpen,
  } = usePlanCard({ plan, onClick, onDelete, isLoading })

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
                    '&:hover': { backgroundColor: 'error.lighter' }
                  }}
                >
                  <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                  Delete Plan
                </MenuItem>
              </Menu>
            </Box>
          )}
          <CardContent>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {plan.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                minHeight: '3em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {plan.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
              <DifficultyChip
                level={plan.level}
                aria-label={`Difficulty level: ${plan.level}`}
              />
              <Chip
                label={`${plan.days.length} days`}
                color="primary"
                size="small"
                variant="outlined"
                aria-label={`Contains ${plan.days.length} days`}
              />
            </Box>
          </CardContent>
        </Box>
      </BaseCard>

      <ConfirmationPopUp
        open={deleteDialogOpen}
        title="Delete Workout Plan"
        message={`Are you sure you want to delete "${plan.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
        buttonText="Delete"
      />
    </>
  )
}