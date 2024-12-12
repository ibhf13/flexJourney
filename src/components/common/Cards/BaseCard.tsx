import { Card, CardActionArea } from '@mui/material'
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
    actionButton,
    sx
}: BaseCardProps) => {
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick?.()
        }
    }

    if (isLoading) {
        return <CardSkeleton height={imageHeight} />
    }

    return (
        <Card sx={sx ?? sharedCardStyles}>
            {actionButton}
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
