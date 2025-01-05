import { ConfirmationPopUp } from '@/components/common/Popups/ConfirmationPopUp'
import ResponsivePopup from '@/components/common/Popups/ResponsivePopup'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { basicsStep, exercisesStep, planDaysStep, reviewStep } from '../constants'
import { useWorkoutBuilderContext } from '../contexts'
import { StyledDialogContent } from '../styles'
import { CreateNewPlanCard } from './CreateNewPlanCard'
import { ExerciseSelectionStep, PlanBasicsStep, ReviewStep, TrainingDaysStep } from './steps'
import { WorkoutBuilderWizardHeader } from './workoutBuilderWizardHeader'




interface WorkoutBuilderWizardProps {
    onPlanCreated?: () => void
}

const WorkoutBuilderWizard = ({ onPlanCreated }: WorkoutBuilderWizardProps) => {
    const [open, setOpen] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const { currentStep, resetBuilder } = useWorkoutBuilderContext()
    const dialogContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (dialogContentRef.current) {
            dialogContentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [currentStep])

    const handleClose = () => {
        if (currentStep !== reviewStep) {
            setShowConfirmDialog(true)
        } else {
            setOpen(false)
        }
    }

    const handleConfirmClose = () => {
        setOpen(false)
        setShowConfirmDialog(false)
        resetBuilder()
    }

    const renderStep = () => {
        switch (currentStep) {
            case basicsStep:
                return <PlanBasicsStep />
            case planDaysStep:
                return <TrainingDaysStep />
            case exercisesStep:
                return <ExerciseSelectionStep />
            case reviewStep:
                return <ReviewStep onSuccess={() => {
                    setOpen(false)
                    onPlanCreated?.()
                }} />
        }
    }

    return (
        <>
            <CreateNewPlanCard onClick={() => setOpen(true)} />

            <ResponsivePopup
                open={open}
                onClose={handleClose}
                maxWidth="md"
                isCompleteCustomHeader={true}
                headerContent={
                    <WorkoutBuilderWizardHeader
                        currentStep={currentStep}
                        onClose={handleClose}
                    />
                }
                headerStyle={{
                    background: theme => `linear-gradient(135deg, 
                        ${theme.palette.primary.dark} 0%,
                        ${theme.palette.primary.main} 100%)`,
                    color: 'common.white',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    width: '100%'
                }}
            >
                <StyledDialogContent ref={dialogContentRef}>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {renderStep()}
                    </Box>
                </StyledDialogContent>
            </ResponsivePopup>

            <ConfirmationPopUp
                open={showConfirmDialog}
                title="Cancel Workout Creation?"
                message="Are you sure you want to cancel? All progress will be lost."
                onConfirm={handleConfirmClose}
                onCancel={() => setShowConfirmDialog(false)}
            />
        </>
    )
}

export default WorkoutBuilderWizard