import { Box, Stack, Typography } from '@mui/material'

interface UserStatItemProps {
    icon: React.ReactNode
    label: string
    value: string | number
}

export const UserStatItem = ({ icon, label, value }: UserStatItemProps) => {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
        >
            <Box
                sx={{
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography
                    variant="h6"
                    component="div"
                    fontWeight="bold"
                >
                    {value}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    {label}
                </Typography>
            </Box>
        </Stack>
    )
}