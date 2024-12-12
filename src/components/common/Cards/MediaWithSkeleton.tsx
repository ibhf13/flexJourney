import fallbackImage from '@/assets/images/dumbells.jpg'
import { CardMedia, Skeleton } from '@mui/material'
import { useState } from 'react'

interface MediaWithSkeletonProps {
    imageUrl?: string
    height: number
    alt?: string
    mediaStyles?: React.CSSProperties
}

const MediaWithSkeleton = ({ imageUrl, height, alt = 'content image', mediaStyles }: MediaWithSkeletonProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <>
            {isLoading && <Skeleton variant="rectangular" height={height} />}
            <CardMedia
                component="img"
                height={height}
                image={hasError ? fallbackImage : imageUrl}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                sx={{ display: isLoading ? 'none' : 'block', ...mediaStyles }}
            />
        </>
    )
}

export default MediaWithSkeleton
