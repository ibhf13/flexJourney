type CleaningOptions = {
    removeEmpty?: boolean
    convertNumbers?: boolean
    dateFields?: string[]
}

type DataRecord = Record<string, string | number | Date | undefined>

export const cleanData = <T extends DataRecord>(
    data: T,
    options: CleaningOptions = {}
): Partial<T> => {
    const {
        removeEmpty = true,
        convertNumbers = false,
        dateFields = []
    } = options

    return Object.entries(data).reduce((acc, [key, value]) => {
        if (value === undefined) {
            return acc
        }

        if (removeEmpty && value === '') {
            return acc
        }

        if (dateFields.includes(key) && value instanceof Date) {
            acc[key as keyof T] = value as T[keyof T]

            return acc
        }

        if (convertNumbers && typeof value === 'string' && ['height', 'weight', 'targetWeight'].includes(key)) {
            const numValue = Number(value)

            if (!isNaN(numValue) && numValue > 0) {
                acc[key as keyof T] = numValue as T[keyof T]

                return acc
            }
        }

        acc[key as keyof T] = value as T[keyof T]

        return acc
    }, {} as Partial<T>)
}