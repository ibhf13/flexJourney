import { Card, CardActionArea } from '@mui/material'
import { useCallback } from 'react'
import CardSkeleton from './CardSkeleton'
import { sharedCardStyles } from './cardStyles'
import MediaWithSkeleton from './MediaWithSkeleton'
import { BaseCardProps } from './types'

const BaseCard = ({
    title,
    imageUrl,
    imageHeight = 140,
    isLoading = false,
    onClick,
    children,
    sx
}: BaseCardProps) => {
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
        <Card sx={sx ?? sharedCardStyles}>
            <CardActionArea
                onClick={onClick}
                onKeyPress={handleKeyPress}
                sx={{ height: '100%' }}
                aria-label={`View details for ${title}`}
            >
                <MediaWithSkeleton
                    height={imageHeight}
                    imageUrl={imageUrl}
                />
                {children}
            </CardActionArea>
        </Card>
    )
}

export default BaseCard
