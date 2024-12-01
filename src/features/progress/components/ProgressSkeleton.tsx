import { Box, Grid, Skeleton } from '@mui/material'


export const ProgressSkeleton = () => (
    <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                    <Skeleton variant="rectangular" height={200} />
                </Grid>
            ))}
        </Grid>
    </Box>
)