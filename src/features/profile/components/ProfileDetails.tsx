import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
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
import { format } from 'date-fns'
import { UserProfile } from '../types/ProfileTypes'

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
                                    Birth Date
                                </Typography>
                                <Typography>
                                    {format(new Date(profile.birthDate), 'MMMM d, yyyy')}
                                </Typography>
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
                        {profile.weight && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Current Weight
                                </Typography>
                                <Typography>{profile.weight} kg</Typography>
                            </Box>
                        )}
                        {profile.targetWeight && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Target Weight
                                </Typography>
                                <Typography>{profile.targetWeight} kg</Typography>
                            </Box>
                        )}
                    </Stack>
                </ProfileSection>
            </Box>

            <Box sx={{ width: '100%' }}>
                <ProfileSection
                    icon={<FitnessCenterIcon color="primary" />}
                    title="Fitness Profile"
                >
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Fitness Level
                                    </Typography>
                                    <Chip label={profile.fitnessLevel} color="primary" variant="outlined" />
                                </Box>
                                {profile.fitnessGoals && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Fitness Goals
                                        </Typography>
                                        <Stack direction="row" flexWrap="wrap" gap={1}>
                                            {profile.fitnessGoals.map((goal) => (
                                                <Chip key={goal} label={goal} size="small" />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                        {profile.bio && (
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    About Me
                                </Typography>
                                <Typography>{profile.bio}</Typography>
                            </Box>
                        )}
                    </Box>
                </ProfileSection>
            </Box>
        </Box>
    )
}
