import { Chip, ChipProps } from '@mui/material'
import { DifficultyLevel } from '../../types/WorkoutTypes'

interface DifficultyChipProps extends Omit<ChipProps, 'color'> {
    level: DifficultyLevel
}

export const DifficultyChip = ({ level, ...props }: DifficultyChipProps) => {
    const color =
        level === 'Beginner' ? 'success' :
            level === 'Intermediate' ? 'warning' : 'error'

    return (
        <Chip
            label={level}
            color={color}
            size="small"
            {...props}
        />
    )
}