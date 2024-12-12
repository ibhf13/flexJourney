import { Grid, Skeleton } from '@mui/material'

export const StatisticsSkeleton = () => {
    return (
        <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                    <Skeleton
                        variant="rectangular"
                        height={200}
                        sx={{ borderRadius: 2 }}
                    />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Skeleton
                    variant="rectangular"
                    height={400}
                    sx={{ borderRadius: 2 }}
                />
            </Grid>
        </Grid>
    )
} 