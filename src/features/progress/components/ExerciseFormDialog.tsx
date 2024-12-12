import ResponsivePopup from '@/components/common/Popups/ResponsivePopup'
import { Exercise } from '@/features/workout/types/WorkoutTypes'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    Button,
    DialogActions,
    IconButton,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { ExerciseSet, WeightUnit } from '../types/ProgressTypes'

interface ExerciseFormDialogProps {
    exercise: Exercise
    open: boolean
    onClose: () => void
    onSave: (sets: ExerciseSet[]) => void
    isLoading?: boolean
}

const INITIAL_SET: ExerciseSet = {
    weight: 0,
    reps: 0,
    unit: WeightUnit.KG,
    isCompleted: false
}

export const ExerciseFormDialog = ({
    exercise,
    open,
    onClose,
    onSave,
    isLoading = false
}: ExerciseFormDialogProps) => {
    const [sets, setSets] = useState<ExerciseSet[]>([INITIAL_SET])

    const handleAddSet = () => {
        setSets(prevSets => [...prevSets, { ...INITIAL_SET }])
    }

    const handleRemoveSet = (index: number) => {
        setSets(prevSets => prevSets.filter((_, i) => i !== index))
    }

    const handleSetChange = (index: number, field: keyof ExerciseSet, value: string) => {
        setSets(prevSets => {
            const newSets = [...prevSets]

            newSets[index] = {
                ...newSets[index],
                [field]: field === 'unit' ? value : Number(value)
            }

            return newSets
        })
    }

    const handleSave = () => {
        const completedSets = sets.map(set => ({
            ...set,
            isCompleted: true
        }))

        onSave(completedSets)
        resetForm()
        onClose()
    }

    const resetForm = () => {
        setSets([INITIAL_SET])
    }

    const isValid = sets.every(set =>
        set.weight !== undefined &&
        set.weight > 0 &&
        set.reps !== undefined &&
        set.reps > 0
    )

    const headerContent = (
        <Typography variant="h6">
            {exercise.title}
        </Typography>
    )

    return (
        <ResponsivePopup
            open={open}
            onClose={onClose}
            maxWidth="sm"
            title={exercise.title}
            headerContent={headerContent}
            contentStyle={{
                bgcolor: 'background.paper'
            }}
        >
            <Box sx={{ mb: 3, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Sets
                </Typography>
                {sets.map((set, index) => (
                    <SetInputRow
                        key={index}
                        set={set}
                        index={index}
                        onSetChange={handleSetChange}
                        onRemove={handleRemoveSet}
                        isRemoveDisabled={sets.length === 1}
                    />
                ))}
                <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddSet}
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                >
                    Add Set
                </Button>
            </Box>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!isValid || isLoading}
                    sx={{
                        bgcolor: 'success.main',
                        '&:hover': {
                            bgcolor: 'success.dark'
                        }
                    }}
                >
                    {isLoading ? 'Saving...' : 'Save Progress'}
                </Button>
            </DialogActions>
        </ResponsivePopup>
    )
}

interface SetInputRowProps {
    set: ExerciseSet
    index: number
    onSetChange: (index: number, field: keyof ExerciseSet, value: string) => void
    onRemove: (index: number) => void
    isRemoveDisabled: boolean
}

const SetInputRow = ({
    set,
    index,
    onSetChange,
    onRemove,
    isRemoveDisabled
}: SetInputRowProps) => (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
            label="Weight"
            type="number"
            size="small"
            value={set.weight || ''}
            onChange={(e) => onSetChange(index, 'weight', e.target.value)}
            InputProps={{
                inputProps: { min: 0 }
            }}
        />
        <TextField
            label="Reps"
            type="number"
            size="small"
            value={set.reps || ''}
            onChange={(e) => onSetChange(index, 'reps', e.target.value)}
            InputProps={{
                inputProps: { min: 0 }
            }}
        />
        <IconButton
            color="error"
            onClick={() => onRemove(index)}
            disabled={isRemoveDisabled}
        >
            <DeleteIcon />
        </IconButton>
    </Box>
)