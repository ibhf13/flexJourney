import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface YoutubePlayerProps {
    videoUrl: string;
    onReady?: () => void;
    onError?: (error: Error) => void;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
    videoUrl,
    onReady,
    onError,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    const getEmbedUrl = (url: string): string => {
        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            const videoId = match?.[2] ?? '';

            // Use youtube-nocookie.com for enhanced privacy
            return `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0`;
        } catch (error) {
            console.error('Error parsing YouTube URL:', error);
            onError?.(new Error('Invalid YouTube URL'));
            return '';
        }
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
        onReady?.();
    };

    const handleIframeError = () => {
        setIsLoading(false);
        onError?.(new Error('Failed to load video'));
    };

    const embedUrl = getEmbedUrl(videoUrl);

    return (
        <Box
            sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 aspect ratio
                width: '100%',
                backgroundColor: 'black',
            }}
        >
            {isLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <iframe
                src={embedUrl}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                }}
                title="Exercise Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
            />
        </Box>
    );
};

