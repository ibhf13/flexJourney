import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface UploadImageOptions {
    onSuccess?: (url: string) => void
    onProgress?: (progress: number) => void
    maxSizeMB?: number
    acceptedTypes?: string[]
}

export const useExerciseImage = (options: UploadImageOptions = {}) => {
    const [uploadProgress, setUploadProgress] = useState(0)
    const { handleError, showMessage } = useErrorHandler()
    const queryClient = useQueryClient()
    const {
        maxSizeMB = 5,
        acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
        onSuccess,
    } = options

    const validateFile = (file: File): string | null => {
        if (!acceptedTypes.includes(file.type)) {
            return 'Invalid file type. Please upload a valid image file.'
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            return `File size should not exceed ${maxSizeMB}MB.`
        }

        return null
    }

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    const compressImage = async (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                const img = new Image()

                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height
                    const MAX_WIDTH = 800
                    const MAX_HEIGHT = 800

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = height * (MAX_WIDTH / width)
                            width = MAX_WIDTH
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = width * (MAX_HEIGHT / height)
                            height = MAX_HEIGHT
                        }
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')

                    ctx?.drawImage(img, 0, 0, width, height)

                    canvas.toBlob(
                        (blob) => {
                            if (blob) resolve(blob)
                            else reject(new Error('Failed to compress image'))
                        },
                        'image/jpeg',
                        0.7
                    )
                }

                img.src = event.target?.result as string
            }

            reader.onerror = () => reject(new Error('Failed to read file'))
            reader.readAsDataURL(file)
        })
    }

    const { mutate: processImage, isPending: isUploading } = useMutation({
        mutationFn: async (file: File) => {
            const validationError = validateFile(file)

            if (validationError) throw new Error(validationError)

            try {
                const compressedBlob = await compressImage(file)
                const base64String = await convertToBase64(
                    new File([compressedBlob], file.name, { type: 'image/jpeg' })
                )

                return base64String
            } catch (error) {
                console.error('Image processing error:', error)
                throw new Error('Failed to process image')
            }
        },
        onSuccess: (base64String) => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] })
            showMessage('Image uploaded successfully', 'success')
            setUploadProgress(0)
            onSuccess?.(base64String)
        },
        onError: (error) => {
            setUploadProgress(0)
            handleError(error instanceof Error ? error.message : 'Failed to upload image', 'error')
        },
    })

    return {
        processImage,
        isUploading,
        uploadProgress,
        validateFile,
    }
}