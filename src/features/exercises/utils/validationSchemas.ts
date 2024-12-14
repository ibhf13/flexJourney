import { z } from 'zod'

const exerciseSetSchema = z.object({
    sets: z.array(
        z.object({
            repetitions: z.number()
                .min(1, 'Repetitions must be at least 1')
                .int('Repetitions must be a whole number')
                .positive('Repetitions must be a positive number'),
            weight: z.number()
                .nullable()
                .transform((value) =>
                    typeof value === 'string' && value === '' ? null : Number(value))
                .refine((val) => val === null || val > 0, 'Weight must be a positive number')
                .optional(),
            time: z.number()
                .nullable()
                .transform((value) =>
                    typeof value === 'string' && value === '' ? null : Number(value))
                .refine((val) => val === null || val > 0, 'Time must be a positive number')
                .optional(),
            restPeriod: z.number()
                .min(5, 'Rest period must be at least 5 seconds')
                .int('Rest period must be a whole number')
                .positive('Rest period must be a positive number'),
        }).refine(
            (data) => data.weight !== null || data.time !== null,
            'Either weight or time is required'
        )
    )
        .min(1, 'At least one set is required'),
})

export type ExerciseSetFormData = z.infer<typeof exerciseSetSchema>
export { exerciseSetSchema }

