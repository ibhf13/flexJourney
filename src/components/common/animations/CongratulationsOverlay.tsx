import { useWindowSize } from '@/hooks/useWindowSize'
import CloseIcon from '@mui/icons-material/Close'
import { alpha, Box, IconButton, Typography, useTheme } from '@mui/material'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import Confetti from 'react-confetti'

interface CongratulationsOverlayProps {
    show: boolean
    message: string
    onComplete?: () => void
    duration?: number
}

const overlayVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.3 }
    }
}

const textVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.4
        }
    }
}

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 }
    }
}

export const CongratulationsOverlay = ({
    show,
    message,
    onComplete,
    duration = 3000
}: CongratulationsOverlayProps) => {
    const theme = useTheme()
    const { width, height } = useWindowSize()

    // Auto-hide overlay after duration
    useEffect(() => {
        if (show && onComplete) {
            const timer = setTimeout(onComplete, duration)

            return () => clearTimeout(timer)
        }
    }, [show, onComplete, duration])

    // Memoize confetti config for performance
    const confettiConfig = {
        width,
        height,
        recycle: false,
        numberOfPieces: Math.min(500, Math.floor((width * height) / 5000)),
        gravity: 0.3,
        colors: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main
        ]
    }

    const handleClose = useCallback(() => {
        onComplete?.()
    }, [onComplete])

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {show && (
                <>
                    <Confetti {...confettiConfig} />
                    <Box
                        component={motion.div}
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: alpha(theme.palette.background.default, 0.7),
                            zIndex: theme.zIndex.modal,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            component={motion.div}
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            sx={{
                                position: 'relative',
                                backgroundColor: alpha(theme.palette.background.paper, 0.95),
                                padding: {
                                    xs: 3,
                                    sm: 4,
                                    md: 5
                                },
                                borderRadius: 3,
                                maxWidth: {
                                    xs: '90%',
                                    sm: '70%',
                                    md: '50%'
                                },
                                minWidth: {
                                    xs: '280px',
                                    sm: '400px',
                                    md: '500px'
                                },
                                boxShadow: theme.shadows[10],
                                textAlign: 'center'
                            }}
                        >
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        color: theme.palette.text.primary,
                                        backgroundColor: alpha(theme.palette.text.primary, 0.1)
                                    }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Typography
                                variant="h4"
                                component={motion.h4}
                                variants={textVariants}
                                sx={{
                                    color: theme.palette.text.primary,
                                    mb: 3,
                                    mt: 1,
                                    fontSize: {
                                        xs: '1.5rem',
                                        sm: '2rem',
                                        md: '2.5rem'
                                    },
                                    fontWeight: 'bold'
                                }}
                            >
                                🎉 Congratulations! 🎉
                            </Typography>
                            <Typography
                                variant="h6"
                                component={motion.h6}
                                variants={textVariants}
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: {
                                        xs: '1rem',
                                        sm: '1.25rem',
                                        md: '1.5rem'
                                    }
                                }}
                            >
                                {message}
                            </Typography>
                        </Box>
                    </Box>
                </>
            )}
        </AnimatePresence>
    )
}