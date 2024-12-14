import { Box, Card, CardContent, Skeleton } from '@mui/material'

export const ExerciseCardSkeleton = () => {
    return (
        <Card sx={{ width: '100%', maxWidth: 345, mb: 2 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
                <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="30%" height={24} />
                </Box>
            </CardContent>
        </Card>
    )
}

export const ExercisePageSkeleton = () => {
    return (
        <>
            <Skeleton variant="text" width="50%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="70%" height={24} sx={{ mb: 4 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {[1, 2, 3, 4].map((item) => (
                    <ExerciseCardSkeleton key={item} />
                ))}
            </Box>
        </>
    )
} 