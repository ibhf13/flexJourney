import GoogleIcon from '@mui/icons-material/Google'
import { Button, Divider, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

interface SocialLoginButtonsProps {
  isLoading: boolean
  onGoogleSignIn: () => Promise<void>
}

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
  '&::before, &::after': {
    borderColor: theme.palette.divider,
  },
}))

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ isLoading, onGoogleSignIn }) => {
  return (
    <>
      <StyledDivider>
        <Typography variant="body2" color="textSecondary">
          OR
        </Typography>
      </StyledDivider>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleSignIn}
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        Continue with Google
      </Button>
    </>
  )
}

export default SocialLoginButtons
