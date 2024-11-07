import { useNotificationContext } from '@/features/Feedback/contexts/NotificationContext'
import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    Paper,
    Typography,
} from '@mui/material'
import { useState } from 'react'
import { useProfileContext } from '../contexts/ProfileContext'
import { UserProfile } from '../types/ProfileTypes'
import EditProfileForm from './forms/EditProfileForm'

interface ProfileDetailsProps {
    profile: UserProfile
}

const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const { updateProfile } = useProfileContext()
    const { showNotification } = useNotificationContext()

    const handleSubmit = async (data: Partial<UserProfile>) => {
        const success = await updateProfile(data)

        showNotification({
            message: success ? 'Profile updated successfully' : 'Failed to update profile',
            severity: success ? 'success' : 'error',
            open: true
        })
        if (success) setIsEditing(false)

        return success
    }

    const ProfileItem = ({ label, content }: { label: string, content: React.ReactNode }) => (
        <>
            <ListItem>
                <Box width="100%">
                    <Typography variant="subtitle2" color="text.secondary">
                        {label}
                    </Typography>
                    <Box mt={1}>
                        {content}
                    </Box>
                </Box>
            </ListItem>
            <Divider />
        </>
    )

    const renderProfileInfo = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Profile Information</Typography>
                <Button
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    variant="outlined"
                    size="small"
                >
                    Edit Profile
                </Button>
            </Box>
            <List>
                <ProfileItem
                    label="Bio"
                    content={profile.bio || 'No bio added yet'}
                />
                <ProfileItem
                    label="Physical Stats"
                    content={`Height: ${profile.height || 'Not set'} | Weight: ${profile.weight || 'Not set'} ${profile.weightUnit}`}
                />
                <ProfileItem
                    label="Experience Level"
                    content={profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}
                />
                <ProfileItem
                    label="Fitness Goals"
                    content={
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {profile.fitnessGoals?.map((goal) => (
                                <Chip
                                    key={goal}
                                    label={goal}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                            )) || 'No goals set'}
                        </Box>
                    }
                />
            </List>
        </>
    )

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            {isEditing ? (
                <EditProfileForm
                    profile={profile}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                renderProfileInfo()
            )}
        </Paper>
    )
}

export default ProfileDetails