import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useState } from 'react'
import { WorkoutPlan } from '../types/WorkoutTypes'
import { useDeleteWorkoutPlan } from './useWorkoutQuerys'

interface UsePlanCardProps {
    plan: WorkoutPlan
    onClick: (plan: WorkoutPlan) => void
    onDelete?: () => void
    isLoading?: boolean
    refreshPlans?: () => void
}

export const usePlanCard = ({ plan, onClick, onDelete, isLoading, refreshPlans }: UsePlanCardProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const { user } = useAuthContext()
    const { handleError } = useErrorHandler()
    const { mutate: deletePlan } = useDeleteWorkoutPlan()

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
            await deletePlan(plan.id)
            setDeleteDialogOpen(false)
            onDelete?.()
            refreshPlans?.()
        } catch (error) {
            console.error(`Error deleting workout plan: ${error}`)
            handleError(error, 'error')
        }
    }

    return {
        anchorEl,
        deleteDialogOpen,
        exercisesCount,
        isOwner,
        handleClick,
        handleMenuClick,
        handleMenuClose,
        handleDeleteClick,
        handleDeleteConfirm,
        setDeleteDialogOpen,
    }
}