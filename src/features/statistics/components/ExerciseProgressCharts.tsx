import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
    useTheme
} from '@mui/material'
import { useState } from 'react'
import { useStatistics } from '../hooks/useStatistics'
import { accordionStyles } from '../styles/statisticsStyles'
import { ExerciseProgress } from '../types/statistics'
import { ChartLegend } from './chart/ChartLegend'
import { ExerciseChart } from './common/ExerciseChart'
import { ExerciseSelector } from './exercise/ExerciseSelector'
import { ExerciseStats } from './exercise/ExerciseStats'


export const ExerciseProgressCharts = () => {
    const { stats } = useStatistics()
    const [selectedExercise, setSelectedExercise] = useState<string>('')
    const [expanded, setExpanded] = useState<string>('panel1')
    const theme = useTheme()
    const styles = accordionStyles(theme)

    if (!stats) return null

    const exercises: ExerciseProgress[] = Object.entries(stats.exerciseStats).map(([id, data]) => ({
        exerciseId: id,
        exerciseName: id,
        progressData: data.progressData,
        maxWeight: data.maxWeight,
        maxReps: data.maxReps,
        averageWeight: data.averageWeight,
        averageReps: data.averageReps
    }))

    if (exercises.length === 0) return null

    // Initialize selected exercise if not set
    if (!selectedExercise && exercises.length > 0) {
        setSelectedExercise(exercises[0].exerciseId)
    }

    const selectedData = exercises.find(ex => ex.exerciseId === selectedExercise)

    if (!selectedData) return null

    const handleAccordionChange = (panel: string) => (
        _: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : '')
    }

    return (
        <Stack spacing={3} p={2}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleAccordionChange('panel1')}
                sx={styles.root}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={styles.summary}
                >
                    <FitnessCenterIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Exercise Progress
                    </Typography>
                    <Box sx={{ ml: 'auto', mr: 2 }}>
                        <ExerciseStats
                            maxWeight={selectedData.maxWeight}
                            maxReps={selectedData.maxReps}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={styles.details}>
                    <ExerciseSelector
                        exercises={exercises}
                        selectedExercise={selectedExercise}
                        onExerciseChange={setSelectedExercise}
                    />
                    <ExerciseChart
                        data={selectedData.progressData}
                        weightColor={theme.palette.primary.main}
                        repsColor={theme.palette.secondary.main}
                    />
                    <ChartLegend />
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}