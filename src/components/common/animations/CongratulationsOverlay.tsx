import { useWindowSize } from '@/hooks/useWindowSize'
import { bounceAnimation } from '@/styles/animations/keyframes'
import { overlayStyles } from '@/styles/components/congratulationsOverlay'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import Confetti from 'react-confetti'
import { ANIMATION_DURATION, CONFETTI_GRAVITY, CONFETTI_PIECES, DEFAULT_DURATION, springTransition } from './constants/animationsConsts'


interface CongratulationsOverlayProps {
    show: boolean
    message: string
    onComplete?: () => void
    duration?: number
}

const MotionDiv = motion.div

export const CongratulationsOverlay = ({
    show,
    message,
    onComplete,
    duration = DEFAULT_DURATION
}: CongratulationsOverlayProps) => {
    const theme = useTheme()
    const { width, height } = useWindowSize()

    const handleClose = useCallback(() => {
        onComplete?.()
    }, [onComplete])

    useEffect(() => {
        if (show && duration > 0) {
            const timer = setTimeout(handleClose, duration)

            return () => clearTimeout(timer)
        }
    }, [show, duration, handleClose])

    return (
        <AnimatePresence>
            {show && (
                <Box sx={overlayStyles.wrapper}>
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: ANIMATION_DURATION }}
                        style={overlayStyles.backdrop as any}
                    >
                        <MotionDiv
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -50 }}
                            transition={springTransition}
                            style={overlayStyles.content(theme) as any}
                        >
                            <IconButton
                                onClick={handleClose}
                                sx={overlayStyles.closeButton}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Box sx={{ animation: `${bounceAnimation} 2s ease infinite` }}>
                                <Typography
                                    variant="h4"
                                    sx={overlayStyles.title}
                                >
                                    🎉 Congratulations! 🎉
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={overlayStyles.message(theme)}
                                >
                                    {message}
                                </Typography>
                            </Box>
                        </MotionDiv>
                    </MotionDiv>
                    <Box sx={{ position: 'fixed', inset: 0, zIndex: theme.zIndex.modal + 1 }}>
                        <Confetti
                            width={width}
                            height={height}
                            recycle={false}
                            numberOfPieces={CONFETTI_PIECES}
                            gravity={CONFETTI_GRAVITY}
                        />
                    </Box>
                </Box>
            )}
        </AnimatePresence>
    )
}