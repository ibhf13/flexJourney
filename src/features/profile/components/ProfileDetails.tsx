import PersonIcon from '@mui/icons-material/Person'
import ScaleIcon from '@mui/icons-material/Scale'
import {
    Box,
    Chip,
    Divider,
    Stack,
    Typography
} from '@mui/material'
import { UserProfile } from '../types/ProfileTypes'
import { calculateWeightGoalInfo } from '../utils/profileUtils'
import { BMICard } from './BMICard'
import { PasswordManagement } from './PasswordManagement'
import ProfileSection from './ProfileSection'

interface ProfileDetailsProps {
    profile: UserProfile
}

export const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
    const { baseInfo, profileMetrics, fitnessDetails } = profile
    const weightGoalInfo = calculateWeightGoalInfo(profileMetrics?.weight, profileMetrics?.height, profileMetrics?.targetWeight)

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
                                {baseInfo.firstName} {baseInfo.lastName}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Email
                            </Typography>
                            <Typography>{baseInfo.email}</Typography>
                        </Box>
                        {profileMetrics?.age && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Age
                                </Typography>
                                <Typography>
                                    {profileMetrics?.age} years
                                </Typography>
                            </Box>
                        )}
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Fitness Level
                            </Typography>
                            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} width={{ xs: '50%', md: 'auto' }}>
                                <Chip label={fitnessDetails?.fitnessLevel} color="primary" variant="outlined" />
                            </Box>
                        </Box>
                        {fitnessDetails?.fitnessGoals && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Fitness Goals
                                </Typography>
                                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} flexWrap="wrap" gap={1} width={{ xs: '50%', md: 'auto' }}>
                                    {fitnessDetails?.fitnessGoals.map((goal, index) => (
                                        <Chip key={`${goal}-${index}`} label={goal} color="secondary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </ProfileSection>
                <Box sx={{ pt: 3, width: '100%' }}>
                    <PasswordManagement />
                </Box>
            </Box>


            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                <ProfileSection
                    icon={<ScaleIcon color="primary" />}
                    title="Body Metrics"
                >
                    <Stack spacing={2}>
                        {profileMetrics?.height && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Height
                                </Typography>
                                <Typography>{profileMetrics?.height} cm</Typography>
                            </Box>
                        )}
                        {(profileMetrics?.weight || profileMetrics?.targetWeight) && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Weight
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {profileMetrics?.weight && (
                                        <Typography>
                                            Current: {profileMetrics?.weight} kg
                                        </Typography>
                                    )}
                                    {profileMetrics?.targetWeight && (
                                        <>
                                            <Divider orientation="vertical" flexItem />
                                            <Typography>
                                                Target: {profileMetrics?.targetWeight} kg
                                            </Typography>
                                        </>
                                    )}
                                    {profileMetrics?.weight && profileMetrics?.height && (
                                        <>
                                            <Divider orientation="vertical" flexItem />
                                            <Typography>
                                                Ideal: {weightGoalInfo?.idealWeight} kg
                                            </Typography>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                        )}
                        <BMICard
                            height={profileMetrics?.height}
                            weight={profileMetrics?.weight}
                        />
                    </Stack>
                </ProfileSection>
            </Box>

        </Box >
    )
}
