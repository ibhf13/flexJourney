import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { FormTextField } from '@/components/common/FormTextField'
import { ResponsivePopup } from '@/components/common/Popups'
import {
    Checkbox,
    DialogActions,
    DialogContent,
    Grid,
    ListItemText,
    MenuItem,
    Typography
} from '@mui/material'
import { useProfileForm } from '../hooks/useProfileForm'
import { FitnessGoals, FitnessLevels, Genders, UserProfile } from '../types/ProfileTypes'

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
        watch,
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
                            name="baseInfo.firstName"
                            label="First Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="baseInfo.lastName"
                            label="Last Name"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormTextField
                            control={control}
                            name="baseInfo.displayName"
                            label="Display Name"
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormTextField
                            control={control}
                            name="baseInfo.bio"
                            label="Bio"
                            multiline
                            rows={3}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="profileMetrics.height"
                            label="Height (cm)"
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="profileMetrics.weight"
                            label="Current Weight (kg)"
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="profileMetrics.targetWeight"
                            label="Target Weight (kg)"
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="fitnessDetails.fitnessLevel"
                            label="Fitness Level"
                            select
                            fullWidth
                            defaultValue={FitnessLevels.BEGINNER}
                        >
                            {Object.values(FitnessLevels).map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </FormTextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="baseInfo.gender"
                            label="Gender"
                            select
                            fullWidth
                        >
                            {Object.values(Genders).map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </FormTextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            control={control}
                            name="profileMetrics.age"
                            label="Age"
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormTextField
                            control={control}
                            name="fitnessDetails.fitnessGoals"
                            label="Fitness Goals"
                            select
                            fullWidth
                            slotProps={{
                                select: {
                                    multiple: true,
                                    renderValue: (selected) => {
                                        const selectedArray = Array.isArray(selected) ? selected : []

                                        return selectedArray.join(', ')
                                    },
                                    MenuProps: {
                                        PaperProps: {
                                            style: {
                                                maxHeight: 224,
                                                width: 250
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            {Object.values(FitnessGoals).map((goal) => (
                                <MenuItem key={goal} value={goal}>
                                    <Checkbox
                                        checked={watch('fitnessDetails.fitnessGoals')?.includes(goal)}
                                    />
                                    <ListItemText primary={goal} />
                                </MenuItem>
                            ))}
                        </FormTextField>
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