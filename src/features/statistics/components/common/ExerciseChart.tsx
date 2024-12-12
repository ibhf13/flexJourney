import { Box } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { CHART_DIMENSIONS, CHART_MARGINS } from '../../constants/chart'
import { ProgressDataPoint } from '../../types/statistics'

interface ExerciseChartProps {
    data: ProgressDataPoint[]
    weightColor: string
    repsColor: string
}

export const ExerciseChart = ({ data, weightColor, repsColor }: ExerciseChartProps) => (
    <Box sx={{ height: CHART_DIMENSIONS.height, width: '100%', mt: 2 }}>
        <LineChart
            series={[
                {
                    data: data.map(d => d.weight),
                    label: 'Weight (kg)',
                    valueFormatter: (value) => `${value}kg`,
                    color: weightColor,
                    area: true,
                },
                {
                    data: data.map(d => d.reps),
                    label: 'Reps',
                    valueFormatter: (value) => `${value} reps`,
                    color: repsColor,
                    area: true,
                }
            ]}
            xAxis={[{
                data: data.map(d => new Date(d.date)),
                scaleType: 'time',
                valueFormatter: (date: Date) =>
                    date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })
            }]}
            height={CHART_DIMENSIONS.height}
            margin={CHART_MARGINS}
            slotProps={{
                legend: {
                    hidden: true
                }
            }}
            sx={{
                '.MuiLineElement-root': {
                    strokeWidth: 2,
                },
                '.MuiAreaElement-root': {
                    fillOpacity: 0.1,
                }
            }}
        />
    </Box>
) 