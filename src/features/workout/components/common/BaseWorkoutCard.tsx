import { Card, CardActionArea } from '@mui/material'
import { sharedCardStyles } from '../../utils/cardStyles'
import { CardSkeleton } from './CardSkeleton'
import { MediaWithSkeleton } from './MediaWithSkeleton'
import { ReactNode, useCallback, useState } from 'react'

interface BaseWorkoutCardProps {
    title: string
    imageUrl: string
    imageHeight?: number
    isLoading?: boolean
    onClick: () => void
    children: ReactNode
}

export const BaseWorkoutCard = ({
    title,
    imageUrl,
    imageHeight = 140,
    isLoading = false,
    onClick,
    children
}: BaseWorkoutCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const handleImageLoad = () => setImageLoaded(true)

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onClick()
            }
        },
        [onClick]
    )

    if (isLoading) {
        return <CardSkeleton height={imageHeight} />
    }

    return (
        <Card sx={sharedCardStyles}>
            <CardActionArea
                onClick={onClick}
                onKeyPress={handleKeyPress}
                sx={{ height: '100%' }}
                aria-label={`View details for ${title}`}
            >
                <MediaWithSkeleton
                    height={imageHeight}
                    imageUrl={imageUrl}
                    imageLoaded={imageLoaded}
                    onLoad={handleImageLoad}
                />
                {children}
            </CardActionArea>
        </Card>
    )
}