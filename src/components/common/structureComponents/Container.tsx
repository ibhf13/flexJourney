import { Box, Container as MuiContainer } from '@mui/material'
import { ContainerProps } from './types'

const Container = ({
  children,
  centerContent = false,
  maxWidth = 'lg',
  ...props
}: ContainerProps) => {
  const content = centerContent ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="inherit"
    >
      {children}
    </Box>
  ) : (
    children
  )

  return (
    <MuiContainer maxWidth={maxWidth} {...props}>
      {content}
    </MuiContainer>
  )
}

export default Container
