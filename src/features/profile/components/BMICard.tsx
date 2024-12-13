import { Box, Card, CircularProgress, Typography, useTheme } from '@mui/material'
import { calculateBMI, getBMICategory, getBMIColor } from '../utils/profileUtils'

interface BMICardProps {
    weight?: number
    height?: number
}

export const BMICard = ({ weight, height }: BMICardProps) => {
    const theme = useTheme()
    const bmi = calculateBMI(weight, height)

    if (!bmi) return null

    const category = getBMICategory(bmi)
    const color = getBMIColor(bmi)
    const progressValue = Math.min(Math.max((bmi / 40) * 100, 0), 100)

    return (
        <Card
            sx={{
                p: 3,
                background: `linear-gradient(145deg, 
                    ${theme.palette.background.paper} 0%,
                    ${theme.palette.background.default} 100%)`,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Typography variant="h6" gutterBottom fontWeight="600">
                BMI Calculator
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    mt: 2,
                }}
            >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={progressValue}
                        size={120}
                        thickness={4}
                        sx={{ color }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ color, fontWeight: 'bold' }}>
                            {bmi}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            BMI
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, ml: 4 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Your BMI indicates
                    </Typography>
                    <Typography variant="h5" sx={{ color, fontWeight: '600', mb: 1 }}>
                        {category}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            p: 1,
                            bgcolor: 'background.default',
                            borderRadius: 1,
                            fontSize: '0.75rem'
                        }}
                    >
                        BMI Categories:
                        <br />
                        Underweight: &lt;18.5
                        <br />
                        Normal: 18.5-24.9
                        <br />
                        Overweight: 25-29.9
                        <br />
                        Obese: ≥30
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}
