import { useWindowSize } from '@/hooks/useWindowSize'
import { keyframes } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import { alpha, Box, IconButton, Typography, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import Confetti from 'react-confetti'

interface CongratulationsOverlayProps {
    show: boolean
    message: string
    onComplete?: () => void
    duration?: number
}

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`

const MotionDiv = motion.div

//TODO: Refactor
export const CongratulationsOverlay = ({
    show,
    message,
    onComplete,
    duration = 3000
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
                <>
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={300}
                        gravity={0.2}

                    />
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: alpha(theme.palette.background.default, 0.85),
                            backdropFilter: 'blur(8px)',
                            zIndex: theme.zIndex.modal,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 24
                        }}
                    >
                        <MotionDiv
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -50 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }}
                            style={{
                                position: 'relative',
                                background: `linear-gradient(145deg, 
                                    ${alpha(theme.palette.background.paper, 0.9)},
                                    ${alpha(theme.palette.background.paper, 0.7)})`,
                                borderRadius: 16,
                                padding: '40px 32px',
                                maxWidth: '600px',
                                width: '100%',
                                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                textAlign: 'center'
                            }}
                        >
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    color: theme.palette.text.secondary,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'rotate(90deg)',
                                        color: theme.palette.error.main,
                                        backgroundColor: alpha(theme.palette.error.main, 0.1)
                                    }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Box sx={{ animation: `${bounce} 2s ease infinite` }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 3,
                                        mt: 1,
                                        fontSize: {
                                            xs: '1.75rem',
                                            sm: '2.25rem',
                                            md: '2.75rem'
                                        },
                                        fontWeight: 800,
                                        letterSpacing: '-0.5px'
                                    }}
                                >
                                    🎉 Congratulations! 🎉
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: alpha(theme.palette.text.primary, 0.9),
                                        fontSize: {
                                            xs: '1.1rem',
                                            sm: '1.35rem',
                                            md: '1.6rem'
                                        },
                                        lineHeight: 1.4,
                                        fontWeight: 500
                                    }}
                                >
                                    {message}
                                </Typography>
                            </Box>
                        </MotionDiv>
                    </MotionDiv>
                </>
            )}
        </AnimatePresence>
    )
}