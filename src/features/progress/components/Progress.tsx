import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { Box, Container } from '@mui/material'
import { useState } from 'react'
import { useCompletedExercises } from '../hooks/useCompletedExercises'
import { useProgress } from '../hooks/useProgress'
import { DaySlider } from './DaySlider'
import { ExerciseList } from './ExerciseList'
import { NoPlanSelected } from './NoPlanSelected'
import { PlanSelectorDialog } from './PlanSelectorDialog'
import { ProgressHeader } from './ProgressHeader'

export const Progress = () => {
    const {
        plans,
        isLoading,
        error,
        progressState,
        handlePlanSelect,
        handleDaySelect
    } = useProgress()

    const [dialogOpen, setDialogOpen] = useState(false)

    // Get completed exercises for the current day
    const { completedExercises } = useCompletedExercises(
        progressState.selectedDay?.id ?? ''
    )

    // Calculate progress values
    const currentDayNumber = progressState.currentDayIndex + 1
    const totalDays = progressState.selectedPlan?.days.length ?? 0
    const totalExercises = progressState.selectedDay?.exercises.length ?? 0
    const completedExercisesCount = completedExercises.size

    const handleOpenPlanSelector = () => setDialogOpen(true)
    const handleClosePlanSelector = () => setDialogOpen(false)

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <ProgressHeader
                    selectedPlan={progressState.selectedPlan}
                    onSelectPlan={handleOpenPlanSelector}
                    currentDay={currentDayNumber}
                    totalDays={totalDays}
                    completedExercises={completedExercisesCount}
                    totalExercises={totalExercises}
                />

                {!progressState.selectedPlan ? (
                    <NoPlanSelected
                        plans={plans}
                        onSelectPlan={handleOpenPlanSelector}
                    />
                ) : (
                    <Box sx={{ mt: 4 }}>
                        <DaySlider
                            days={progressState.selectedPlan.days}
                            currentDayIndex={progressState.currentDayIndex}
                            onDaySelect={handleDaySelect}
                        />

                        {progressState.selectedDay && (
                            <Box sx={{ mt: 4 }}>
                                <ExerciseList
                                    exercises={progressState.selectedDay.exercises}
                                    dayId={progressState.selectedDay.id}
                                />
                            </Box>
                        )}
                    </Box>
                )}

                <PlanSelectorDialog
                    open={dialogOpen}
                    onClose={handleClosePlanSelector}
                    plans={plans || []}
                    isLoading={isLoading}
                    onPlanSelect={handlePlanSelect}
                />
            </Container>
        </LoadingErrorWrapper>
    )
}