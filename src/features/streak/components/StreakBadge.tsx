import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Box, Chip, Tooltip, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useStreak } from '../contexts/StreakContext'

export const StreakBadge = () => {
    const theme = useTheme()
    const { currentStreak } = useStreak()

    if (!currentStreak) return null

    return (
        <Tooltip
            title={`You're on a ${currentStreak} day streak! Keep it up! 🔥`}
            arrow
            placement="bottom"
        >
            <Box
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Chip
                    icon={<WhatshotIcon />}
                    label={
                        <Typography variant="body2" component="span" fontWeight="bold">
                            {currentStreak} day streak
                        </Typography>
                    }
                    color="primary"
                    sx={{
                        borderRadius: '16px',
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '& .MuiChip-icon': {
                            color: theme.palette.primary.contrastText,
                        },
                        boxShadow: `0 0 10px ${theme.palette.primary.main}40`,
                    }}
                />
            </Box>
        </Tooltip>
    )
}