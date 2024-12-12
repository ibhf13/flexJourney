import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { ProfileDetails } from '@/features/profile/components/ProfileDetails'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { useProfilePage } from '@/features/profile/hooks/useProfilePage'
import { Container, Stack } from '@mui/material'

const ProfilePage = () => {
    const {
        isEditing,
        isLoading,
        error,
        isMobile,
        displayedProfile,
        handleEditClick,
        handleCloseEdit,
        handleEditSuccess,
        handleAvatarUpdate,
    } = useProfilePage()

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <ProfileHeader
                photoURL={displayedProfile.photoURL}
                displayName={displayedProfile.displayName}
                fitnessLevel={displayedProfile.fitnessLevel}
                onEditClick={handleEditClick}
                onAvatarUpdate={handleAvatarUpdate}
            />

            <Container
                maxWidth="lg"
                sx={{
                    py: { xs: 2, sm: 4 },
                    px: { xs: 2, sm: 3 },
                    minHeight: '60vh',
                }}
            >
                <Stack spacing={isMobile ? 2 : 4}>
                    <ProfileDetails profile={displayedProfile} />
                </Stack>
            </Container>

            {isEditing && (
                <ProfileForm
                    open={isEditing}
                    onClose={handleCloseEdit}
                    initialData={displayedProfile}
                    onSuccess={handleEditSuccess}
                />
            )}
        </LoadingErrorWrapper>
    )
}

export default ProfilePage