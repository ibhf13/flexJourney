import { Box, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useStreak } from '../contexts/StreakContext'
import * as BadgeService from '../services/badgeService'
import { Badge } from '../types/streakTypes'
import { BadgeDisplay } from './BadgeDisplay'

export const BadgesCollection = () => {
    const { currentStreak } = useStreak()
    const unlockedBadges = BadgeService.getUnlockedBadges(currentStreak)
    const nextBadge = BadgeService.getNextBadge(currentStreak)
    const progress = BadgeService.getProgressToNextBadge(currentStreak)

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Streak Achievements
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                {unlockedBadges.map((badge: Badge) => (
                    <BadgeDisplay
                        key={badge.id}
                        badge={badge}
                        isNew={badge.requirement === currentStreak}
                    />
                ))}
            </Box>

            {nextBadge && (
                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Next Badge: {nextBadge.name}
                    </Typography>
                    <Box sx={{ position: 'relative', height: 8, bgcolor: 'background.paper', borderRadius: 4, overflow: 'hidden' }}>
                        <Box
                            component={motion.div}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1 }}
                            sx={{
                                height: '100%',
                                background: (theme) => `linear-gradient(90deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main}
                )`,
                                borderRadius: 'inherit',
                            }}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        {currentStreak} / {nextBadge.requirement} days
                    </Typography>
                </Box>
            )}
        </Paper>
    )
}