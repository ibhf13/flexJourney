import { useNotificationContext } from '@/features/Feedback/contexts/NotificationContext'
import { convertToBase64, validateImage } from '@/utils/imageUtils'
import EditIcon from '@mui/icons-material/Edit'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import {
    Avatar,
    Badge,
    Box,
    Button,
    Dialog,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useProfileContext } from '../contexts/ProfileContext'
import { UserProfile } from '../types/ProfileTypes'

interface ProfileHeaderProps {
    profile: UserProfile
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedProfile, setEditedProfile] = useState(profile)
    const { updateProfile } = useProfileContext()
    const { showNotification } = useNotificationContext()
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setEditedProfile(profile)
    }, [profile])

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        try {
            validateImage(file)
            const base64Image = await convertToBase64(file)
            
            const success = await updateProfile({ photoURL: base64Image })

            if (success) {
                showNotification({
                    message: 'Profile photo updated successfully',
                    severity: 'success',
                    open: true
                })
            }
        } catch (error) {
            showNotification({
                message: error instanceof Error ? error.message : 'Failed to update profile photo',
                severity: 'error',
                open: true
            })
        }
    }

    const handleSave = async () => {
        const success = await updateProfile({
            displayName: editedProfile.displayName,
            bio: editedProfile.bio
        })

        if (success) {
            showNotification({
                message: 'Profile updated successfully',
                severity: 'success',
                open: true
            })
            setIsEditing(false)
        } else {
            showNotification({
                message: 'Failed to update profile',
                severity: 'error',
                open: true
            })
        }
    }

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/jpeg,image/png,image/webp"
                style={{ display: 'none' }}
            />
            
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={3}>
                    <Box position="relative">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <IconButton
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        '&:hover': { bgcolor: 'primary.dark' },
                                    }}
                                    size="small"
                                >
                                    <PhotoCameraIcon sx={{ fontSize: 16, color: 'white' }} />
                                </IconButton>
                            }
                        >
                            <Avatar
                                src={profile.photoURL || ''}
                                alt={profile.displayName}
                                sx={{ width: 120, height: 120 }}
                            />
                        </Badge>
                    </Box>
                    <Box flex={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="h4" gutterBottom>
                                {profile.displayName}
                            </Typography>
                            <IconButton 
                                size="small" 
                                onClick={() => setIsEditing(true)}
                                aria-label="edit profile"
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            {profile.bio || 'No bio added yet'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Member since {new Date(profile.joinedDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm" fullWidth>
                <Box p={3}>
                    <Typography variant="h6" gutterBottom>
                        Edit Profile
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        value={editedProfile.displayName}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Bio"
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        margin="normal"
                        multiline
                        rows={3}
                    />
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default ProfileHeader