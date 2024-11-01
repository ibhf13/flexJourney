import { Box, CardMedia, Skeleton, SxProps, Theme } from '@mui/material'

interface MediaWithSkeletonProps {
    height: number
    imageUrl: string
    imageLoaded: boolean
    onLoad: () => void
    mediaStyles?: SxProps<Theme>
}

export const MediaWithSkeleton = ({
    height,
    imageUrl,
    imageLoaded,
    onLoad,
    mediaStyles
}: MediaWithSkeletonProps) => (
    <Box sx={{ position: 'relative' }}>
        {!imageLoaded && <Skeleton variant="rectangular" height={height} />}
        <CardMedia
            component="img"
            height={height}
            image={imageUrl}
            alt=""
            sx={{
                ...mediaStyles,
                display: imageLoaded ? 'block' : 'none'
            }}
            onLoad={onLoad}
        />
    </Box>
)