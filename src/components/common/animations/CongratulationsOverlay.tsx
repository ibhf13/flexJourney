import { useWindowSize } from '@/hooks/useWindowSize'
import CloseIcon from '@mui/icons-material/Close'
import { alpha, IconButton, Typography, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import Confetti from 'react-confetti'

interface CongratulationsOverlayProps {
    show: boolean
    message: string
    onComplete?: () => void
    duration?: number
}

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
                        numberOfPieces={200}
                        gravity={0.3}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: alpha('#000', 0.7),
                            backdropFilter: 'blur(4px)',
                            zIndex: theme.zIndex.modal,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 16
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            style={{
                                position: 'relative',
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 8,
                                padding: 32,
                                maxWidth: '500px',
                                width: '90%',
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

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <Typography
                                    variant="h4"
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
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}