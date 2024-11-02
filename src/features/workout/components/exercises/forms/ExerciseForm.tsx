import React from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useExerciseForm } from '@/features/workout/hooks/useExerciseForm';
import { ExerciseFormProps } from '@/features/workout/types/ExerciseTypes';
import { ExerciseSetForm } from './ExerciseSetForm';

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
    exerciseType,
    defaultRestPeriod,
    onSubmit,
    onCancel,
    initialData,
}) => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        fields,
        remove,
        addSet,
    } = useExerciseForm({
        initialData,
        exerciseType,
        defaultRestPeriod,
    });


    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    return (
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
            <Stack spacing={2}>
                {fields.map((field, index) => (
                    <ExerciseSetForm
                        key={field.id}
                        control={control}
                        index={index}
                        exerciseType={exerciseType}
                        defaultRestPeriod={defaultRestPeriod}
                        onRemove={index > 0 ? () => remove(index) : undefined}
                        isRemovable={index > 0}
                    />
                ))}

                <Button
                    startIcon={<AddIcon />}
                    onClick={addSet}
                    variant="outlined"
                    fullWidth
                >
                    Add Set
                </Button>

                {errors.sets && (
                    <Typography color="error" variant="caption">
                        {errors.sets.message}
                    </Typography>
                )}

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button onClick={onCancel} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};