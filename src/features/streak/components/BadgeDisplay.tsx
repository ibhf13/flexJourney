import { Box, Paper, Tooltip, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import * as BadgeService from '../services/badgeService'
import { Badge } from '../types/streakTypes'

interface BadgeDisplayProps {
    badge: Badge
    isNew?: boolean
    size?: 'small' | 'medium' | 'large'
}

export const BadgeDisplay = ({ badge, isNew = false, size = 'medium' }: BadgeDisplayProps) => {
    const theme = useTheme()

    const sizeMap = {
        small: {
            width: 48,
            height: 48,
            fontSize: '1.5rem',
            iconSize: '1.5rem',
        },
        medium: {
            width: 64,
            height: 64,
            fontSize: '1.75rem',
            iconSize: '2rem',
        },
        large: {
            width: 80,
            height: 80,
            fontSize: '2rem',
            iconSize: '2.5rem',
        },
    }

    const dimensions = sizeMap[size]

    return (
        <Tooltip
            title={
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {badge.name}
                    </Typography>
                    <Typography variant="body2">{badge.description}</Typography>
                    {badge.unlockedAt && (
                        <Typography variant="caption" color="textSecondary">
                            Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
                        </Typography>
                    )}
                </Box>
            }
            arrow
        >
            <Paper
                component={motion.div}
                initial={isNew ? { scale: 0 } : { scale: 1 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                    width: dimensions.width,
                    height: dimensions.height,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${BadgeService.getBadgeColor(
                        badge.level
                    )}40, ${BadgeService.getBadgeColor(badge.level)})`,
                    border: '2px solid',
                    borderColor: BadgeService.getBadgeColor(badge.level),
                    boxShadow: `0 0 10px ${BadgeService.getBadgeColor(badge.level)}40`,
                    position: 'relative',
                    cursor: 'pointer',
                }}
            >
                <Typography
                    variant="h4"
                    component="span"
                    sx={{
                        fontSize: dimensions.iconSize,
                    }}
                >
                    {badge.icon}
                </Typography>
                {isNew && (
                    <Box
                        component={motion.div}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                        }}
                        sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: theme.palette.success.main,
                            color: theme.palette.success.contrastText,
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                        }}
                    >
                        NEW
                    </Box>
                )}
            </Paper>
        </Tooltip>
    )
}