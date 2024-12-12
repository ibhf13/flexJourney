import { Stack, Typography } from '@mui/material'

interface ExerciseStatsProps {
    maxWeight: number
    maxReps: number
}

export const ExerciseStats = ({ maxWeight, maxReps }: ExerciseStatsProps) => (
    <Stack
        direction="row"
        spacing={3}
        sx={{
            ml: 'auto',
            mr: 3,
            display: { xs: 'none', sm: 'flex' }
        }}
    >
        <Typography
            variant="body2"
            color="primary.main"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
            }}
        >
            Max Weight: {maxWeight}kg
        </Typography>
        <Typography
            variant="body2"
            color="secondary.main"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
            }}
        >
            Max Reps: {maxReps}
        </Typography>
    </Stack>
) 