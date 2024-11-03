import {
    Box,
    Stack,
    Typography,
    IconButton,
    Paper,
    Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Control } from 'react-hook-form';
import { ExerciseFormData } from '@/features/exercises/types/ExerciseTypes';
import { FormTextField } from '@/components/common/FormTextField';

interface ExerciseSetFormProps {
    control: Control<ExerciseFormData>;
    index: number;
    exerciseType: string;
    defaultRestPeriod: number;
    onRemove?: () => void;
    isRemovable?: boolean;
}

export const ExerciseSetForm = ({
    control,
    index,
    exerciseType,
    defaultRestPeriod,
    onRemove,
    isRemovable = false,
}: ExerciseSetFormProps) => {
    const showWeightField = ['weight', 'cable', 'machine'].includes(exerciseType);
    const showTimeField = exerciseType === 'cardio';

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                mb: 2,
                position: 'relative',
                '&:hover': {
                    bgcolor: 'action.hover'
                }
            }}
        >
            <Stack spacing={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
                        Set {index + 1}
                    </Typography>
                    {isRemovable && onRemove && (
                        <Tooltip title="Remove Set">
                            <IconButton
                                onClick={onRemove}
                                size="small"
                                color="error"
                                aria-label={`Remove set ${index + 1}`}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <FormTextField
                    control={control}
                    name={`sets.${index}.repetitions`}
                    label="Repetitions"
                    type="number"
                    rules={{
                        required: 'Repetitions are required',
                        min: {
                            value: 1,
                            message: 'Minimum 1 repetition'
                        }
                    }}
                    fullWidth
                />

                {showWeightField && (
                    <FormTextField
                        control={control}
                        name={`sets.${index}.weight`}
                        label="Weight (kg)"
                        type="number"
                        rules={{
                            required: 'Weight is required',
                            min: {
                                value: 0,
                                message: 'Weight cannot be negative'
                            }
                        }}
                        fullWidth
                    />
                )}

                {showTimeField && (
                    <FormTextField
                        control={control}
                        name={`sets.${index}.time`}
                        label="Time (seconds)"
                        type="number"
                        rules={{
                            required: 'Time is required',
                            min: {
                                value: 1,
                                message: 'Minimum 1 second'
                            }
                        }}
                        fullWidth
                    />
                )}

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    Rest Period: {defaultRestPeriod} seconds
                </Typography>
            </Stack>
        </Paper>
    );
};