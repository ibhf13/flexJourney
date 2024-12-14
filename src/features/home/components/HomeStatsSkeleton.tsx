import { Box, Grid, Skeleton } from '@mui/material'

export const HomeStatsSkeleton = () => {
    return (
        <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                    <Box
                        sx={{
                            p: 3,
                            height: '100%',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            display: { xs: 'flex', md: 'block' },
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, width: '100%' }}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" width="60%" height={32} />
                        </Box>
                        <Skeleton variant="text" width="40%" height={48} />
                        <Skeleton variant="text" width="70%" height={24} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
} 