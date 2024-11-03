import React from 'react';
import { DialogTitle, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ExerciseModalHeaderProps {
    title: string;
    onClose: () => void;
}

export const ExerciseModalHeader: React.FC<ExerciseModalHeaderProps> = ({ title, onClose }) => (
    <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={onClose} size="small">
                <CloseIcon />
            </IconButton>
        </Box>
    </DialogTitle>
);