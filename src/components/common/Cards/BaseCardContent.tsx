import { CardContent, Typography, Box, Chip } from '@mui/material'
import { DifficultyChip } from '../Forms/DifficultyChip'
import { ellipsisTextStyles } from './cardStyles'
import { BaseCardContentProps } from './types'

const BaseCardContent = ({
    title,
    description,
    level,
    exercisesCount,
    category,
    children,
}: BaseCardContentProps) => (
    <CardContent>
        <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={ellipsisTextStyles}
        >
            {title}
        </Typography>
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                ...ellipsisTextStyles,
                mb: 2,
                minHeight: '3em',
            }}
        >
            {description}
        </Typography>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
            }}
        >
            <DifficultyChip
                level={level}
                aria-label={`Difficulty level: ${level}`}
            />
            {category && (
                <Chip
                    label={category}
                    color="info"
                    size="small"
                    variant="outlined"
                    aria-label={`Category: ${category}`}
                />
            )}
            {exercisesCount !== undefined && (
                <Chip
                    label={`${exercisesCount} exercises`}
                    color="primary"
                    size="small"
                    variant="outlined"
                    aria-label={`Contains ${exercisesCount} exercises`}
                />
            )}
            {children}
        </Box>
    </CardContent>
)

export default BaseCardContent
