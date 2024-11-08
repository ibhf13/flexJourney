import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Avatar, Badge, Box, CircularProgress, IconButton, styled } from '@mui/material'
import { useProfileAvatar } from '../hooks/useProfileAvatar'

const HiddenInput = styled('input')({
    display: 'none',
})

interface ProfileAvatarProps {
    photoURL?: string
    size?: number
    onUpdate?: (url: string) => void
}

export const ProfileAvatar = ({ photoURL, size = 120, onUpdate }: ProfileAvatarProps) => {
    const { handleAvatarChange, isUploading, uploadProgress } = useProfileAvatar({
        onSuccess: (url) => onUpdate?.(url),
        maxSizeMB: 2,
    })

    return (
        <Box position="relative">
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <label htmlFor="avatar-upload">
                        <HiddenInput
                            accept="image/*"
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                            disabled={isUploading}
                        />
                        <IconButton
                            aria-label="upload avatar"
                            component="span"
                            disabled={isUploading}
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: 'background.paper',
                                boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: 'background.paper',
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    border: '1px solid currentColor',
                                }
                            }}
                        >
                            <CameraAltIcon />
                        </IconButton>
                    </label>
                }
                sx={{
                    '& .MuiBadge-badge': {
                        borderRadius: '50%',
                    }
                }}
            >
                <Avatar
                    src={photoURL}
                    sx={{
                        width: size,
                        height: size,
                        fontSize: size * 0.4,
                    }}
                />
            </Badge>
            {isUploading && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '50%',
                    }}
                >
                    <CircularProgress
                        variant="determinate"
                        value={uploadProgress}
                        size={size / 2}
                    />
                </Box>
            )}
        </Box>
    )
}