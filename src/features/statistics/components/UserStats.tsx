import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { WorkoutStat } from '../types/StatisticsTypes'

interface StatBlockProps {
    label: string
    value: string | number
    icon: React.ReactNode
    description?: string
    delay: number
}

const StatBlock = ({ label, value, icon, description, delay }: StatBlockProps) => {
    const theme = useTheme()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4],
                    },
                    background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '50%',
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                        {label}
                    </Typography>
                </Box>
                <Typography
                    variant="h3"
                    component="div"
                    fontWeight="bold"
                    sx={{ color: 'primary.main' }}
                >
                    {value}
                </Typography>
                {description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ opacity: 0.8 }}
                    >
                        {description}
                    </Typography>
                )}
            </Paper>
        </motion.div>
    )
}

export const UserStats = ({ stats }: { stats: WorkoutStat | undefined }) => {
    const statBlocks = [
        {
            label: "Current Streak",
            value: 12,
            icon: <WhatshotIcon sx={{ color: 'white' }} />,
            description: "Consecutive days of training",
        },
        {
            label: "Best Streak",
            value: 12,
            icon: <EmojiEventsIcon sx={{ color: 'white' }} />,
            description: "Your longest training streak",
        },
        {
            label: "Total Workouts",
            value: stats?.totalWorkouts || 0,
            icon: <FitnessCenterIcon sx={{ color: 'white' }} />,
            description: "Completed workout sessions",
        },
        {
            label: "Monthly Average",
            value: stats?.monthlyAverage || 0,
            icon: <TrendingUpIcon sx={{ color: 'white' }} />,
            description: "Workouts per month",
        },
        {
            label: "Total Weight",
            value: stats?.totalWeight || 0,
            icon: <FitnessCenterIcon sx={{ color: 'white' }} />,
            description: "Total weight lifted",
        },

    ]

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {statBlocks.map((block, index) => (
                        <Grid item xs={12} sm={6} md={4} key={block.label}>
                            <StatBlock {...block} delay={index * 0.1} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}