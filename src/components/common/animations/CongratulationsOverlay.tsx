import { useWindowSize } from '@/hooks/useWindowSize'
import { Box, Typography, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import Confetti from 'react-confetti'

interface CongratulationsOverlayProps {
    show: boolean
    message: string
    onComplete?: () => void
}

export const CongratulationsOverlay = ({ show, message, onComplete }: CongratulationsOverlayProps) => {
    const theme = useTheme()
    const { width, height } = useWindowSize()

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {show && (
                <>
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.3}
                    />
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: theme.zIndex.modal + 1,
                            textAlign: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            component={motion.h4}
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            sx={{ color: 'white', mb: 2 }}
                        >
                            🎉 Congratulations! 🎉
                        </Typography>
                        <Typography
                            variant="h6"
                            component={motion.h6}
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            sx={{ color: 'white' }}
                        >
                            {message}
                        </Typography>
                    </Box>
                </>
            )}
        </AnimatePresence>
    )
}