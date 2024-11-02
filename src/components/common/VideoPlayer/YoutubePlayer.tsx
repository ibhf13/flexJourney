import React from 'react';
import YouTube from 'react-youtube';

interface YoutubePlayerProps {
    videoUrl: string;
    width?: string;
    height?: string;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
    videoUrl,
    width = '100%',
    height = '315'
}) => {
    // Extract video ID from URL
    const getVideoId = (url: string): string => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : '';
    };

    return (
        <YouTube
            videoId={getVideoId(videoUrl)}
            opts={{
                width,
                height,
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    rel: 0,
                },
            }}
        />
    );
};