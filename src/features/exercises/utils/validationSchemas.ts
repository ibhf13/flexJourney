import * as yup from 'yup'

const exerciseSetSchema = yup.object().shape({
    sets: yup.array().of(
        yup.object().shape({
            repetitions: yup
                .number()
                .required('Repetitions are required')
                .positive('Repetitions must be a positive number')
                .integer('Repetitions must be a whole number')
                .min(1, 'Repetitions must be at least 1'),
            weight: yup
                .number()
                .nullable()
                .transform((value, originalValue) =>
                    originalValue?.trim?.() === '' ? null : value)
                .typeError('Weight must be a number')
                .positive('Weight must be a positive number'),
            time: yup
                .number()
                .nullable()
                .transform((value, originalValue) =>
                    originalValue?.trim?.() === '' ? null : value)
                .typeError('Time must be a number')
                .positive('Time must be a positive number'),
            restPeriod: yup
                .number()
                .required('Rest period is required')
                .positive('Rest period must be a positive number')
                .integer('Rest period must be a whole number')
                .min(5, 'Rest period must be at least 5 seconds'),
        }).test(
            'weight-or-time',
            'Either weight or time is required',
            function (value) {
                return value.weight != null || value.time != null;
            }
        )
    ).required().min(1, 'At least one set is required'),
});

export { exerciseSetSchema }
