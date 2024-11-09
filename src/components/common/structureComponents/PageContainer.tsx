import { Box, Container, Typography } from '@mui/material'

interface PageContainerProps {
    title?: string
    subtitle?: string
    children: React.ReactNode
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    spacing?: number
}

export const PageContainer = ({
    title,
    subtitle,
    children,
    maxWidth = 'lg',
    spacing = 3
}: PageContainerProps) => {
    return (
        <Container maxWidth={maxWidth}>
            <Box
                sx={{
                    py: { xs: 2, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing,
                    minHeight: '100vh'
                }}
            >
                {(title || subtitle) && (
                    <Box sx={{ mb: 2 }}>
                        {title && (
                            <Typography
                                variant="h4"
                                component="h1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                )}
                {children}
            </Box>
        </Container>
    )
}