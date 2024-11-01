import { Box, CardMedia, Skeleton, SxProps, Theme } from '@mui/material'
import { useState } from 'react'

interface MediaWithSkeletonProps {
    height: number
    imageUrl: string
    mediaStyles?: SxProps<Theme>
}

export const MediaWithSkeleton = ({
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