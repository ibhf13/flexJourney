import PersonIcon from '@mui/icons-material/Person'
import ScaleIcon from '@mui/icons-material/Scale'
import {
    Box,
    Card,
    Chip,
    Divider,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import { UserProfile } from '../types/ProfileTypes'
import { calculateAge } from '../utils/profileUtils'
import { BMICard } from './BMICard'

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

interface ProfileDetailsProps {
    profile: UserProfile
}

export const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                flexWrap: 'wrap',
            }}
        >
            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                <ProfileSection
                    icon={<PersonIcon color="primary" />}
                    title="Personal Information"
                >
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Full Name
                            </Typography>
                            <Typography>
                                {profile.firstName} {profile.lastName}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Email
                            </Typography>
                            <Typography>{profile.email}</Typography>
                        </Box>
                        {profile.birthDate && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Age
                                </Typography>
                                <Typography>
                                    {calculateAge(profile.birthDate)} years
                                </Typography>
                            </Box>
                        )}
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Fitness Level
                            </Typography>
                            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} width={{ xs: '50%', md: 'auto' }}>
                                <Chip label={profile.fitnessLevel} color="primary" variant="outlined" />
                            </Box>
                        </Box>
                        {profile.fitnessGoals && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Fitness Goals
                                </Typography>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} flexWrap="wrap" gap={1} width={{ xs: '50%', md: 'auto' }}>
                                    {profile.fitnessGoals.map((goal) => (
                                        <Chip key={goal} label={goal} color="secondary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </ProfileSection>
            </Box>

            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                <ProfileSection
                    icon={<ScaleIcon color="primary" />}
                    title="Body Metrics"
                >
                    <Stack spacing={2}>
                        {profile.height && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Height
                                </Typography>
                                <Typography>{profile.height} cm</Typography>
                            </Box>
                        )}
                        {(profile.weight || profile.targetWeight) && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Weight
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {profile.weight && (
                                        <Typography>
                                            Current: {profile.weight} kg
                                        </Typography>
                                    )}
                                    {profile.targetWeight && (
                                        <>
                                            <Divider orientation="vertical" flexItem />
                                            <Typography>
                                                Target: {profile.targetWeight} kg
                                            </Typography>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                        )}
                        <BMICard
                            height={profile.height}
                            weight={profile.weight}
                        />
                    </Stack>
                </ProfileSection>
            </Box>
        </Box >
    )
}
