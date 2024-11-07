import { Box } from '@mui/material'
import React from 'react'

interface YoutubePlayerProps {
    videoUrl: string;
    onError?: (error: Error) => void;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoUrl, onError }) => {
    // Extract video ID from URL
    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getVideoId(videoUrl);

    if (!videoId) return null;

    const handleIframeError = () => {
        onError?.(new Error('Failed to load video'));
    };

    return (
        <Box
            sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                width: '100%',
            }}
        >
            <iframe
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0
                }}
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=0`}
                title="Exercise video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                onError={handleIframeError}
            />
        </Box>
    );
};