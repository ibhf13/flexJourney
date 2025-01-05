import { Check, RadioButtonUnchecked } from '@mui/icons-material'
import { Box } from "@mui/material"
import { StepIconRoot } from '../../styles'


const StepIcon = (props: { active?: boolean, completed?: boolean, icon: React.ReactNode }) => {

    return (
        <StepIconRoot ownerState={{ active: props.active, completed: props.completed }}>
            {props.completed ? (
                <Check
                    sx={{
                        fontSize: 18,
                        color: 'white',
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))'
                    }}
                />
            ) : (
                props.active ? (
                    <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        boxShadow: `0 0 0 4px ${'white'} 20`
                    }} />
                ) : (
                    <RadioButtonUnchecked sx={{ fontSize: 12 }} />
                )
            )}
        </StepIconRoot>
    )
}

export default StepIcon