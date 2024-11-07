import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { UserProfile } from '../../types/ProfileTypes'

interface EditProfileFormProps {
    profile: UserProfile
    onSubmit: (data: Partial<UserProfile>) => Promise<boolean>
    onCancel: () => void
}

const FITNESS_GOALS = [
    'Weight Loss',
    'Muscle Gain',
    'Endurance',
    'Flexibility',
    'General Fitness'
]

const EXPERIENCE_LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
]

const EditProfileForm = ({ profile, onSubmit, onCancel }: EditProfileFormProps) => {
    const [formData, setFormData] = useState({
        displayName: profile.displayName,
        bio: profile.bio || '',
        height: profile.height || '',
        weight: profile.weight || '',
        fitnessGoals: profile.fitnessGoals || [],
        experienceLevel: profile.experienceLevel,
        weightUnit: profile.weightUnit
    })

    useEffect(() => {
        setFormData({
            displayName: profile.displayName,
            bio: profile.bio || '',
            height: profile.height || '',
            weight: profile.weight || '',
            fitnessGoals: profile.fitnessGoals || [],
            experienceLevel: profile.experienceLevel,
            weightUnit: profile.weightUnit
        })
    }, [profile])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleGoalsChange = (event: SelectChangeEvent<string[]>) => {
        setFormData(prev => ({
            ...prev,
            fitnessGoals: event.target.value as string[]
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Convert height and weight to numbers or null
        const submissionData = {
            ...formData,
            height: formData.height ? Number(formData.height) : null,
            weight: formData.weight ? Number(formData.weight) : null
        }

        await onSubmit(submissionData)
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
            />
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <TextField
                    label="Height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    sx={{ flex: 1 }}
                />
                <TextField
                    label="Weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    sx={{ flex: 1 }}
                />
            </Box>
            <FormControl fullWidth margin="normal">
                <InputLabel>Fitness Goals</InputLabel>
                <Select
                    multiple
                    value={formData.fitnessGoals}
                    onChange={handleGoalsChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {FITNESS_GOALS.map((goal) => (
                        <MenuItem key={goal} value={goal}>
                            {goal}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Experience Level</InputLabel>
                <Select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                >
                    {EXPERIENCE_LEVELS.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                            {level.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" type="submit">
                    Save Changes
                </Button>
            </Box>
        </Box>
    )
}

export default EditProfileForm