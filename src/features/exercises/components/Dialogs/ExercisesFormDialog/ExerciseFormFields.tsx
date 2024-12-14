// src/features/exercises/components/Dialogs/ExercisesFormDialog/ExerciseFormFields.tsx
import { CustomTypeMenuItem } from '@/features/exercises/styles/exerciseFormStyles'
import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { PREDEFINED_EXERCISE_TYPES } from '../../../types/ExerciseTypes'
import { ImageUpload } from './ImageUpload'

interface ExerciseFormValues {
    title: string
    description: string
    imageUrl: string
    videoUrl: string
    category: string
    defaultRestPeriod: number
    level: DifficultyLevel
    type: string
}

interface ExerciseFormFieldsProps {
    control: Control<ExerciseFormValues>
    categories: string[]
    setValue: UseFormSetValue<ExerciseFormValues>
}

export const ExerciseFormFields = ({ control, categories, setValue }: ExerciseFormFieldsProps) => {
    return (
        <Stack spacing={2}>
            <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Title"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Description"
                        multiline
                        rows={3}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                    />
                )}
            />

            <ImageUpload control={control} setValue={setValue} />

            <Controller
                name="type"
                control={control}
                rules={{ required: 'Type is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        select
                        label="Exercise Type"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            },
                        }}
                    >
                        {Object.values(PREDEFINED_EXERCISE_TYPES).map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                        {field.value && !Object.values(PREDEFINED_EXERCISE_TYPES).includes(field.value as any) && (
                            <MenuItem value={field.value}>
                                {field.value}
                            </MenuItem>
                        )}
                        <CustomTypeMenuItem>
                            <TextField
                                placeholder="Enter custom type"
                                fullWidth
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    const sanitizedValue = e.target.value
                                        .replace(/[^a-zA-Z0-9\s]/g, '')
                                        .toUpperCase()

                                    e.target.value = sanitizedValue
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        const customValue = (e.target as HTMLInputElement).value

                                        if (customValue) {
                                            field.onChange(customValue);
                                            (e.target as HTMLInputElement).value = ''
                                            const selectElement = e.currentTarget.closest('.MuiSelect-select')

                                            if (selectElement) {
                                                (selectElement as HTMLElement).click()
                                            }
                                        }
                                    }
                                }}
                                InputProps={{
                                    onBlur: (e) => {
                                        const customValue = e.target.value

                                        if (customValue) {
                                            field.onChange(customValue)
                                            e.target.value = ''
                                        }
                                    },
                                }}
                            />
                        </CustomTypeMenuItem>
                    </TextField>
                )}
            />

            <Controller
                name="videoUrl"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Video URL"
                        type="url"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        select
                        label="Category"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                    >
                        {categories?.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="defaultRestPeriod"
                control={control}
                rules={{
                    required: 'Rest period is required',
                    min: { value: 0, message: 'Rest period must be positive' }
                }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        type="number"
                        label="Default Rest Period (seconds)"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="level"
                control={control}
                rules={{ required: 'Level is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        select
                        label="Difficulty Level"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                    >
                        {Object.values(DifficultyLevel).map((level) => (
                            <MenuItem key={level} value={level}>
                                {level}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        </Stack>
    )
}