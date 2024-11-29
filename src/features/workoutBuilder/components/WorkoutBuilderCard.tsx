import { ConfirmationDialog } from '@/components/common/Popups/ConfirmationDialog'
import ResponsivePopup from '@/components/common/Popups/ResponsivePopup'
import { Add } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Card, CardActionArea, DialogContent, IconButton, LinearProgress, Typography, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useWorkoutBuilderContext } from '../contexts/WorkoutBuilderContext'
import { ExerciseSelectionStep } from './WorkoutBuilderWizard/ExerciseSelectionStep'
import { PlanBasicsStep } from './WorkoutBuilderWizard/PlanBasicsStep'
import { ReviewStep } from './WorkoutBuilderWizard/ReviewStep'
import { TrainingDaysStep } from './WorkoutBuilderWizard/TrainingDaysStep'
import { WorkoutBuilderStepper } from './WorkoutBuilderWizard/WorkoutBuilderStepper'

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: theme.spacing(3),
    border: `2px dashed ${theme.palette.primary.main}`,
    background: `linear-gradient(135deg, 
        ${theme.palette.background.paper} 0%,
        ${theme.palette.primary.dark}10 100%)`,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        borderStyle: 'solid',
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(4),
    minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
        width: '8px'
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.background.default,
        borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '4px',
        '&:hover': {
            background: theme.palette.primary.dark
        }
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        minHeight: '85vh'
    },
}))

const DialogHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(135deg, 
        ${theme.palette.primary.dark} 0%,
        ${theme.palette.primary.main} 100%)`,
    color: theme.palette.common.white,
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(to right, 
            transparent 0%,
            ${theme.palette.common.white}40 50%,
            transparent 100%
        )`
    }
}))


const STEPS = [
    { key: 'basics', label: 'Plan Basics', progress: 10 },
    { key: 'days', label: 'Training Days', progress: 35 },
    { key: 'exercises', label: 'Select Exercises', progress: 60 },
    { key: 'review', label: 'Review & Save', progress: 90 }
] as const

interface WorkoutBuilderCardProps {
    onPlanCreated?: () => void
}

export const WorkoutBuilderCard = ({ onPlanCreated }: WorkoutBuilderCardProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const { currentStep, resetBuilder } = useWorkoutBuilderContext()

    const handleClose = () => {
        if (currentStep !== 'review') {
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

    const currentStepIndex = STEPS.findIndex(step => step.key === currentStep)
    const currentProgress = STEPS[currentStepIndex]?.progress || 0

    const renderStep = () => {
        switch (currentStep) {
            case 'basics':
                return <PlanBasicsStep />
            case 'days':
                return <TrainingDaysStep />
            case 'exercises':
                return <ExerciseSelectionStep />
            case 'review':
                return <ReviewStep onSuccess={() => {
                    setOpen(false)
                    onPlanCreated?.()
                }} />
        }
    }

    const headerContent = (
        <>
            <DialogHeader sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                p: theme.spacing(2, 3)
            }}>
                <WorkoutBuilderStepper
                    steps={STEPS}
                    currentStep={currentStep}
                />
                <IconButton
                    onClick={handleClose}
                    size="small"
                    sx={{
                        mb: 4,
                        color: 'inherit',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.2)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogHeader>

            <Box sx={{ position: 'relative' }}>
                <LinearProgress
                    variant="determinate"
                    value={currentProgress}
                    sx={{
                        height: 6,
                        background: theme.palette.divider,
                        '& .MuiLinearProgress-bar': {
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: `linear-gradient(to right,
                            ${theme.palette.primary.main},
                            ${theme.palette.primary.light})`
                        }
                    }}
                />
            </Box>
        </>

    )

    return (
        <>
            <StyledCard elevation={0}>
                <CardActionArea
                    onClick={() => setOpen(true)}
                    sx={{
                        height: '100%',
                        p: { xs: 2, sm: 3 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box sx={{
                        width: { xs: 48, sm: 60 },
                        height: { xs: 48, sm: 60 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, 
                            ${theme.palette.primary.light}20,
                            ${theme.palette.primary.main}40)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 2, sm: 3 }
                    }}>
                        <Add sx={{
                            fontSize: { xs: 24, sm: 32 },
                            color: 'primary.main'
                        }} />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant={isMobile ? "subtitle1" : "h6"}
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                background: `linear-gradient(135deg,
                                    ${theme.palette.primary.main},
                                    ${theme.palette.primary.dark})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Create Custom Plan
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                maxWidth: '80%',
                                mx: 'auto',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Build your own workout plan from scratch
                        </Typography>
                    </Box>
                </CardActionArea>
            </StyledCard>

            <ResponsivePopup
                open={open}
                onClose={handleClose}
                maxWidth="md"
                isCompleteCustomHeader={true}
                headerContent={headerContent}
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
                <StyledDialogContent>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {renderStep()}
                    </Box>
                </StyledDialogContent>
            </ResponsivePopup>

            <ConfirmationDialog
                open={showConfirmDialog}
                title="Cancel Workout Creation?"
                message="Are you sure you want to cancel? All progress will be lost."
                onConfirm={handleConfirmClose}
                onCancel={() => setShowConfirmDialog(false)}
            />
        </>
    )
}