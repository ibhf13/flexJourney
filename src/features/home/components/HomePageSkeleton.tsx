import { Box, Container, Skeleton } from '@mui/material'
import { HomeStatsSkeleton } from './HomeStatsSkeleton'

export const HomePageSkeleton = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={24} />
            </Box>
            <Box sx={{ mb: 4 }}>
                <HomeStatsSkeleton />
            </Box>
            <Box sx={{ mb: 4 }}>
                <HomeStatsSkeleton />
            </Box>

        </Container>
    )
} 