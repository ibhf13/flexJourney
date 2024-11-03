import { Card, CardContent, Box, Skeleton } from '@mui/material'
import { sharedCardStyles } from './cardStyles'
import { CardSkeletonProps } from './types'

const CardSkeleton = ({ height }: CardSkeletonProps) => (
    <Card sx={sharedCardStyles}>
        <Skeleton variant="rectangular" height={height} />
        <CardContent>
            <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={48} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="rectangular" width={80} height={24} />
                <Skeleton variant="text" width={40} />
            </Box>
        </CardContent>
    </Card>
)

export default CardSkeleton
