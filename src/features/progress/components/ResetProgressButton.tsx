import { ConfirmationDialog } from '@/components/common/dialogs/ConfirmationDialog'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Button, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useProgressQuery } from '../hooks/useProgressQuery'

interface ResetProgressButtonProps {
    progressId: string
    completedExercises: number
}

export const ResetProgressButton = ({
    progressId,
    completedExercises
}: ResetProgressButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { resetUserProgress, isResetting } = useProgressQuery()

    const handleReset = async () => {
        await resetUserProgress(progressId)
        setIsDialogOpen(false)
    }

    const isDisabled = isResetting || completedExercises === 0

    const button = (
        <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            disabled={isDisabled}
            onClick={() => setIsDialogOpen(true)}
            sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.05)'
                },
                '&.Mui-disabled': {
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.3)'
                }
            }}
        >
            Reset
        </Button>
    )

    return (
        <>
            {isDisabled ? (
                <Tooltip title="Complete at least one exercise to enable reset">
                    <span style={{ display: 'inline-block' }}>{button}</span>
                </Tooltip>
            ) : (
                button
            )}

            <ConfirmationDialog
                open={isDialogOpen}
                title="Reset Progress"
                message={`Are you sure you want to reset your progress? This will clear all ${completedExercises} completed exercises for this plan.`}
                onConfirm={handleReset}
                onCancel={() => setIsDialogOpen(false)}
            />
        </>
    )
}