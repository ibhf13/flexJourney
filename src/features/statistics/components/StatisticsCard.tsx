import { Box, Card, CardContent, SxProps, Theme, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface StatisticsCardProps {
    icon: ReactNode
    label: string
    value: number
    description: string
}

const cardStyles: SxProps<Theme> = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[4],
    },
}

const iconContainerStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
}

export const StatisticsCard = ({ icon, label, value, description }: StatisticsCardProps) => {
    return (
        <Card sx={cardStyles}>
            <CardContent>
                <Box sx={iconContainerStyles}>
                    {icon}
                    <Typography variant="subtitle1" color="text.secondary">
                        {label}
                    </Typography>
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}