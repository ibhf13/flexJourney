import { useErrorHandler } from '@/features/errorHandling/hooks/useErrorHandler'
import { ErrorSeverity } from '@/features/errorHandling/types/errorTypes'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { updateUserProfile } from '../api/profileService'
import { UserProfile } from '../types/ProfileTypes'


interface UploadAvatarOptions {
    onSuccess?: (url: string) => void
    onProgress?: (progress: number) => void
    maxSizeMB?: number
    acceptedTypes?: string[]
}

export const useProfileAvatar = (options: UploadAvatarOptions = {}) => {
    const [uploadProgress, setUploadProgress] = useState(0)
    const { currentUser } = useAuthContext()
    const { handleError, showMessage } = useErrorHandler()
    const queryClient = useQueryClient()
    const {
        maxSizeMB = 10,
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
                    const width = img.width
                    const height = img.height

                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext('2d')

                    ctx?.drawImage(img, 0, 0, width, height)

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob)
                            } else {
                                reject(new Error('Failed to compress image'))
                            }
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

    const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
        mutationFn: async (file: File) => {
            if (!currentUser?.uid) throw new Error('No user authenticated')

            const validationError = validateFile(file)

            if (validationError) throw new Error(validationError)

            try {
                const compressedBlob = await compressImage(file)

                const base64String = await convertToBase64(
                    new File([compressedBlob], file.name, { type: 'image/jpeg' })
                )

                const updateData: UserProfile = {
                    id: currentUser.uid,
                    baseInfo: {
                        email: currentUser.email || '',
                        displayName: currentUser.displayName || '',
                        photoURL: base64String,
                    },
                    timestampFields: {
                        updatedAt: new Date(),
                    },
                }

                await updateUserProfile(currentUser.uid, updateData)

                return base64String
            } catch (error) {
                console.error('Avatar upload error:', error)
                if (error instanceof Error) {
                    throw new Error(`Failed to update avatar: ${error.message}`)
                }

                throw new Error('Failed to update avatar')
            }
        },
        onSuccess: (base64String) => {
            queryClient.invalidateQueries({ queryKey: ['profile', currentUser?.uid] })
            showMessage('Profile picture updated successfully', ErrorSeverity.SUCCESS)
            setUploadProgress(0)
            onSuccess?.(base64String)
        },
        onError: (error) => {
            setUploadProgress(0)
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to upload avatar'

            handleError(errorMessage, ErrorSeverity.ERROR)
            console.error('Avatar upload error:', error)
        },
    })

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        try {
            await uploadAvatar(file)
        } catch (error) {
            console.error('Avatar upload failed:', error)
        }
    }

    return {
        handleAvatarChange,
        isUploading,
        uploadProgress,
        validateFile,
    }
}