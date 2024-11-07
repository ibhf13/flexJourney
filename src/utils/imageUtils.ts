export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

export const validateImage = (file: File, maxSizeMB: number = 1): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes

    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.')
    }

    if (file.size > maxSize) {
        throw new Error(`File size must be less than ${maxSizeMB}MB`)
    }

    return true
}