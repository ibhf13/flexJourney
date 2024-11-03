import { useMemo, useState } from 'react'
import { Grid } from '@mui/material'
import { Exercise } from '../types/ExerciseTypes';
import { ExerciseCard } from './ExerciseCard';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { useWorkoutContext } from '@/features/workout/contexts/WorkoutContext';
import { reorderExercises } from '../utils/exerciseUtils';

interface ExerciseListProps {
    exercises: Exercise[];
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
    const { completedExercises, selectedPlan, selectedDay } = useWorkoutContext()
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

    const sortedExercises = useMemo(() => {
        return reorderExercises(exercises, completedExercises)
    }, [exercises, completedExercises])

    const handleExerciseSelect = (exercise: Exercise) => {
        if (!completedExercises.includes(exercise.id)) {
            setSelectedExercise(exercise)
        }
    }

    const handleModalClose = () => {
        setSelectedExercise(null)
    }

    return (
        <>
            <Grid container spacing={3}>
                {sortedExercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                        <ExerciseCard
                            exercise={exercise}
                            onSelect={handleExerciseSelect}
                            isCompleted={completedExercises.includes(exercise.id)}
                        />
                    </Grid>
                ))}
            </Grid>

            {selectedExercise && selectedPlan && (
                <ExerciseDetailModal
                    exercise={selectedExercise}
                    day={selectedPlan.days[selectedDay]}
                    open={!!selectedExercise}
                    onClose={handleModalClose}
                />
            )}
        </>
    )
}