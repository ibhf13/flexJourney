import { Box, Paper, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { StatCard as StatCardProps } from '../types/statisticsTypes'

export const StatisticCard = ({ icon, title, value, subtitle }: StatCardProps) => {

    return (
        <Paper
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: theme => theme.palette.background.paper,
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid',
                borderColor: theme => theme.palette.divider,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme => theme.shadows[4]
                }
            }}
        >
            <Box
                sx={{
                    mb: 2,
                    p: 1,
                    borderRadius: '50%',
                    bgcolor: theme => alpha(theme.palette.primary.main, 0.1)
                }}
            >
                {icon}
            </Box>
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary'
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600
                }}
            >
                {value}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
            >
                {subtitle}
            </Typography>
        </Paper>
    )
} 