import { WorkoutDay } from '@/features/workout/types/WorkoutTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { basicsStep, exercisesStep } from '../constants'
import { useWorkoutBuilderContext } from '../contexts'
import { TrainingDaysFormData, trainingDaysSchema } from '../schemas'

const useTrainingDaysStep = () => {
    const { workoutPlan, updateWorkoutPlan, setCurrentStep } = useWorkoutBuilderContext()

    const { control, handleSubmit, formState: { errors } } = useForm<TrainingDaysFormData>({
        resolver: zodResolver(trainingDaysSchema),
        defaultValues: {
            days: workoutPlan.days?.length ? workoutPlan.days.map(day => ({ title: day.title })) : [{ title: 'Day 1' }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'days'
    })

    const handleDaysChange = (numberOfDays: number) => {
        const currentLength = fields.length

        if (numberOfDays > currentLength) {
            for (let i = currentLength; i < numberOfDays; i++) {
                append({ title: `Day ${i + 1}` })
            }
        } else {
            for (let i = currentLength - 1; i >= numberOfDays; i--) {
                remove(i)
            }
        }
    }

    const onSubmit = (data: TrainingDaysFormData) => {
        const completeWorkoutDays: WorkoutDay[] = data.days.map((day) => ({
            id: crypto.randomUUID(),
            title: day.title,
            description: '',
            imageUrl: '',
            level: workoutPlan.level,
            exercises: []
        }))

        updateWorkoutPlan({ days: completeWorkoutDays })
        setCurrentStep(exercisesStep)
    }

    return {
        control,
        fields,
        errors,
        handleSubmit,
        handleDaysChange,
        onSubmit,
        setCurrentStep,
        basicsStep
    }
}

export default useTrainingDaysStep