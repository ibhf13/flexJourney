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
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Title"
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Description"
                        multiline
                        rows={3}
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                    />
                )}
            />

            <ImageUpload control={control} setValue={setValue} />

            <Controller
                name="type"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        select
                        label="Exercise Type"
                        error={!!error}
                        helperText={error?.message}
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
                                            field.onChange(customValue)
                                                ; (e.target as HTMLInputElement).value = ''
                                            const selectElement = e.currentTarget.closest('.MuiSelect-select')

                                            if (selectElement) {
                                                (selectElement as HTMLElement).click()
                                            }
                                        }
                                    }
                                }}
                            />
                        </CustomTypeMenuItem>
                    </TextField>
                )}
            />

            <Controller
                name="videoUrl"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        label="Video URL"
                        type="url"
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="category"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        select
                        label="Category"
                        error={!!error}
                        helperText={error?.message}
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
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        type="number"
                        label="Default Rest Period (seconds)"
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="level"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        select
                        label="Difficulty Level"
                        error={!!error}
                        helperText={error?.message}
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