
export interface Exercise {
    id: string
    title: string
    description: string
    imageUrl?: string
    category: string
    type: string
    level: string
    defaultRestPeriod: number
    createdAt?: Date
    updatedAt?: Date
}

export interface ExerciseSet {
    id: string
    repetitions: number
    weight?: number
    time?: number
    restPeriod: number
}

export interface ExerciseFormData {
    sets: ExerciseSet[]
}

export type ExerciseFormProps = {
    exerciseType: string
    defaultRestPeriod: number
    onSubmit: (data: ExerciseFormData) => void
    onCancel: () => void
    onChange: () => void
    initialData?: ExerciseFormData
}