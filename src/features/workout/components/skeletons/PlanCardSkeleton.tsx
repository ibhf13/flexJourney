import { Card, CardContent, Grid, Skeleton } from '@mui/material'

export const PlanCardSkeleton = () => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Skeleton variant="rectangular" height={140} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
            </CardContent>
        </Card>
    )
}

export const PlanPageSkeleton = () => {
    return (
        <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                    <PlanCardSkeleton />
                </Grid>
            ))}
        </Grid>
    )
} 