import { MediaWithSkeleton } from '@/components/common/Cards'
import { DifficultyChip } from '@/components/common/Forms/DifficultyChip'
import { Box, Chip, Typography } from '@mui/material'
import React from 'react'


interface ExerciseDetailsProps {
    imageUrl: string;
    description: string;
    level?: string;
    category?: string;
    type?: string;
    defaultRestPeriod?: number;
}

export const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ imageUrl, description, level, category, type, defaultRestPeriod }) => {

    return (
        <Box>
            <MediaWithSkeleton
                height={300}
                imageUrl={imageUrl}
                mediaStyles={{
                    borderRadius: 4,
                }}
            />
            <Box >
                <Typography variant="body1" pb={2} pt={2}>{description}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {level && <DifficultyChip level={level} />}
                    {category && (
                        <Chip
                            label={category}
                            color="info"
                            size="small"
                            variant="outlined"
                        />
                    )}
                    {type && (
                        <Chip
                            label={type}
                            color="secondary"
                            size="small"
                            variant="outlined"
                        />
                    )}
                    {defaultRestPeriod && (
                        <Chip
                            label={`Rest: ${defaultRestPeriod}s`}
                            color="primary"
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>
            </Box>

        </Box>
    );
};