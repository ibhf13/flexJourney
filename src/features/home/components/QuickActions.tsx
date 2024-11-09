import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import HistoryIcon from '@mui/icons-material/History'
import TimelineIcon from '@mui/icons-material/Timeline'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const actions = [
    {
        title: 'Start Workout',
        description: 'Choose from various workout plans',
        icon: <FitnessCenterIcon />,
        path: '/plan',
        color: 'primary.main'
    },
    {
        title: 'View History',
        description: 'Track your workout progress',
        icon: <HistoryIcon />,
        path: '/history',
        color: 'secondary.main'
    },
    {
        title: 'Statistics',
        description: 'Analyze your performance',
        icon: <TimelineIcon />,
        path: '/statistics',
        color: 'success.main'
    }
]

export const QuickActions = () => {
    return (
        <Grid container spacing={3}>
            {actions.map((action, index) => (
                <Grid item xs={12} sm={6} md={4} key={action.title}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Paper
                            component={Link}
                            to={action.path}
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                textDecoration: 'none',
                                color: 'text.primary',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 2,
                                    color: action.color,
                                    '& > svg': {
                                        fontSize: '2.5rem'
                                    }
                                }}
                            >
                                {action.icon}
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {action.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {action.description}
                            </Typography>
                        </Paper>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    )
}