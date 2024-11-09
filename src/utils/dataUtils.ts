type CleaningOptions = {
    removeEmpty?: boolean
    convertNumbers?: boolean
    dateFields?: string[]
}

export const cleanData = <T extends Record<string, any>>(
    data: T,
    options: CleaningOptions = {}
): Partial<T> => {
    const {
        removeEmpty = true,
        convertNumbers = false,
        dateFields = []
    } = options

    return Object.entries(data).reduce((acc, [key, value]) => {
        // Skip undefined values
        if (value === undefined) {
            return acc
        }

        // Skip empty strings if removeEmpty is true
        if (removeEmpty && value === '') {
            return acc
        }

        // Handle date fields
        if (dateFields.includes(key) && value instanceof Date) {
            acc[key as keyof T] = value as T[keyof T]

            return acc
        }

        // Convert number strings to numbers if convertNumbers is true
        if (convertNumbers && typeof value === 'string' && ['height', 'weight', 'targetWeight'].includes(key)) {
            const numValue = Number(value)

            if (!isNaN(numValue) && numValue > 0) {
                acc[key as keyof T] = numValue as any

                return acc
            }
        }

        acc[key as keyof T] = value

        return acc
    }, {} as Partial<T>)
}