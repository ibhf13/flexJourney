import { Chip, ChipProps } from '@mui/material'
import { DifficultyLevel } from '../../types/WorkoutTypes'

type ChipColorType = 'success' | 'warning' | 'error' | 'default' | 'primary' | 'secondary' | 'info'

interface DifficultyChipProps extends Omit<ChipProps, 'color'> {
    level: DifficultyLevel
}

export const DifficultyChip = ({ level, ...props }: DifficultyChipProps) => {
    const getChipColor = (level: DifficultyLevel): ChipColorType => {
        const colorMap: Record<DifficultyLevel, ChipColorType> = {
            Beginner: 'success',
            Intermediate: 'warning',
            Advanced: 'error',
            Expert: 'error'
        }
        return colorMap[level]
    }

    return (
        <Chip
            label={level}
            color={getChipColor(level)}
            size="small"
            variant="filled"
            {...props}
        />
    )
}