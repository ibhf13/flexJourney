import { ResponsivePopup } from '@/components/common/Popups'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { LoadingButton } from '@mui/lab'
import { Box, Button, CircularProgress, DialogActions, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAdminExercises } from '../hooks/useAdminExercises'
import { useExerciseImage } from '../hooks/useExerciseImage'
import { useExercises } from '../hooks/useExercises'
import { Exercise } from '../types/ExerciseTypes'

interface AdminExerciseDialogProps {
    exercise: Exercise | null
    onClose: () => void
    open: boolean
}

const ImageUploadBox = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-in-out',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
    position: 'relative',
}))

export const AdminExerciseDialog = ({ exercise, onClose, open }: AdminExerciseDialogProps) => {
    const { updateExercise, isUpdating } = useAdminExercises()
    const { categories } = useExercises()
    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            title: exercise?.title || '',
            description: exercise?.description || '',
            imageUrl: exercise?.imageUrl || '',
            videoUrl: exercise?.videoUrl || '',
            category: exercise?.category || '',
            defaultRestPeriod: exercise?.defaultRestPeriod || 60,
        },
    })
    const { processImage, isUploading } = useExerciseImage({
        onSuccess: (base64String) => {
            setValue('imageUrl', base64String)
        },
    })

    useEffect(() => {
        if (open && exercise) {
            reset({
                title: exercise.title,
                description: exercise.description,
                imageUrl: exercise.imageUrl,
                videoUrl: exercise.videoUrl,
                category: exercise.category,
                defaultRestPeriod: exercise.defaultRestPeriod,
            })
        }
    }, [open, exercise, reset])

    const handleClose = () => {
        reset()
        onClose()
    }

    const onSubmit = async (data: Partial<Exercise>) => {
        if (!exercise?.id) return

        await updateExercise({
            exerciseId: exercise.id,
            updates: data,
        })
        onClose()
    }

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return
        await processImage(file)
    }

    return (
        <ResponsivePopup open={open} onClose={handleClose} maxWidth="sm" headerContent={<Typography variant="h6">Edit Exercise</Typography>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} p={2}>
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

                    <Controller
                        name="imageUrl"
                        control={control}
                        rules={{ required: 'Image is required' }}
                        render={({ field, fieldState }) => (
                            <Box>
                                <Box
                                    component="label"
                                    sx={{ cursor: 'pointer', display: 'block' }}
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                    <ImageUploadBox>
                                        {field.value ? (
                                            <Box
                                                component="img"
                                                src={field.value}
                                                alt="Exercise"
                                                sx={{
                                                    width: '100%',
                                                    height: 200,
                                                    objectFit: 'cover',
                                                    borderRadius: 1,
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                <AddPhotoAlternateIcon
                                                    sx={{
                                                        fontSize: 48,
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                                <Typography color="text.secondary">
                                                    Click or drag and drop to upload image
                                                </Typography>
                                            </Box>
                                        )}
                                        {isUploading && (
                                            <Box
                                                position="absolute"
                                                top={0}
                                                left={0}
                                                right={0}
                                                bottom={0}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <CircularProgress />
                                            </Box>
                                        )}
                                    </ImageUploadBox>
                                </Box>
                                {fieldState.error && (
                                    <Typography
                                        color="error"
                                        variant="caption"
                                        sx={{ mt: 1, display: 'block' }}
                                    >
                                        {fieldState.error.message}
                                    </Typography>
                                )}
                            </Box>
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
                </Stack>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isUpdating}
                    >
                        Save Changes
                    </LoadingButton>
                </DialogActions>
            </form>
        </ResponsivePopup>
    )
} 