import { ResponsivePopup } from '@/components/common/Popups'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ExerciseDetails } from './ExerciseDetails'
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

    return (
        <ResponsivePopup
            open={open}
            onClose={onClose}
            maxWidth="lg"
            headerContent={<Typography variant="h6" component="span">{exercise.title}</Typography>}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <ExerciseDetails
                        imageUrl={exercise.imageUrl ?? ''}
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
                            videoUrl={exercise.videoUrl ?? ''}
                            expanded={true}
                        />
                    </Box>
                </Grid>
            </Grid>
        </ResponsivePopup>
    )
}