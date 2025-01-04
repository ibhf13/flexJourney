
import {
    Card,
    Divider,
    Stack,
    Typography,
    useTheme
} from '@mui/material'



interface ProfileSectionProps {
    icon: React.ReactNode
    title: string
    children: React.ReactNode
}

const ProfileSection = ({ icon, title, children }: ProfileSectionProps) => {
    const theme = useTheme()

    return (
        <Card
            sx={{
                p: 3,
                width: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                },
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                </Stack>
                <Divider />
                {children}
            </Stack>
        </Card>
    )
}

export default ProfileSection