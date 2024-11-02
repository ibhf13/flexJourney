
export interface ExerciseSet {
    id: string;
    repetitions: number;
    weight?: number;
    time?: number;
    restPeriod: number;
}

export interface ExerciseFormData {
    sets: ExerciseSet[];
}

export type ExerciseFormProps = {
    exerciseType: 'weight' | 'cardio' | 'bodyweight' | 'cable' | 'machine';
    defaultRestPeriod: number;
    onSubmit: (data: ExerciseFormData) => void;
    onCancel: () => void;
    onChange: () => void;
    initialData?: ExerciseFormData;
};