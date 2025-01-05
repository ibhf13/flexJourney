import { Add } from '@mui/icons-material'
import { Box, CardActionArea, Typography, useMediaQuery, useTheme } from '@mui/material'
import { StyledCard } from '../styles'

interface CreatePlanCardProps {
    onClick: () => void
}

export const CreateNewPlanCard = ({ onClick }: CreatePlanCardProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <StyledCard elevation={0}>
            <CardActionArea
                onClick={onClick}
                sx={{
                    height: '100%',
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{
                    width: { xs: 48, sm: 60 },
                    height: { xs: 48, sm: 60 },
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, 
                        ${theme.palette.primary.light}20,
                        ${theme.palette.primary.main}40)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: { xs: 2, sm: 3 }
                }}>
                    <Add sx={{
                        fontSize: { xs: 24, sm: 32 },
                        color: 'primary.main'
                    }} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            background: `linear-gradient(135deg,
                                ${theme.palette.primary.main},
                                ${theme.palette.primary.dark})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Create Custom Plan
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            maxWidth: '80%',
                            mx: 'auto',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        Build your own workout plan from scratch
                    </Typography>
                </Box>
            </CardActionArea>
        </StyledCard>
    )
} 