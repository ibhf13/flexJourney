import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { FormTextField } from '@/components/common/FormTextField'
import { ResponsivePopup } from '@/components/common/Popups'
import {
    DialogActions,
    DialogContent,
    Grid,
    MenuItem,
    Typography
} from '@mui/material'
import { useProfileForm } from '../hooks/useProfileForm'
import { UserProfile } from '../types/ProfileTypes'
import { FITNESS_LEVELS, GENDERS } from '../utils/profileConstants'

interface ProfileFormProps {
    open: boolean
    onClose: () => void
    initialData?: Partial<UserProfile>
    onSuccess?: () => void
}

export const ProfileForm = ({
    open,
    onClose,
    initialData,
    onSuccess,
}: ProfileFormProps) => {
    const {
        control,
        handleSubmit,
        isSubmitting,
        isDirty,
        resetForm,
    } = useProfileForm({
        initialData,
        onSuccess: () => {
            onSuccess?.()
            onClose()
        },
    })

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const dialogHeader = (
        <Typography variant="h6" component="span">
            Edit Profile
        </Typography>
    )

    return (
        <ResponsivePopup
            open={open}
            onClose={handleClose}
            maxWidth="md"
            headerContent={dialogHeader}
            fullHeight
        >
            <DialogContent sx={{ p: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="firstName"
                            label="First Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormTextField
                            control={control}
                            name="displayName"
                            label="Display Name"
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormTextField
                            control={control}
                            name="bio"
                            label="Bio"
                            multiline
                            rows={3}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="height"
                            label="Height (cm)"
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="weight"
                            label="Weight (kg)"
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="fitnessLevel"
                            label="Fitness Level"
                            select
                            fullWidth
                        >
                            {FITNESS_LEVELS.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </FormTextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="gender"
                            label="Gender"
                            select
                            fullWidth
                        >
                            {GENDERS.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </FormTextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="birthDate"
                            label="Birth Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <SecondaryButton onClick={handleClose}>
                    Cancel
                </SecondaryButton>
                <PrimaryButton
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={!isDirty}
                >
                    Save Changes
                </PrimaryButton>
            </DialogActions>
        </ResponsivePopup>
    )
}