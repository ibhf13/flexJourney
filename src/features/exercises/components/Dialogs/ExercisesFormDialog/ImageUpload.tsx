import { DifficultyLevel } from '@/features/workout/types/WorkoutTypes'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { useExerciseImage } from '../../../hooks'
import { ImageUploadBox } from '../../../styles/exerciseFormStyles'

interface ImageUploadProps {
    control: Control<{
        title: string
        description: string
        imageUrl: string
        videoUrl: string
        category: string
        defaultRestPeriod: number
        level: DifficultyLevel
        type: string
    }>
    setValue: UseFormSetValue<{
        title: string
        description: string
        imageUrl: string
        videoUrl: string
        category: string
        defaultRestPeriod: number
        level: DifficultyLevel
        type: string
    }>
}

export const ImageUpload = ({ control, setValue }: ImageUploadProps) => {
    const { processImage, isUploading } = useExerciseImage({
        onSuccess: (base64String) => {
            setValue('imageUrl', base64String)
        },
    })

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return
        await processImage(file)
    }

    return (
        <Controller
            name="imageUrl"
            control={control}
            rules={{ required: 'Image is required' }}
            render={({ field, fieldState }) => (
                <Box>
                    <Box component="label" sx={{ cursor: 'pointer', display: 'block' }}>
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
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                }}>
                                    <AddPhotoAlternateIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
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
                        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {fieldState.error.message}
                        </Typography>
                    )}
                </Box>
            )}
        />
    )
}