import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Chip, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { canEditExercise } from '../api/exerciseService'
import { useExercisesQuery } from '../hooks/useExercisesQuery'
import { Exercise } from '../types/ExerciseTypes'

interface ExerciseCardProps {
    exercise: Exercise
    onEdit?: (exercise: Exercise) => void
    onDelete?: (exercise: Exercise) => void
    onView?: (exercise: Exercise) => void
}

export const ExerciseCard = ({
    exercise,
    onEdit,
    onDelete,
    onView,
}: ExerciseCardProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const canEdit = canEditExercise(exercise)
    const { isUpdating, isDeleting } = useExercisesQuery()

    const handleCardClick = () => {
        onView?.(exercise)
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = (event: React.MouseEvent) => {
        event.stopPropagation()
        setAnchorEl(null)
    }

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setAnchorEl(null)
        if (!isUpdating && onEdit) {
            onEdit(exercise)
        }
    }

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setAnchorEl(null)
        if (!isDeleting && onDelete) {
            onDelete(exercise)
        }
    }

    return (
        <BaseCard
            title={exercise.title}
            imageUrl={exercise.imageUrl}
            imageHeight={200}
            onClick={handleCardClick}
            actionButton={canEdit && (
                <>
                    <IconButton
                        onClick={handleMenuOpen}
                        disabled={isUpdating || isDeleting}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            width: 24,
                            height: 24,
                            bgcolor: 'background.paper',
                            '&:hover': {
                                bgcolor: 'action.hover',
                            },
                            zIndex: 1
                        }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MenuItem
                            onClick={handleEditClick}
                            disabled={isUpdating}
                        >
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={handleDeleteClick}
                            disabled={isDeleting}
                        >
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </>
            )}
            sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
            }}
        >
            <BaseCardContent
                title={exercise.title}
                description={exercise.description}
                level={exercise.level as DifficultyLevel}
                category={exercise.category}
            >
                <Chip
                    label={`Rest: ${exercise.defaultRestPeriod}s`}
                    size="small"
                    variant="outlined"
                    color="primary"
                />
                <Chip
                    label={exercise.type}
                    size="small"
                    variant="outlined"
                    color="secondary"
                />
            </BaseCardContent>
        </BaseCard>
    )
}