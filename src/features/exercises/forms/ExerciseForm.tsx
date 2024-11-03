import React from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useExerciseForm } from '@/features/exercises/hooks/useExerciseForm';
import { ExerciseFormProps } from '@/features/exercises/types/ExerciseTypes';
import { ExerciseSetForm } from './ExerciseSetForm';

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
    exerciseType,
    defaultRestPeriod,
    onSubmit,
    onCancel,
    onChange,
    initialData,
}) => {

    const {
        control,
        handleSubmit,
        formState: { isDirty, errors, isValid },
        fields,
        remove,
        addSet,
        watch,
    } = useExerciseForm({
        initialData,
        exerciseType,
        defaultRestPeriod,
    });

    const formValues = watch();

    React.useEffect(() => {
        if (onChange && isDirty) {
            onChange();
        }
    }, [formValues, isDirty, onChange]);

    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    const handleAddSet = () => {
        addSet();
    };

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
                        onRemove={index > 0 ? () => {
                            remove(index);
                            if (onChange) onChange();
                        } : undefined}
                        isRemovable={index > 0}
                    />
                ))}

                <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddSet}
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