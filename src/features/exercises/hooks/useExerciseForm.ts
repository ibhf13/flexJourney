import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, useFieldArray, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { ExerciseFormData } from '../types/ExerciseTypes'
import { exerciseSetSchema } from '../utils/validationSchemas'

interface UseExerciseFormProps {
    initialData?: ExerciseFormData;
    exerciseType: string;
    defaultRestPeriod: number;
}

export const useExerciseForm = ({
    initialData,
    exerciseType,
    defaultRestPeriod,
}: UseExerciseFormProps) => {

    const methods = useForm<ExerciseFormData>({
        resolver: yupResolver(exerciseSetSchema) as unknown as Resolver<ExerciseFormData>,
        defaultValues: initialData || {
            sets: [{
                id: uuidv4(),
                repetitions: 0,
                weight: exerciseType === 'cardio' ? undefined : 0,
                time: exerciseType === 'cardio' ? 0 : undefined,
                restPeriod: defaultRestPeriod,
            }],
        },
        mode: 'onChange',
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'sets',
    });

    const addSet = (): void => {
        append({
            id: uuidv4(),
            repetitions: 0,
            weight: exerciseType === 'cardio' ? undefined : 0,
            time: exerciseType === 'cardio' ? 0 : undefined,
            restPeriod: defaultRestPeriod,
        });
    };

    return {
        ...methods,
        fields,
        addSet,
        remove,

    };
};