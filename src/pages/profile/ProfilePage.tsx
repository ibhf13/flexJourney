import { ProfileDetails } from '@/features/profile/components/ProfileDetails'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { LoadingErrorWrapper } from '@/features/workout/components/common/LoadingErrorWrapper'
import { Container, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const { profile, isLoading: profileLoading, error: profileError } = useProfile()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCloseEdit = () => {
        setIsEditing(false)
    }

    return (
        <LoadingErrorWrapper isLoading={profileLoading} error={profileError}>
            {profile && (
                <>
                    {/* Profile Header with Avatar and Stats */}
                    <ProfileHeader
                        photoURL={profile.photoURL}
                        displayName={profile.displayName}
                        fitnessLevel={profile.fitnessLevel}
                        onEditClick={handleEditClick}
                        onAvatarUpdate={(url) => { }}
                    />

                    {/* Main Content */}
                    <Container
                        maxWidth="lg"
                        sx={{
                            py: { xs: 2, sm: 4 },
                            px: { xs: 2, sm: 3 },
                            minHeight: '60vh',
                        }}
                    >
                        <Stack spacing={isMobile ? 2 : 4}>
                            {/* Profile Details */}
                            <ProfileDetails profile={profile} />
                        </Stack>
                    </Container>

                    {/* Edit Profile Modal */}
                    <ProfileForm
                        open={isEditing}
                        onClose={handleCloseEdit}
                        initialData={profile}
                        onSuccess={() => setIsEditing(false)}
                    />
                </>
            )}
        </LoadingErrorWrapper>
    )
}

export default ProfilePage
