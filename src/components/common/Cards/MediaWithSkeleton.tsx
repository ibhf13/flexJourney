import { Box, CardMedia, Skeleton } from '@mui/material'
import { useState } from 'react'
import { MediaWithSkeletonProps } from './types'

const MediaWithSkeleton = ({
    height,
    imageUrl,
    mediaStyles
}: MediaWithSkeletonProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
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
                onLoad={() => setImageLoaded(true)}
            />
        </Box>
    )
}

export default MediaWithSkeleton
