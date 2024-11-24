import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, IconButton, MenuItem, Stack, TextField } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ExerciseSet, Unit } from '../types/HistoryTypes'

interface ExerciseSetEditorProps {
    sets: ExerciseSet[]
    onChange: (sets: ExerciseSet[]) => void
}

export const ExerciseSetEditor = ({ sets, onChange }: ExerciseSetEditorProps) => {
    const handleAddSet = () => {
        onChange([...sets, { weight: 0, reps: 0, time: null, unit: 'kg' }])
    }

    const handleRemoveSet = (index: number) => {
        onChange(sets.filter((_, i) => i !== index))
    }

    const handleSetChange = (index: number, field: keyof ExerciseSet, value: unknown) => {
        onChange(sets.map((set, i) =>
            i === index ? { ...set, [field]: value } : set
        ))
    }

    return (
        <Stack spacing={1.5}>
            <AnimatePresence initial={false}>
                {sets.map((set, index) => (
                    <Box
                        key={index}
                        component={motion.div}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1.5}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                            sx={{
                                p: 1.5,
                                borderRadius: 1,
                                bgcolor: 'background.default',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <TextField
                                label="Weight"
                                type="number"
                                size="small"
                                value={set.weight}
                                onChange={(e) => handleSetChange(index, 'weight', Number(e.target.value))}
                                inputProps={{ min: 0 }}
                                sx={{
                                    minWidth: { xs: '100%', sm: '120px' },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    }
                                }}
                            />
                            <TextField
                                label="Reps"
                                type="number"
                                size="small"
                                value={set.reps}
                                onChange={(e) => handleSetChange(index, 'reps', Number(e.target.value))}
                                inputProps={{ min: 1 }}
                                sx={{
                                    minWidth: { xs: '100%', sm: '120px' },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    }
                                }}
                            />
                            <TextField
                                select
                                label="Unit"
                                size="small"
                                value={set.unit}
                                onChange={(e) => handleSetChange(index, 'unit', e.target.value as Unit)}
                                sx={{
                                    minWidth: { xs: '100%', sm: '100px' },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    }
                                }}
                            >
                                <MenuItem value="kg">kg</MenuItem>
                                <MenuItem value="lbs">lbs</MenuItem>
                            </TextField>
                            <IconButton
                                size="small"
                                onClick={() => handleRemoveSet(index)}
                                disabled={sets.length === 1}
                                sx={{
                                    alignSelf: { xs: 'flex-end', sm: 'center' },
                                    color: 'error.main',
                                    '&:hover': {
                                        bgcolor: 'error.main',
                                        color: 'common.white',
                                    }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Box>
                ))}
            </AnimatePresence>

            <Button
                startIcon={<AddIcon />}
                onClick={handleAddSet}
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                    alignSelf: 'flex-start',
                    borderRadius: '8px',
                    textTransform: 'none',
                }}
            >
                Add Set
            </Button>
        </Stack>
    )
}