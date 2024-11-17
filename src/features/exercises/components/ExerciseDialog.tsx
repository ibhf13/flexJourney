import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { Box, Dialog, DialogContent, Grid, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { ExerciseDetails } from './ExerciseDetails'
import { ExerciseModalHeader } from './ExerciseModalHeader'
import { ExerciseVideo } from './ExerciseVideo'

interface ExerciseDialogProps {
    exercise: Exercise
    open: boolean
    onClose: () => void
}

export const ExerciseDialog: React.FC<ExerciseDialogProps> = ({
    exercise,
    open,
    onClose,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
        >
            <ExerciseModalHeader
                title={exercise.title}
                onClose={onClose}
            />

            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ExerciseDetails
                            imageUrl={exercise.imageUrl}
                            description={exercise.description}
                            level={exercise.level}
                            category={exercise.category}
                            type={exercise.type}
                            defaultRestPeriod={exercise.defaultRestPeriod}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ height: '100%' }}>
                            <ExerciseVideo
                                title={exercise.title}
                                videoUrl={exercise.videoUrl}
                                expanded={true}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}