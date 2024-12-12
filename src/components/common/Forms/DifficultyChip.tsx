import { Chip, ChipProps } from '@mui/material'

type ChipColorType = 'success' | 'warning' | 'error' | 'default' | 'primary' | 'secondary' | 'info'

interface DifficultyChipProps extends Omit<ChipProps, 'color'> {
    level: string
}

export const DifficultyChip = ({ level, ...props }: DifficultyChipProps) => {
    const getChipColor = (level: string): ChipColorType => {
        const colorMap: Record<string, ChipColorType> = {
            Beginner: 'success',
            Intermediate: 'warning',
            Advanced: 'error',
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