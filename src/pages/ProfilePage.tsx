import ErrorAlert from '@/components/common/ErrorAlert'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ProfileDetails from '@/features/profile/components/ProfileDetails'
import ProfileHeader from '@/features/profile/components/ProfileHeader'
import ProfileStats from '@/features/profile/components/ProfileStats'
import { useProfileContext } from '@/features/profile/contexts/ProfileContext'
import { Container, Grid } from '@mui/material'

const ProfilePage = () => {
    const { profile, stats, loading, error } = useProfileContext()

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorAlert message={error} />
    if (!profile) return <ErrorAlert message="Profile not found" />

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProfileHeader profile={profile} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ProfileStats stats={stats} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ProfileDetails profile={profile} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage