import { Box, Paper, Typography, useTheme } from '@mui/material'

const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
            sx={{
                width: 16,
                height: 16,
                backgroundColor: color,
                borderRadius: 0.5
            }}
        />
        <Typography>{label}</Typography>
    </Box>
)

export const ChartLegend = () => {
    const theme = useTheme()

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: 4
            }}
        >
            <LegendItem
                color={theme.palette.primary.main}
                label="Weight (kg)"
            />
            <LegendItem
                color={theme.palette.secondary.main}
                label="Reps"
            />
        </Paper>
    )
} 