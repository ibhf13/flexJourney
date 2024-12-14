import { Card, CardContent, Grid, Skeleton } from '@mui/material'

export const DayCardSkeleton = () => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="70%" height={24} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="30%" height={24} />
            </CardContent>
        </Card>
    )
}

export const DayPageSkeleton = () => {
    return (
        <>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={24} sx={{ mb: 4 }} />
            <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <DayCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        </>
    )
} 