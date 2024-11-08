import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton, MenuItem, TextField } from '@mui/material'
import { ExerciseSet } from '../types/HistoryTypes'

interface ExerciseSetEditorProps {
    sets: ExerciseSet[]
    onChange: (sets: ExerciseSet[]) => void
}

export const ExerciseSetEditor = ({ sets, onChange }: ExerciseSetEditorProps) => {
    const handleAddSet = () => {
        onChange([...sets, { weight: 0, reps: 0, unit: 'kg' }])
    }

    const handleRemoveSet = (index: number) => {
        onChange(sets.filter((_, i) => i !== index))
    }

    const handleSetChange = (index: number, field: keyof ExerciseSet, value: any) => {
        onChange(sets.map((set, i) =>
            i === index ? { ...set, [field]: value } : set
        ))
    }

    return (
        <Box>
            {sets.map((set, index) => (
                <Box key={index} display="flex" gap={2} mb={1} alignItems="center">
                    <TextField
                        label="Weight"
                        type="number"
                        size="small"
                        value={set.weight}
                        onChange={(e) => handleSetChange(index, 'weight', Number(e.target.value))}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        label="Reps"
                        type="number"
                        size="small"
                        value={set.reps}
                        onChange={(e) => handleSetChange(index, 'reps', Number(e.target.value))}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        select
                        label="Unit"
                        size="small"
                        value={set.unit}
                        onChange={(e) => handleSetChange(index, 'unit', e.target.value)}
                    >
                        <MenuItem value="kg">kg</MenuItem>
                        <MenuItem value="lbs">lbs</MenuItem>
                    </TextField>
                    <IconButton
                        size="small"
                        onClick={() => handleRemoveSet(index)}
                        disabled={sets.length === 1}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <IconButton onClick={handleAddSet} color="primary">
                <AddIcon />
            </IconButton>
        </Box>
    )
}