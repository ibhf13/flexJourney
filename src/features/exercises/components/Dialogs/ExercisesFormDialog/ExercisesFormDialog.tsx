import { ResponsivePopup } from '@/components/common/Popups'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, Typography } from '@mui/material'
import { useExerciseForm, useExercisesQuery } from '../../../hooks'
import { Exercise } from '../../../types/ExerciseTypes'
import { ExerciseFormFields } from './ExerciseFormFields'

interface ExercisesFormDialogProps {
    exercise: Exercise | null
    onClose: () => void
    open: boolean
    mode: 'create' | 'edit'
}

export const ExercisesFormDialog = ({ exercise, onClose, open, mode }: ExercisesFormDialogProps) => {
    const { categories } = useExercisesQuery()
    const { control, handleSubmit, handleClose, onSubmit, isUpdating, isCreating, setValue } = useExerciseForm({
        exercise,
        mode,
        onClose,
        open,
    })

    const headerContent = <Typography variant="h6">{mode === 'create' ? 'Add New Exercise' : 'Edit Exercise'}</Typography>

    return (
        <ResponsivePopup open={open} onClose={handleClose} maxWidth="sm" headerContent={headerContent}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ExerciseFormFields
                    control={control}
                    categories={categories || []}
                    setValue={setValue}
                />
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isUpdating || isCreating}
                    >
                        {mode === 'create' ? 'Create Exercise' : 'Save Changes'}
                    </LoadingButton>
                </DialogActions>
            </form>
        </ResponsivePopup>
    )
} 