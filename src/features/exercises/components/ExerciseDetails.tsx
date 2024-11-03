import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { MediaWithSkeleton } from '@/components/common/Cards';

interface ExerciseDetailsProps {
    imageUrl: string;
    description: string;
}

export const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ imageUrl, description }) => {
    const theme = useTheme();

    return (
        <>
            <Box mb={3}>
                <MediaWithSkeleton
                    height={300}
                    imageUrl={imageUrl}
                    mediaStyles={{
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[4],
                    }}
                />
            </Box>
            <Typography variant="h6" gutterBottom>
                Description
            </Typography>
            <Typography variant="body1" paragraph>
                {description}
            </Typography>
        </>
    );
};