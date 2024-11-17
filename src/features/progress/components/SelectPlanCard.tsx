import { BaseCard } from '@/components/common/Cards'
import AddIcon from '@mui/icons-material/Add'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Box, CardContent, Chip, Typography } from '@mui/material'

interface SelectPlanCardProps {
    onClick: () => void
    selectedPlanTitle?: string
}

export const SelectPlanCard = ({ onClick, selectedPlanTitle }: SelectPlanCardProps) => {
    const defaultImage = '/assets/images/select-plan-placeholder.jpg' // Add a placeholder image

    return (
        <BaseCard
            onClick={onClick}
            title={selectedPlanTitle ? 'Change Workout Plan' : 'Select Workout Plan'}
            imageUrl={defaultImage}
            imageHeight={200}
            sx={{
                position: 'relative',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'primary.main'
                    }}
                >
                    {selectedPlanTitle ? (
                        <>
                            <SwapHorizIcon />
                            Change Plan
                        </>
                    ) : (
                        <>
                            <AddIcon />
                            Select Your Plan
                        </>
                    )}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        minHeight: '3em',
                    }}
                >
                    {selectedPlanTitle
                        ? 'Switch to a different workout plan that better matches your current goals'
                        : 'Choose a workout plan to start your fitness journey'
                    }
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    {selectedPlanTitle ? (
                        <>
                            <Chip
                                label="Current Plan"
                                color="primary"
                                size="small"
                            />
                            <Chip
                                label={selectedPlanTitle}
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        </>
                    ) : (
                        <Chip
                            label="Get Started"
                            color="primary"
                            size="small"
                            icon={<AddIcon />}
                        />
                    )}
                </Box>
            </CardContent>
        </BaseCard>
    )
}