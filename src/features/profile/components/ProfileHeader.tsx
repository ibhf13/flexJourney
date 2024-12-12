import { IconButton } from '@/components/common/Buttons'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { alpha, Box, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ProfileAvatar } from './ProfileAvatar'

interface ProfileHeaderProps {
    photoURL?: string
    displayName: string
    fitnessLevel?: string
    onEditClick: () => void
    onAvatarUpdate?: (url: string) => void
}

export const ProfileHeader = ({
    photoURL,
    displayName,
    fitnessLevel,
    onEditClick,
    onAvatarUpdate,
}: ProfileHeaderProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box
            sx={{
                position: 'relative',
                pb: 4,
                pt: { xs: 6, sm: 10 },
                background: `linear-gradient(to bottom, ${alpha(
                    theme.palette.primary.main,
                    0.15
                )}, ${alpha(theme.palette.background.default, 0.8)})`,
            }}
        >
            {isMobile && (<IconButton
                icon={<EditRoundedIcon />}
                onClick={onEditClick}
                label="Edit profile"
                size="small"
                sx={{ position: 'absolute', top: 16, right: 16 }}
            />)}
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 2, sm: 3 }}
                    alignItems="center"
                    textAlign={{ xs: 'center', sm: 'left' }}
                >
                    <ProfileAvatar
                        photoURL={photoURL}
                        size={120}
                        onUpdate={onAvatarUpdate}
                    />
                    <Box flex={1}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems="center"
                            spacing={1}
                            mb={1}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                            >
                                {displayName}
                            </Typography>
                            <IconButton
                                icon={<EditRoundedIcon />}
                                onClick={onEditClick}
                                label="Edit profile"
                                size="small"
                                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                            />
                        </Stack>
                        {fitnessLevel && (
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                }}
                                gutterBottom
                            >
                                {fitnessLevel} Fitness Level
                            </Typography>
                        )}
                    </Box>
                </Stack>

            </Container>

        </Box>
    )
}
